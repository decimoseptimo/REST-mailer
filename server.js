#!/usr/bin/env nodejs
const express = require('express')
const app = express()
const router = express.Router()
const bodyParser = require('body-parser')
const sendMail = require('./sendMail')

console.log('REST-mailer started')

// Server config
const host = 'localhost'
const port = 9980
const apiPath = '/api/v1'
const allowedOrigins = ['http://localhost:8000']

app.use(bodyParser.json()) // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })) // support encoded bodies
// CORS policy: allowed origins
app.use((req, res, next) => {
    const origin = req.headers.origin
    if(allowedOrigins.indexOf(origin) > -1){
        res.header('Access-Control-Allow-Origin', origin)
    }
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
    next()
})
app.use(apiPath, router)
app.listen(port, ()=>console.log(`Listening at ${host}:${port}`))

// server 'root' entrypoint
// app.get('/', (req, res)=>{
//     res.send('/\n')
// })

// router 'root' entrypoint
router.get('/', (req, res)=>{
    console.log('/')
    res.send('/\n')
})

router.post('/contact-form', function (req, res){
    const config = require('./config/mail-config')
    const {name, email, message} = req.body

    if (name && email && message){
        sendMail(res, config.mailgun, config.mail(name, email, message))
    }
    else{
        error = {error: 'Missing parameters. Name, email, & message are required.'}
        console.log(error)
        res.status(400)
        res.send(JSON.stringify(error))
    }
})