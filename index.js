// import {sum,diff} from "./lib.js"
// const express = require('express')
// const fs = require('fs');
// fs.readFile("demo.txt",'utf-8',(err,txt)=>{console.log(txt)})
// console.log("hello world")
// // console.log(sum(4,3),diff(4,3))
// const server = express();
// server.listen(8080)

// -----------------------------------------

const http = require('http');
const fs = require('fs');

const index = fs.readFileSync("index.html", 'utf-8');
const data = JSON.parse(fs.readFileSync("data.json", "utf-8"));
const singleProduct = data;

const server = http.createServer((req, res) => {
    console.log(req.url)
    if (req.url.startsWith('/product')) {
        let len = req.url.split('/').length;
        console.log(len)
        const id = req.url.split('/')[2]
        const showProduct = singleProduct.find(i => i.id === (+id))
        console.log(showProduct)
        res.setHeader('Content-Type', 'text/html')
        let product = index.replace("**title**", showProduct.title)
            .replace("**url**", showProduct.image)
            .replace(" **price**", showProduct.price)
        res.end(product)
        return

    }
    switch (req.url) {
        case '/':
            res.setHeader('Content-Type', 'text/html');
            res.end(index);
            break
        case '/api':
            res.setHeader('Content-Type', 'application/json')
            res.end(data)
            break
        // case '/product':
        //     res.setHeader('Content-Type', 'text/html')
        //     let product = index.replace("**title**", singleProduct.title).replace("**url**", singleProduct.image).replace(" **price**", singleProduct.price)
        //     res.end(product)
        //     break
        default:
            res.writeHead(404, "Not Found")
            res.end()
    }
    console.log("server started ")
    // res.setHeader('Dummy', 'dummy/value');

})

server.listen(8080)