const express = require('express')
const cors = require('cors')
const { Pool } = require('pg')

const pool = new Pool ({
    host: 'localhost',
    user: 'postgres',
    password: 'Juli1796',
    database: 'likeme',
    allowExitOnIdle: true
})

const app = express()
//levantamiento del servidor
app.listen(3000, () => console.log("servidor levantado"))

//midleware
app.use(express.json())
app.use(cors())

//Rutas
app.get("/posts", async(req,res) => {
    try{
        const query = "SELECT * FROM posts;"
        const {rows} = await pool.query(query)
        res.json(rows)
    } catch (error) {
        console.log("hay un error", error.message)
    }
})

app.post("/posts", async(req,res) => {
    try{
        const {titulo, url, descripcion} = req.body
        const id = Math.floor(Math.random() * 9999)
        const query = "INSERT INTO posts (id, titulo, img, descripcion, likes) VALUES ($1, $2, $3, $4, $5)"
        const values = [id, titulo, url, descripcion, 0]
        const { rows } = await pool.query(query, values)
        res.json(rows)
    } catch (error) {
        console.log("hay un error", error.message)
    }
})