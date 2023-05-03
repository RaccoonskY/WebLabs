const express = require("express");
const msgController = require("../controllers/messageController");

const msgRouter = express.Router();
const jsonParser = express.json();

msgRouter.use("/add", jsonParser, msgController.addMsg);


module.exports = msgRouter;