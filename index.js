const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const helmet = require('helmet')
const morgan = require('morgan')
const path = require('path')
const {pool} = require('./config')
const { resolveSoa } = require('dns')
const crypto = require('crypto')
const jwt = require('jsonwebtoken')

const app = express()
app.use(helmet())
app.use(bodyParser.json())
app.use(cors())
app.use(morgan('combined'))

app.use(express.static(path.join(__dirname, 'client/build')))

function generateAccessToken(username) {
    return jwt.sign(username, process.env.TOKEN_SECRET, { expiresIn: '3600s' } )
}

function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
    if(token == null) return res.sendStatus(401)

    jwt.verify(token, process.env.TOKEN_SECRET, (err, user) => {
        console.log("Err: " + err)
        if(err) return res.sendStatus(403)
        req.user = user
        next()
    })
}

app.post('/api/register', async(req, res) => {
    const client = await pool.connect()
    const token = generateAccessToken({ username: req.body.username })
    client.query(`INSERT INTO USERS (username, password, email, name) VALUES ($1, crypt($2, gen_salt('bf')), $3, $4)`, 
    [req.body.username, req.body.password, req.body.email, req.body.name],
    (error, results) => {
        if(error) {
            throw error
            // res.sendStatus(500)
        } else if(results.rowCount == 1) {
            res.json(token)
        } else {
            res.sendStatus(400)
        }

        client.release()
    })
})

app.post('/api/login', async(req, res) => {
    const client = await pool.connect()
    client.query(`SELECT * FROM USERS WHERE username = $1 AND password = crypt($2, password);`,
    [req.body.username, req.body.password],
    (error, results) => {
        if(error) {
            res.sendStatus(500)
        } else if(results.rowCount == 1) {
            const token = generateAccessToken({ username: req.body.username })
            res.json(token)
        } else {
            res.sendStatus(401)
        }

        client.release()
    })
})

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

app.get('/api/apps', authenticateToken, async(req, res) => {
    const client = await pool.connect()
    client.query('SELECT * FROM APPLIED_TO WHERE username = $1', 
    [req.user.username],
    (error, results) => {
        if(error) {
            throw error
        }

        res.json(results.rows)
        client.release()
    })
})

app.get('/api/apps/:application_id', authenticateToken, async(req, res) => {
    const client = await pool.connect()
    client.query('SELECT * FROM APPLIED_TO WHERE application_id = $1 AND username = $2', 
    [req.params.application_id, req.user.username],
    (error, result) => {
        if(error) {
            res.sendStatus(500)
        } else {
            res.json(result.rows)
            client.release()
        }
    })
})

app.post('/api/apps', authenticateToken, async(req, res) => {
    const client = await pool.connect()
    client.query("INSERT INTO APPLIED_TO (company_name, last_updated, stage, resume, username, recruiter, recruiter_email) VALUES ($1, $2, $3, $4, $5, $6, $7)", 
    [req.body.company_name, req.body.last_updated, req.body.stage, req.body.resume, req.user.username, req.body.recruiter, req.body.recruiter_email],
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

app.patch('/api/apps/:application_id', authenticateToken, async(req, res) => {
    const client = await pool.connect()
    client.query("UPDATE APPLIED_TO SET company_name = $1, last_updated = $2, stage = $3, recruiter = $4, recruiter_email = $5 WHERE application_id = $6 AND username = $7",
    [req.body.company_name, req.body.last_updated, req.body.stage, req.body.recruiter, req.body.recruiter_email, req.params.application_id, req.user.username],
    (error, results) => {
        if(error) {
            console.log(error)
            res.sendStatus(500)
        } else if(results.rowCount == 1) {
            res.sendStatus(200)
        } else {
            res.sendStatus(400)
        }

        client.release()
    })
})

app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname + '/client/build/index.html'))
})

const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}...`)
})