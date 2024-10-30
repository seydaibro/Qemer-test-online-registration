import AddCourseModal from "@/components/AddCourses";
import { useState } from "react";

const Courses = () => {
  const [isOpenAddCourse, setIsOpenAddCourse] = useState(false);

  return (
    <>
      {isOpenAddCourse && <AddCourseModal onClose={()=> setIsOpenAddCourse(false)} />}
      <div>
        <h1>Manage Your Courses</h1>
        <button onClick={() => setIsOpenAddCourse(true)} className="">
          Add Course
        </button>
      </div>
    </>
  );
}

export default Courses;

