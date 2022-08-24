const orderController = require("../controller/orderController");

const router = require("express").Router();

router.post("/",orderController.addOrder)
router.get("/",orderController.getAllOrder)
router.get("/:id",orderController.getOrder)
router.get("/user/:id",orderController.getOrderByUser)

router.put("/:id",orderController.updateOrder)






module.exports = router