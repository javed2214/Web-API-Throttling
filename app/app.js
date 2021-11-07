const express = require('express')
const app = express()

const {connectRedis, rateLimitter} = require('./redis')

connectRedis()

app.use(rateLimitter)

const PORT = process.env.PORT

app.get('/', async (req, res) => {
    return res.json({
        Response: 'Hello World!',
        Method: 'GET',
        Port: PORT
    })
})

app.post('/', async (req, res) => {
    return res.json({
        Response: 'Hello World!',
        Method: 'POST',
        Port: PORT
    })
})


app.get('/admin', async (req, res) => {
    return res.json({
        Response: 'Admin Page',
        Method: 'GET',
        Port: PORT
    })
})

app.post('/admin', async (req, res) => {
    return res.json({
        Response: 'Admin Page',
        Method: 'POST',
        Port: PORT
    })
})

app.listen(PORT, () => console.log(`Server is Running at PORT: ${PORT}`))
