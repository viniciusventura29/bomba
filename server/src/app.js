import express from 'express'
import cors from 'express'
import sqlite3 from 'sqlite3'

const db = new sqlite3.Database('db.sqlite')
const app = express()
app.use(express.json())
app.use(cors())
const PORT = 4000

const createProdutoTable = async () => {
    db.serialize(() => {
        db.exec(
            "CREATE TABLE IF NOT EXISTS Produto (produtoId TEXT PRIMARY KEY, nome TEXT, valor NUMERIC)"
        )
    })
}

createProdutoTable()

app.get('/produtos', (req, res) => {
    let sql = "SELECT * FROM Produto"

    db.serialize(() => {
        db.all(sql, function (err, rows) {
            var jsondata = (JSON.stringify(rows))

            res.setHeader("Content-Type", "application/json; charset=UTF-8")
            res.writeHead(200)
            res.end(jsondata)
        })
    })
})

app.post('/criar-produto', (req, res) => {
    let sql = "INSERT INTO Produto (nome, valor) VALUES (?,?)"

    db.serialize(() => {
        db.run(
            sql,
            [
                req.body.nome,
                req.body.valor
            ]
        )
    })
})

app.delete('/deleta/:id', async (req, res) => {
    let sql = 'DELETE FROM Produto WHERE produtoId = ?'
    db.serialize(() => {
        db.exec(
            sql,
            [
                req.params.id
            ])
    })
})

app.listen(PORT, () =>
    console.log(`\x1b[32m[START]\x1b[0m Server is running on \x1b[35mhttp://localhost:${PORT}\x1b[0m`))