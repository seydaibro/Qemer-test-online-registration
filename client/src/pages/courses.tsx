import AddCourseModal from "@/components/AddCourses";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/redux/store";
import { getAllCourse } from "@/redux/course/courseSlice";
import { Link, useNavigate } from "react-router-dom";
import { userRegisterToCourse } from "@/redux/user/userSlice";
import { ICourse } from "@/interface";
import { toast } from "react-toastify";
import { PuffLoader } from "react-spinners";

const Courses = () => {
  const [isOpenAddCourse, setIsOpenAddCourse] = useState(false);
  const [currentCourse, setCurrentCourse] = useState<ICourse>(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { courses, isLoading } = useSelector((state: RootState) => state.courses);
  const { user } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    dispatch(getAllCourse());
  }, [dispatch]);

  const truncateText = (text, maxLength = 100) =>
    text.length > maxLength ? `${text.slice(0, maxLength)}...` : text;

  const handlenavigate = () => {
    if (currentCourse) {
      navigate("/course-detail", { state: { currentCourse: currentCourse } });
    }
  };

  const handlestartLearning = (course: ICourse) => {
    if (user) {
      dispatch(userRegisterToCourse({ user_id: user._id, course_id: course._id }));
    } else {
      toast.error("You have to Sign up to Register to the course");
    }
  };

  if (isLoading) {
    return (
      <div className="z-50 overflow-auto w-full flex items-center justify-center">
        <div className="h-[70vh] flex items-center justify-center">
          <PuffLoader color="rgb(30,64,175)" size={150} aria-label="Loading Spinner" data-testid="loader" />
        </div>
      </div>
    );
  }

  return (
    <>
      {isOpenAddCourse && (
        <AddCourseModal type="add" onClose={() => setIsOpenAddCourse(false)} />
      )}

      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-center mb-8">
          Manage Your Courses
        </h1>
        <button
          onClick={() => setIsOpenAddCourse(true)}
          className="mb-6 bg-blue-600 text-white px-4 py-2 rounded-md shadow-md hover:bg-blue-700 transition"
        >
          Add Course
        </button>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.length === 0 ? (
            <div className="col-span-1 text-center">
              <p className="text-gray-500">No courses available.</p>
            </div>
          ) : (
            courses.map((course) => {
              const isRegistered = user?.courses?.some(
                (registeredCourse) => registeredCourse._id === course._id
              );

              return (
                <div
                  key={course._id}
                  className="relative bg-white rounded-lg shadow-md overflow-hidden"
                >
                  {/* Image Container with Hover Effect */}
                  <div className="relative group">
                    <img
                      src={`../../uploads/${course.imageUrl}`}
                      alt={course.name}
                      className="w-full h-48 object-cover"
                    />
                    <div className="absolute top-0 left-0 right-0 h-full bg-gray-800 bg-opacity-75 text-white p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <h3 className="font-semibold">Description:</h3>
                      <p className="mt-1">
                        {truncateText(course.description, 100)}
                      </p>
                      {course.prerequisites && (
                        <>
                          <h3 className="font-semibold mt-2">Prerequisites:</h3>
                          <p>{truncateText(course.prerequisites, 50)}</p>
                        </>
                      )}
                    </div>
                  </div>

                  {/* Course Info */}
                  <div className="p-4">
                    <h2 className="text-xl font-semibold">{course.name}</h2>
                    <span className="text-gray-500">
                      Duration: {course.duration} hours
                    </span>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex justify-between p-4 bg-white z-10 relative">
                    {isRegistered ? (
                      <button className="bg-yellow-600 text-white px-3 py-1 rounded-md cursor-not-allowed">
                        On Progress
                      </button>
                    ) : (
                      <button
                        onClick={() => handlestartLearning(course)}
                        className="bg-green-600 text-white px-3 py-1 rounded-md hover:bg-green-700 transition"
                      >
                        Start Learning
                      </button>
                    )}
                    <button
                      onClick={() => {
                        setCurrentCourse(course);
                        handlenavigate();
                      }}
                      className="bg-blue-600 text-white px-3 py-1 rounded-md hover:bg-blue-700 transition"
                    >
                      More Info
                    </button>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </>
  );
};

export default Courses;
