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

app.listen(8080, () => {
    console.log("Listening on port 8080...")
})