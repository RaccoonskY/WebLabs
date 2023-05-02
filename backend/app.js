const express = require("express");
const http = require("http");
const fs = require("fs");
const jsonParser = express.json();

const app = express();
app.use(express.static('public'));

//middleware for req logging 
app.use(function(request, response, next){
    let now = new Date();
    let hour = now.getHours();
    let minutes = now.getMinutes();
    let seconds = now.getSeconds();
    let data = `${hour}:${minutes}:${seconds} ${request.method} ${request.url} ${request.get("user-agent")}`;
    console.log(data);
    fs.appendFile("server.log", data + "\n", function(){});
    next();
});


// определяем обработчик для маршрута "/"
app.get("/", function(request, response){
    // отправляем ответ
    response.send("<h2>Привет Express!</h2>");
});

app.get("/main", function(req, res){
    res.sendFile(__dirname +"/public/main.html");
});

app.get("/products",(req,res)=>{
    let data = fs.readFileSync("items.json",'utf-8')
    res.send(data);
});

app.post("/add_product", jsonParser,(req, res)=>{
    console.log(req.body);
    if(!req.body) return res.sendStatus(400);
    fs.readFile("items.json", function(err, data) {
        if (err) {
            console.log(err);
            res.status(500).send(err);  // send error response
        } else {
            let jsonData = JSON.parse(data);
            if (jsonData.empty){
                jsonData.push({products:[],messages:[]})
            }
            jsonData.products.push(req.body);  // append new product to list
            // write updated data to file
            fs.writeFile("items.json", JSON.stringify(jsonData), function (err) {
                if (err) {
                    console.log(err);
                    res.status(500).send(err);  // send error response
                } else {
                    console.log("New product added.");
                    res.status(200).send("New product added."); // send success response
                }
            });
        }
    });
})
app.post("/add_message", jsonParser,(req, res)=>{
    console.log(req.body);
    if(!req.body) return res.sendStatus(400);
    fs.readFile("items.json", function(err, data) {
        if (err) {
            console.log(err);
            res.status(500).send(err);  // send error response
        } else {
            let jsonData = JSON.parse(data);
            if (jsonData.empty){
                jsonData.push({products:[],messages:[]})
            }
            jsonData.messages.push(req.body);  // append new message to list
            // write updated data to file
            fs.writeFile("items.json", JSON.stringify(jsonData), function (err) {
                if (err) {
                    console.log(err);
                    res.status(500).send(err);  // send error response
                } else {
                    console.log("New product added.");
                    res.status(200).send("New message added."); // send success response
                }
            });
        }
    });
})


// начинаем прослушивать подключения на 3000 порту
app.listen(3000);