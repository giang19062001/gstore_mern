const orderDetailController = require("../controller/orderDetailController");

const router = require("express").Router();

router.post("/",orderDetailController.addOrderDetail)








module.exports = router