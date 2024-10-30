const router = require("express").Router()
const {getAllUsers, editUser, deleteUser} = require("../controller/userController")
router.get("/", getAllUsers)
router.put("/:id", editUser)
router.delete("/:id", deleteUser)



module.exports = router