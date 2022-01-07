var express = require('express');
var router = express.Router();
var controller = require("./controller/index.controller");

/* GET home page. */
router.get('/', controller.homepage);
router.get('/dashboard', controller.dashboard);
router.get("/detail", controller.detail);
router.get("/products", controller.products);

// Upload file
router.post("/upload", controller.upload);
router.post("/data", controller.getExcel);
router.get("/list", controller.getList);

module.exports = router;
