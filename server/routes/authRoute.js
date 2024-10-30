const router = require("express").Router()
const {login,  register} = require("../controller/authController")
const {verifyToken, checkPermission} = require("../middleware/verifyToken")

router.post("/login", login)
router.post("/register", verifyToken , checkPermission("register user") , register)
module.exports = router
