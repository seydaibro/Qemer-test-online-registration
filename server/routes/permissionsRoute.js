const router = require("express").Router()
const { getAllPermisions
    } = require("../controller/permissionController")
router.get("/", getAllPermisions)



module.exports = router