const fs = require('fs');
const index = fs.readFileSync("index.html", 'utf-8');
const productData = JSON.parse(fs.readFileSync("data.json", "utf-8"));
const newDataAdd = 
{
    "id": 21,
    "title": "IPhone Print",
    "price": 30.99,
    "description": "95%Cotton,5%Spandex, Features: Casual, Short Sleeve, Letter Print,V-Neck,Fashion Tees, The fabric is soft and has some stretch., Occasion: Casual/Office/Beach/School/Home/Street. Season: Spring,Summer,Autumn,Winter.",
    "category": "mens clothing",
    "image": "",
    "rating": {
      "rate": 3.6,
      "count": 145
    }
  }

const express = require("express");
const morgan = require("morgan")
const server = express()

//boby parser
server.use(express.json())
server.use(express.static('public'))
server.use(morgan('dev')) //third party middle ware

//API-ENDPOINT-ROUTE
//products

//READ get/products 
server.get('/products', (req, res) => {
    res.json(productData)
})

server.get('/products/:id', (req, res) => {
    console.log(req)
    const id = +req.params.id
    const singleProduct = productData.find((e)=>(e.id===id))
    res.json(singleProduct)
})

//create API
server.post('/product-add', (req, res) => {
    productData.push(newDataAdd);
    res.json(newDataAdd);
})

//update put
server.put('/products/:id', (req, res) => {
    console.log(req)
    const id = +req.params.id
    const ProductIndex = productData.findIndex((e)=>(e.id===id))
    productData.splice(ProductIndex,1,{...req.body,id:id})
    res.status(201).json()
})

//Patch 
server.patch('/products/:id', (req, res) => {
    console.log(req)
    const id = +req.params.id
    const productIndex = productData.findIndex((e)=>(e.id===id))
    const ogProd = productData[productIndex]
    productData.splice(productIndex,1,{...ogProd,...req.body})
    res.status(201).json()
})


server.delete('/products/:id', (req, res) => {
    const id = +req.params.id
    const ProductIndex = productData.findIndex((e)=>(e.id===id))
    productData.splice(ProductIndex,1)
    res.status(201).json()
})


server.listen(8080, () => {
    console.log("server started")
})