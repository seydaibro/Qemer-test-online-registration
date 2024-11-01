const router = require("express").Router()
const {getAllUsers, editUser, deleteUser, registerToCourse,getUserById} = require("../controller/userController")
router.get("/", getAllUsers)
router.put("/edit/:id", editUser)
router.delete("/delete/:id", deleteUser)
router.post("/register/course", registerToCourse)
router.get("/:id", getUserById)
module.exports = router