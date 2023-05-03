const express = require("express");
const productController = require("../controllers/productsController");

const productRouter = express.Router();
const jsonParser = express.json();

productRouter.use("/add",jsonParser, productController.addProduct);
productRouter.use("/", productController.getProducts);

module.exports = productRouter;