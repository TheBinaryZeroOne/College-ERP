import React, { useEffect, useState } from "react";
import { BASE_URL } from "../../constants/baseUrl"
import axios from "axios";
import Cookies from "js-cookie";
import { toast } from "react-toastify";
import Loader from "../Common/loader/Loader";
import BackButton from "../../components/back";

const AddTeacher = () => {
  const [formData, setFormData] = useState({
    name: "",
    teacher_Id: "",
    email: "",
    password: "",
    gender: "",
    phno: "",
  });

  const [imageLoaded, setImageLoaded] = useState(false);

  useEffect(() => {
    const img = new Image();
    img.src = "/src/assets/Chandigarh Engineering College Full Logo.png";
    img.onload = () => {
      setImageLoaded(true);
    };
  }, []);

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
      await axios.post(`${BASE_URL}/teacher/addTeacher`, formData, {
        headers,
      });

      toast.success("Teacher Added Successfully");

      setFormData({
        name: "",
        teacher_Id: "",
        email: "",
        password: "",
        gender: "",
        phno: "",
      });
    } catch (err) {
      console.log("Something went wrong", err);
      toast.error("Failed to add teacher");
    }
  };

  if (!imageLoaded) {
    return <Loader />;
  }

  return (
    <div className="flex flex-col w-full min-h-[100vh] bg-blue-400 pb-10">
      <div className="ms-5 mt-5 lg:mt-0 lg:ms-0">
        <BackButton targetRoute={"/admin/adminPanel"} />
      </div>

      <div className="text-white flex items-center justify-center py-11">
        <h1 className="font-extrabold text-5xl md:text-8xl text-center overflow-hidden">
          Add Teacher
        </h1>
      </div>
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
              htmlFor="name"
            >
              Full Name
            </label>
            <input
              type="text"
              name="name"
              placeholder="Enter Full Name"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-2 focus:shadow-outline"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="flex flex-col">
            <label
              className="block text-gray-700 font-bold mb-2"
              htmlFor="teacher_Id"
            >
              Teacher ID
            </label>
            <input
              type="text"
              name="teacher_Id"
              placeholder="Enter Teacher ID"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-2 focus:shadow-outline"
              value={formData.teacher_Id}
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
          <div className="flex flex-col lg:flex-row gap-2 xl:gap-14">
            <div className="flex flex-col">
              <label
                className="block text-gray-700 font-bold mb-2"
                htmlFor="gender"
              >
                Gender
              </label>
              <select
                name="gender"
                className="py-1 border border-black rounded-sm shadow-md shadow-gray-300 xl:w-26"
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
                htmlFor="phno"
              >
                Phone Number
              </label>
              <input
                type="tel"
                name="phno"
                placeholder="+91"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-2 focus:shadow-outline"
                value={formData.phno}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          <div className="flex justify-center mt-4 w-[100%]">
            <button
              type="submit"
              className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Add Teacher
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddTeacher;
