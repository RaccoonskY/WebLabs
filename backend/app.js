const express = require("express");
//const http = require("http");
//const fs = require("fs");
const loggerController = require("./controllers/loggerController");
const msgRouter = require("./routes/msgRouter");
const productsRouter = require("./routes/productsRouter");


const app = express();

app.use(express.static('public'));

//middleware for req logging
app.use(loggerController.logRequest);

app.use("/products", productsRouter);
app.use("/messages", msgRouter);

app.get("/main", (req, res)=>{ res.sendFile(__dirname +"/public/main.html");});
//middleware for status 404 handling
app.use((req,res)=>{ res.status(404).send("Not Found")} );

// начинаем прослушивать подключения на 3000 порту
app.listen(3000);