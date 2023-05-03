const fs = require("fs");
exports.addMsg = (req, res) => {
    console.log(req.body);
    if (!req.body) return res.sendStatus(400);
    fs.readFile("items.json", function (err, data) {
        if (err) {
            console.log(err);
            res.status(500).send(err);  // send error response
        } else {
            let jsonData = JSON.parse(data);
            if (jsonData.empty) {
                jsonData.push({products: [], messages: []})
            }
            jsonData.messages.push(req.body);  // append new message to list
            // write updated data to file
            fs.writeFile("items.json", JSON.stringify(jsonData), function (err) {
                if (err) {
                    console.log(err);
                    res.status(500).send(err);  // send error response
                } else {
                    console.log("New message added.");
                    res.status(200).send("New message added."); // send success response
                }
            });
        }
    });
}