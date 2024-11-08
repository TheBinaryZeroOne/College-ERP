import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCourses } from "../../features/CourseSlice";
import { BASE_URL } from "../../constants/baseUrl"
import axios from "axios";
import Cookies from "js-cookie";
import { toast } from "react-toastify";
import Loader from "../Common/loader/Loader";
import BackButton from "../../components/back";

const RemoveStudentFormCourse = () => {
  let courses = useSelector((state) => state.Courses);
  let dispatch = useDispatch();

  const [formData, setFormData] = useState({
    studentId: "",
    courseId: "",
  });

  const [imageLoaded, setImageLoaded] = useState(false);

  useEffect(() => {
    const img = new Image();
    img.src = "/src/assets/Chandigarh Engineering College Full Logo.png";
    img.onload = () => {
      setImageLoaded(true);
    };
  }, []);

  const [students, setStudents] = useState([]);

  //   fetching students from course
  const fetchStudents = async (courseId) => {
    if (!courseId) {
      setStudents([]); // Clear students if no course is selected
      return;
    }

    try {
      const res = await axios.get(
        `${BASE_URL}/courses/${courseId}/students`,
        {
          headers,
        }
      );

      if (res.data.success) {
        setStudents(res.data.students);
      } else {
        setStudents([]);
        console.error("Failed to fetch students: ", res.data.msg);
      }
    } catch (err) {
      console.error("Failed to fetch students", err);
      setStudents([]);
    }
  };

  // Change handler for form fields
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));

    if (name === "courseId") {
      fetchStudents(value);
    }
  };

  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${Cookies.get("token")}`,
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      let response = await axios.delete(
        `${BASE_URL}/courses/removeStudentFromCourse`,
        {
          headers,
          data: formData,
        }
      );

      toast.success("Teacher Removed Successfully");

      setFormData({
        studentId: "",
        courseId: "",
      });
    } catch (err) {
      console.error("Something went wrong", err);
      toast.error("Failed to remove teacher");
    }
  };

  useEffect(() => {
    dispatch(fetchCourses());
  }, [dispatch]);

  if (!imageLoaded) {
    return <Loader />;
  }

  return (
    <>
      <div className="flex flex-col w-full min-h-[100vh] bg-blue-400 pb-10">
        <div className="ms-5 mt-5 lg:mt-0 lg:ms-0">
          <BackButton targetRoute={"/admin/adminPanel"} />
        </div>

        <div className="text-white flex items-center justify-center py-11">
          <h1 className="font-extrabold text-5xl md:text-8xl text-center overflow-hidden">
            Remove Student
          </h1>
        </div>
        {/* form */}
        <div className="w-full flex justify-center px-5 lg:px-44">
          <form
            method="post"
            className="bg-white flex flex-col gap-3 justify-evenly py-10 w-full md:w-[40vw] px-20 border-2 border-black rounded-xl"
            onSubmit={handleSubmit}
          >
            <div className="w-full flex justify-center items-center">
              <div className="flex items-center justify-center w-52">
                <img
                  src="/src/assets/Chandigarh Engineering College Full Logo.png"
                  alt="logo"
                  className="w-full"
                />
              </div>
            </div>

            <div className="flex flex-col">
              <label
                className="block text-gray-700 font-bold mb-2"
                htmlFor="courseId"
              >
                Course
              </label>
              <select
                name="courseId"
                className="py-1 border border-black rounded-sm shadow-md shadow-gray-300 xl:w-26"
                value={formData.courseId}
                onChange={handleChange}
                required
              >
                <option value="">Select Course</option>
                {courses?.data?.map((course) => (
                  <option key={course._id} value={course._id}>
                    {course.courseName}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex flex-col">
              <label
                className="block text-gray-700 font-bold mb-2"
                htmlFor="studentId"
              >
                Student
              </label>
              <select
                name="studentId"
                className="py-1 border border-black rounded-sm shadow-md shadow-gray-300 xl:w-26"
                value={formData.studentId}
                onChange={handleChange}
                required
              >
                <option value="">Select Student</option>
                {students.map((student) => (
                  <option key={student._id} value={student._id}>
                    {student.first_name} {student.last_name} (
                    {student.student_id})
                  </option>
                ))}
              </select>
            </div>

            <div className="flex justify-center mt-4 w-[100%]">
              <button
                type="submit"
                className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              >
                Remove Student
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default RemoveStudentFormCourse;
