const router = require("express").Router()
const {
    addCourse,
    getAllCourses,
    deleteCourse,
    editCourse
} = require("../controller/courseController")
router.post("/create", addCourse) 
   
 router.get("/", getAllCourses)
 router.delete("/delete/:id", deleteCourse)
router.put("/edit/:id", editCourse)



module.exports = router