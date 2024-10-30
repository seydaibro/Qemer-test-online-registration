const router = require("express").Router()
const {
    addCourse
} = require("../controller/courseController")
router.post("/create", addCourse) 
   
// router.get("/", getAllBrands)
// router.get("/:id", getOneBrand)
// router.delete("/:id", removeBrand)
// router.put("/:id", updateBrand)
// router.post("/", addBrand)


module.exports = router