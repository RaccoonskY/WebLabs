const fs = require("fs");

exports.addProduct = (req,res)=>{
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
}

exports.getProducts = (req,res)=>{
    let data = fs.readFileSync("items.json",'utf-8')
    res.send(data);
}