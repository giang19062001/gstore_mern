const iphoneController = require("../controller/iphoneController");
const upload = require("../middleware/middlewareImage");
const router = require("express").Router();

router.post("/",upload.any('photo'),iphoneController.addIphone);
// router.post("/",upload.single('photo'),iphoneController.addIphone);
router.get("/",iphoneController.getAllIphones);
router.get("/:id",iphoneController.getIphone);
router.get("/search/:id",iphoneController.searchIphone);
router.put("/:id",iphoneController.updateIphone);




module.exports = router