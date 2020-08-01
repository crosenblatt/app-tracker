const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const helmet = require('helmet')
const morgan = require('morgan')
const path = require('path')

const app = express()
app.use(helmet())
app.use(bodyParser.json())
app.use(cors())
app.use(morgan('combined'))

app.use(express.static(path.join(__dirname, 'client/build')))

app.get('/api/helloworld', (req, res) => {
    res.send({"message": "hello world"})
})

app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname + '/client/build/index.html'))
})

const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}...`)
})