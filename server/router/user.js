const authController = require("../controller/UserAuthController");
const middlewareAuth = require("../middleware/midllewareAuth");
const upload = require("../middleware/middlewareImage");

const router = require("express").Router();

router.post("/register",authController.registerUser)
router.put("/update/:id",upload.single('avatar'),authController.updateUser)
router.get("/",authController.getAllUser)
router.get("/:id",authController.getUser)

router.post("/login",authController.loginUser)
//refresh
router.post("/refresh",authController.requestRefreshToken)
router.post("/logout",middlewareAuth.verifyToken,authController.userLogout)



module.exports = router