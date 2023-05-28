import express from 'express'
import cors from 'cors'
import sqlite3 from 'sqlite3'

const db = new sqlite3.Database('db.sqlite')
const app = express()
app.use(cors())
app.use(express.json())
const PORT = 4000

app.disable('etag');

const createProdutoTable = async () => {
    db.serialize(() => {
        db.exec(
            "DROP TABLE IF EXISTS Produto; CREATE TABLE IF NOT EXISTS Produto (produtoId INTEGER PRIMARY KEY AUTOINCREMENT, nome TEXT, valor TEXT);"
        )
    })
}

createProdutoTable()

app.get('/produtos', async (req, res) => {
    let sql = "SELECT * FROM Produto;"

    db.serialize(() => {
        db.all(sql, function (err, rows) {
            if (err) return res.status(500).json({ err, msg: err.message })
            res.json({ produtos: rows })
        })
    })
    return;
})

app.post('/criar-produto', async (req, res) => {
    console.log('body =>', req.body);
    db.serialize(() => {
        db.run(
            "INSERT INTO Produto (nome, valor) VALUES (?,?);",
            [
                req.body.nome,
                req.body.valor
            ],
            function (err) {
                if (err) {
                    return res.status(500).json({ err })
                }
                res.json({ msg: 'ok' });
            }
        )
    })
    return;
})

app.delete('/deleta/:id', async (req, res) => {
    let sql = 'DELETE FROM Produto WHERE produtoId = ?;'
    console.log('about to exec', sql);
    db.serialize(() => {
        db.run(
            sql,
            [
                req.params.id
            ],
            function (err) {
                console.log('ran query with err', err);
                if (err) return res.status(500).json({ err });
                res.json({ deleted: 'ok' });
            })
    });
    return;
})

app.listen(PORT, () =>
    console.log(`\x1b[32m[START]\x1b[0m Server is running on \x1b[35mhttp://localhost:${PORT}\x1b[0m`))