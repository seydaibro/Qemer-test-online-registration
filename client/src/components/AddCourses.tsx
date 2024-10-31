import { IoClose } from "react-icons/io5";
import { useForm, SubmitHandler } from "react-hook-form";
import { useState, useEffect } from "react";
import { publicAxios } from "@/axios";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/redux/store";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { addCourse, EditCourse } from "@/redux/course/courseSlice";
import { ICourse } from "@/interface";
import { courseSchema } from "@/validation";

// Define the Zod schema for course validation
type CourseFormData = z.infer<typeof courseSchema>;

interface CourseModalProps {
  onClose: () => void;
  type: "add" | "edit";
  course?: ICourse;
}

const AddCourseModal = ({ onClose, type, course }: CourseModalProps) => {
  const [file, setFile] = useState<File | null>(null);
  const { isAddcourseLoading } = useSelector((state: RootState) => state.courses);
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<CourseFormData>({
    resolver: zodResolver(courseSchema),
  });

  useEffect(() => {
    if (type === "edit" && course) {
      setValue("name", course.name);
      setValue("duration", course.duration);
      setValue("description", course.description || "");
      setValue("prerequisites", course.prerequisites || "");
    }
  }, [type, course, setValue]);

  const upload = async () => {
    try {
      const formData = new FormData();
      if (file) formData.append("file", file);
      const res = await publicAxios.post("/upload", formData);
      return res.data;
    } catch (err) {
      console.error(err);
    }
  };

  const onSubmit: SubmitHandler<CourseFormData> = async (data) => {
    const imageUrl = file ? await upload() : course?.imageUrl;
    const finalData = { ...data, imageUrl };
    if (type === "add") {
      dispatch(addCourse(finalData));
    } else if (type === "edit" && course) {
      dispatch(EditCourse({ newData: finalData, id: course._id }));
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };

  return (
    <div className="fixed z-[900] top-0 left-0 w-full h-full bg-black bg-opacity-70">
      <div className="bg-white h-full w-full lg:w-[40%] float-right rounded-l-lg shadow-lg overflow-hidden relative">
        <button
          className="absolute top-6 right-6 text-gray-900 border border-gray-300 rounded-full p-1 hover:bg-gray-200 transition"
          onClick={onClose}
        >
          <IoClose size={20} />
        </button>
        <div className="h-full p-12">
          <h1 className="text-xl font-semibold mb-7 text-center">
            {type === "add" ? "Add New Course" : "Edit Course"}
          </h1>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="flex flex-col">
              <div className="relative w-full mb-4">
                {file ? (
                  <img
                    src={`${URL.createObjectURL(file)} `}
                    className="w-full h-[100px] object-cover rounded-md absolute"
                    alt="Course"
                  />
                ) : course?.imageUrl ? (
                  <img
                    src={course.imageUrl}
                    className="w-full h-[100px] object-cover rounded-md absolute"
                    alt="Course"
                  />
                ) : null}
                <input
                  hidden
                  id="file"
                  name="file"
                  accept="image/*"
                  type="file"
                  onChange={handleFileChange}
                />
                <label
                  htmlFor="file"
                  className="w-full h-[100px] border border-gray-300 flex items-center justify-center rounded-md cursor-pointer hover:border-blue-500 transition"
                >
                  <p className="text-gray-500">
                    {file || course?.imageUrl ? "Change Image" : "Upload Course Image"}
                  </p>
                </label>
              </div>
              <div className="flex flex-col mb-4">
                <label className="text-base">Course Name</label>
                <input
                  className="border border-gray-400 px-3 py-2 rounded-md focus:outline-none focus:ring focus:ring-blue-300"
                  {...register("name")}
                />
                {errors.name && (
                  <span className="text-red-500 text-sm">{errors.name.message}</span>
                )}
              </div>
              <div className="flex flex-col mb-4">
                <label className="text-base">Duration (in hours)</label>
                <input
                  className="border border-gray-400 px-3 py-2 rounded-md focus:outline-none focus:ring focus:ring-blue-300"
                  type="number"
                  {...register("duration", { valueAsNumber: true })}
                />
                {errors.duration && (
                  <span className="text-red-500 text-sm">{errors.duration.message}</span>
                )}
              </div>
              <div className="flex flex-col mb-4">
                <label className="text-base">Description (optional)</label>
                <textarea
                  className="border border-gray-400 px-3 py-2 rounded-md focus:outline-none focus:ring focus:ring-blue-300"
                  {...register("description")}
                />
              </div>
              <div className="flex flex-col mb-4">
                <label className="text-base">Prerequisites (optional)</label>
                <textarea
                  className="border border-gray-400 px-3 py-2 rounded-md focus:outline-none focus:ring focus:ring-blue-300"
                  {...register("prerequisites")}
                />
              </div>
            </div>
            <button
              className="bg-blue-600 text-white px-4 py-2 rounded-md w-full hover:bg-blue-700 transition"
              type="submit"
              disabled={isAddcourseLoading}
            >
              {isAddcourseLoading ? "Loading..." : type === "add" ? "Add Course" : "Update Course"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddCourseModal;
