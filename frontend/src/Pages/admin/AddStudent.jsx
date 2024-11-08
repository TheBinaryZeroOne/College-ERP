import React, { useEffect, useState } from "react";
import { BASE_URL } from "../../constants/baseUrl";
import { useDispatch, useSelector } from "react-redux";
import { fetchCourses } from "../../features/CourseSlice";
import axios from "axios";
import Cookies from "js-cookie";
import { toast } from "react-toastify";
import Loader from "../Common/loader/Loader";
import BackButton from "../../components/back";

const AddStudent = () => {
  const Courses = useSelector((state) => state.Courses);
  const dispatch = useDispatch();

  const [imageLoaded, setImageLoaded] = useState(false);

  useEffect(() => {
    const img = new Image();
    img.src = "/src/assets/Chandigarh Engineering College Full Logo.png";
    img.onload = () => {
      setImageLoaded(true);
    };
  }, []);

  useEffect(() => {
    dispatch(fetchCourses());
  }, [dispatch]);

  // Single state object for all form fields
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    student_id: "",
    email: "",
    password: "",
    dob: "",
    gender: "",
    phone: "",
    course: "",
  });

  // Change handler for form fields
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${Cookies.get("token")}`,
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      let response = await axios.post(
        `${BASE_URL}/student/register`,
        formData,
        { headers }
      );

      toast.success("Student Added Successfully");

      // Reset form fields after submission
      setFormData({
        first_name: "",
        last_name: "",
        student_id: "",
        email: "",
        password: "",
        dob: "",
        gender: "",
        phone: "",
        course: "",
      });
    } catch (err) {
      console.log("Something went wrong", err);
      toast.error("Failed to add student");
    }
  };

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
            Add Student
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

            <div className="flex flex-col mt-3">
              <label
                className="block text-gray-700 font-bold mb-2"
                htmlFor="first_name"
              >
                First Name
              </label>
              <input
                type="text"
                name="first_name"
                placeholder="Enter First Name"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-2 focus:shadow-outline"
                value={formData.first_name}
                onChange={handleChange}
                required
              />
            </div>
            <div className="flex flex-col">
              <label
                className="block text-gray-700 font-bold mb-2"
                htmlFor="last_name"
              >
                Last Name
              </label>
              <input
                type="text"
                name="last_name"
                placeholder="Enter Surname"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-2 focus:shadow-outline"
                value={formData.last_name}
                onChange={handleChange}
                required
              />
            </div>
            <div className="flex flex-col">
              <label
                className="block text-gray-700 font-bold mb-2"
                htmlFor="student_id"
              >
                Student ID
              </label>
              <input
                type="text"
                name="student_id"
                placeholder="Enter Student ID"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-2 focus:shadow-outline"
                value={formData.student_id}
                onChange={handleChange}
                required
              />
            </div>
            <div className="flex flex-col justify-between gap-3 lg:flex-row">
              <div className="flex flex-col w-60">
                <label
                  className="block text-gray-700 font-bold mb-2"
                  htmlFor="email"
                >
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  placeholder="Enter email"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-2 focus:shadow-outline"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="flex flex-col">
                <label
                  className="block text-gray-700 font-bold mb-2"
                  htmlFor="password"
                >
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  placeholder="Enter password"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-2 focus:shadow-outline"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            {/* dob gender */}
            <div className="flex flex-col lg:flex-row gap-2 xl:gap-14">
              <div className="flex flex-col">
                <label
                  className="block text-gray-700 font-bold mb-2"
                  htmlFor="dob"
                >
                  Date of Birth
                </label>
                <input
                  type="date"
                  name="dob"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-2 focus:shadow-outline"
                  value={formData.dob}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="flex flex-col">
                <label
                  className="block text-gray-700 font-bold mb-2"
                  htmlFor="gender"
                >
                  Gender
                </label>
                <select
                  name="gender"
                  className="py-1 border border-black rounded-sm shadow-md shadow-gray-300 xl:w-20"
                  value={formData.gender}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="others">Others</option>
                </select>
              </div>
            </div>
            <div className="flex flex-col justify-between gap-3 lg:flex-row">
              <div className="flex flex-col w-60">
                <label
                  className="block text-gray-700 font-bold mb-2"
                  htmlFor="phone"
                >
                  Phone Number
                </label>
                <input
                  type="tel"
                  name="phone"
                  placeholder="+91"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-2 focus:shadow-outline"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="flex flex-col">
                <label
                  className="block text-gray-700 font-bold mb-2"
                  htmlFor="course"
                >
                  Course
                </label>
                <select
                  name="course"
                  className="py-1 border border-black rounded-sm shadow-md shadow-gray-300"
                  value={formData.course}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select Course</option>
                  {Courses?.data?.map((i) => (
                    <option key={i._id} value={i._id}>
                      {i.courseName}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="flex justify-center mt-4 w-[100%]">
              <button
                type="submit"
                className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              >
                Add Student
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default AddStudent;
