const express = require("express");
const http = require("http");
const fs = require("fs");
const path = require('path');

// создаем объект приложения
const app = express();
app.use(express.static('public'));
//app.use('/static', express.static('C:/Users/Victor/Desktop\3course/6сем/Вебпрог/лабы/WPLabs/lab2/frontend/static'));
//app.use('/static', express.static('C:/Users/Victor/Desktop\3course/6сем/Вебпрог/лабы/WPLabs/lab2/frontend/styles'));

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
// начинаем прослушивать подключения на 3000 порту
app.listen(3000);