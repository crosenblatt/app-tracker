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

app.get('/api/apps', async(req, res) => {
    const client = await pool.connect()
    client.query('SELECT * FROM APPLIED_TO WHERE user_id = 1', (error, results) => {
        if(error) {
            throw error
        }

        res.json(results.rows)
        client.release()
    })
})

app.post('/api/apps', async(req, res) => {
    const client = await pool.connect()
    client.query("INSERT INTO APPLIED_TO (company_name, last_updated, stage, resume, user_id, recruiter, recruiter_email) VALUES ($1, $2, $3, $4, 1, $5, $6)", 
    [req.body.company_name, req.body.last_updated, req.body.stage, req.body.resume, req.body.recruiter, req.body.recruiter_email],
    (error, results) => {
        if(error) {
            console.log(error)
            res.sendStatus(500)
        } else if(results.rowCount == 1)  {
            res.sendStatus(201)
        } else {
            res.sendStatus(400)
        }

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