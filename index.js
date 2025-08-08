const express = require('express')
const cors = require('cors')

const app = express()
const PORT = 5000;

const corsOptions = {
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'HEAD', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Origin', 'X-Requested-With', 'Accept', 'x-client-key', 'x-client-token', 'x-client-secret', 'Authorization'],
    credentials: true,
    optionSuccessStatus: 200,
}

app.use(cors(corsOptions))
app.use(express.json());

app.get('/', async(req, res, next) => {
    res.status(200).send({ message: 'Server is running on: PORT ' + PORT })
})


app.use((error, req, res, next) => {
    const status = error.statusCode || 500;
    const message = error.message
    const data = error.data
    res.status(status).json({
        status: false,
        message: message,
        data: {
            error: data
        }
    })
})

app.listen(PORT, () => {
    console.log('Server is listening on port: ', PORT)
})