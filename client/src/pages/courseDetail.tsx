import { useLocation } from "react-router-dom";
import { ICourse } from "@/interface";
import AddCourseModal from "@/components/AddCourses";
import { useState } from "react";

const CourseDetail = () => {
  const location = useLocation();
  const currentCourse: ICourse = location.state?.currentCourse;
  const [isOpenEditCourse, setIsOpenEditCourse] = useState(false);
  return (
    <>
     {isOpenEditCourse && (
        <AddCourseModal
          type="edit"
          course={currentCourse}
          onClose={() => setIsOpenEditCourse(false)}
        />
      )}
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-center mb-8">Course Details</h1>
      
      <div className="flex flex-col md:flex-row items-center md:items-start bg-white  overflow-hidden">
        
        {/* Course Image */}
        <div className="md:w-1/2 w-full h-64 md:h-auto">
          <img
            src={`../../uploads/${currentCourse?.imageUrl}`}
            alt={currentCourse?.name}
            className="w-full h-full object-cover"
          />
        </div>
        
        {/* Course Details */}
        <div className="md:w-1/2 w-full p-6 space-y-4">
          <h2 className="text-3xl font-semibold text-gray-800">{currentCourse?.name}</h2>
          <p className="text-gray-500">Duration: {currentCourse?.duration} hours</p>
          <h3 className="text-xl font-semibold text-gray-700">Description:</h3>
          <p className="text-gray-600 leading-relaxed">{currentCourse?.description}</p>
          
          {currentCourse?.prerequisites && (
            <>
              <h3 className="text-xl font-semibold text-gray-700">Prerequisites:</h3>
              <p className="text-gray-600">{currentCourse?.prerequisites}</p>
            </>
          )}

          {/* Action Buttons */}
          <div className="flex space-x-4 mt-6">
            <button
              className="bg-blue-600 text-white px-4 py-2 rounded-md shadow hover:bg-blue-700 transition"
              onClick={() => setIsOpenEditCourse(true)}
            >
              Edit Course
            </button>
            <button
              className="bg-red-600 text-white px-4 py-2 rounded-md shadow hover:bg-red-700 transition"
              onClick={() => {/* Delete functionality */}}
            >
              Delete Course
            </button>
          </div>
        </div>
      </div>
    </div>
    </>
  );
};

export default CourseDetail;
