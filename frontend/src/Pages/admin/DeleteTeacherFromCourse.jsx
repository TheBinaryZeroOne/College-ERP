import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCourses } from "../../features/CourseSlice";
import { BASE_URL } from "../../constants/baseUrl";
import axios from "axios";
import Cookies from "js-cookie";
import { toast } from "react-toastify";
import Loader from "../Common/loader/Loader";
import BackButton from "../../components/back";

const DeleteTeacherFromCourse = () => {
  let courses = useSelector((state) => state.Courses);
  let dispatch = useDispatch();

  let [subjects, setSubjects] = useState([]);
  let [selectedCourse, setSelectedCourse] = useState("");
  let [selectedSubject, setSelectedSubject] = useState("");
  let [teachers, setTeachers] = useState([]);

  const [formData, setFormData] = useState({
    teacherId: "",
    courseId: "",
    subjectId: "",
  });

  const [imageLoaded, setImageLoaded] = useState(false);

  useEffect(() => {
    const img = new Image();
    img.src = "/src/assets/Chandigarh Engineering College Full Logo.png";
    img.onload = () => {
      setImageLoaded(true);
    };
  }, []);

  // Fetch subjects whenever selectedCourse changes
  useEffect(() => {
    const fetchSubjects = async () => {
      if (!selectedCourse) {
        setSubjects([]); // Clear subjects if no course is selected
        return;
      }
      try {
        let res = await axios.get(
          `${BASE_URL}/courses/${selectedCourse}/subjects`
        );

        if (res.data.success) {
          setSubjects(res.data.subjects);
        } else {
          setSubjects([]);
          console.error("Failed to fetch subjects: ", res.data.message);
        }
      } catch (err) {
        console.error("Failed to fetch subjects", err);
        setSubjects([]);
      }
    };

    fetchSubjects();
  }, [selectedCourse]);

  // Fetch teachers whenever selectedSubject changes
  useEffect(() => {
    const fetchTeachers = async () => {
      if (!selectedCourse || !selectedSubject) {
        setTeachers([]); // Clear teachers if no course or subject is selected
        return;
      }
      try {
        let res = await axios.get(
          `${BASE_URL}/courses/${selectedCourse}/subjects/${selectedSubject}/teachers`
        );

        if (res.data.success) {
          setTeachers(res.data.teachers);
        } else {
          setTeachers([]);
          console.error("Failed to fetch teachers: ", res.data.message);
        }
      } catch (err) {
        console.error("Failed to fetch teachers", err);
        setTeachers([]);
      }
    };

    fetchTeachers();
  }, [selectedCourse, selectedSubject]);

  // Change handler for form fields
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));

    if (name === "courseId") {
      setSelectedCourse(value);
      setSelectedSubject("");
      setTeachers([]);
    } else if (name === "subjectId") {
      setSelectedSubject(value);
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
        "http://localhost:4000/courses/removeTeacherFromCourse",
        {
          headers,
          data: formData, // Send formData in data key
        }
      );

      toast.success("Teacher Removed Successfully");

      setFormData({
        teacherId: "",
        courseId: "",
        subjectId: "",
      });
      setSubjects([]);
      setTeachers([]);
      setSelectedCourse("");
      setSelectedSubject("");
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
            Remove Teacher
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
                htmlFor="subjectId"
              >
                Subject
              </label>
              <select
                name="subjectId"
                className="py-1 border border-black rounded-sm shadow-md shadow-gray-300 xl:w-26"
                value={formData.subjectId}
                onChange={handleChange}
                required
              >
                <option value="">Select Subject</option>
                {Array.isArray(subjects) &&
                  subjects.map((subject) => (
                    <option key={subject._id} value={subject._id}>
                      {subject.subName}
                    </option>
                  ))}
              </select>
            </div>

            <div className="flex flex-col">
              <label
                className="block text-gray-700 font-bold mb-2"
                htmlFor="teacherId"
              >
                Teacher
              </label>
              <select
                name="teacherId"
                className="py-1 border border-black rounded-sm shadow-md shadow-gray-300 xl:w-26"
                value={formData.teacherId}
                onChange={handleChange}
                required
              >
                <option value="">Select Teacher</option>
                {Array.isArray(teachers) &&
                  teachers.map((teacher) => (
                    <option key={teacher._id} value={teacher._id}>
                      {teacher.name}
                    </option>
                  ))}
              </select>
            </div>

            <div className="flex justify-center mt-4 w-[100%]">
              <button
                type="submit"
                className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              >
                Remove Teacher
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default DeleteTeacherFromCourse;
