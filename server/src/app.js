import express from 'express'
import cors from 'cors'
import sqlite3 from 'sqlite3'

const db = new sqlite3.Database('db.sqlite')
const app = express()
app.use(cors())
app.use(express.json())
const PORT = 4000

const createProdutoTable = async () => {
    db.serialize(() => {
        db.exec(
            "CREATE TABLE IF NOT EXISTS Produto (produtoId INTEGER PRIMARY KEY, nome TEXT, valor TEXT)"
        )
    })
}

createProdutoTable()

app.get('/produtos', async (req, res) => {
    let sql = "SELECT * FROM Produto"

    db.serialize(() => {
        db.all(sql, function (err, rows) {
            if (err) return res.status(500).json({ err, msg: err.message })
            res.json(rows)
        })
    })
})

app.post('/criar-produto', async (req, res) => {
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
    res.send('criado')
})

app.delete('/deleta/:id', async (req, res) => {
    let sql = 'DELETE FROM Produto WHERE produtoId = ?'
    db.serialize(() => {
        db.run(
            sql,
            [
                req.params.id
            ])
    })
})

app.listen(PORT, () =>
    console.log(`\x1b[32m[START]\x1b[0m Server is running on \x1b[35mhttp://localhost:${PORT}\x1b[0m`))