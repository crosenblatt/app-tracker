const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const helmet = require('helmet')
const morgan = require('morgan')

const app = express()
app.use(helmet())
app.use(bodyParser.json())
app.use(cors())
app.use(morgan('combined'))

app.get('/api/helloworld', (req, res) => {
    res.send({"message": "hello world"})
})


app.get("*", (req, res) => {
    res.send({"message": "nothing to see here"})
})

const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}...`)
})