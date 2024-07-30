const fs = require('fs');
const index = fs.readFileSync("index.html", 'utf-8');
const data = JSON.parse(fs.readFileSync("data.json", "utf-8"));

const express = require("express");
const morgan = require("morgan")
const server = express()

//boby parser
server.use(express.json())
server.use(express.static('public'))
server.use(morgan('dev')) //third party middle ware


// middle-ware
// server.use((req, res, next) => {
//     console.log(req.method, req.id, req.hostname)
//     next()
// })

const auth = (req, res, next) => { // auth middle ware logic
    console.log(req.query)
    if (req.query.password) {
        next()
    } else {
        res.sendStatus(401)
    }
    next()
}

server.use(auth)


//API-ENDPOINT-ROUTE
server.get('/product/:id',auth, (req, res) => {
    res.json({ type: "GET" })
})

server.post('/', (req, res) => {
    res.json({ type: "POST" })
})
server.put('/', (req, res) => {
    res.json({ type: "PUT" })
})
server.delete('/', (req, res) => {
    res.json({ type: "DELETE" })
})

server.get('/demo', (req, res) => {
    res.status(503).send('<h1>service not found</h1>')
    // res.sendStatus(503)
    // res.send("hello")
    // res.json(data)
})



server.listen(8080, () => {
    console.log("server started")
})