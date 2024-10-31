const router = require("express").Router()
const {getAllUsers, editUser, deleteUser, registerToCourse} = require("../controller/userController")
router.get("/", getAllUsers)
router.put("/:id", editUser)
router.delete("/:id", deleteUser)
router.post("/register/course", registerToCourse)



module.exports = router