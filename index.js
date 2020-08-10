const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const helmet = require('helmet')
const morgan = require('morgan')
const path = require('path')
const {pool} = require('./config')

const app = express()
app.use(helmet())
app.use(bodyParser.json())
app.use(cors())
app.use(morgan('combined'))

app.use(express.static(path.join(__dirname, 'client/build')))


app.get('/api/users', async (req, res) => {
    const client = await pool.connect()
    client.query('SELECT * FROM USERS', (error, results) => {
        if(error) {
            throw error
        }
        res.json(results.rows)
        client.release()
    })
})

app.get('/api/helloworld', (req, res) => {
    res.send({"message": "hello world"})
})

app.get('/api/goodbyeworld', (req, res) => {
    res.send({"message": "goodbye world"})
})

app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname + '/client/build/index.html'))
})

const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}...`)
})