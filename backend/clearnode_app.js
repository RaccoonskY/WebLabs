const http = require("http");


const server = http.createServer(function(req, res ){
    console.log(`Пользователь запросил адрес: ${req.url}`);
    

}).listen(8080, "127.0.0.1", function(){
    console.log("Сервер начал прослушивание")
});

