import { BASE_URL } from "../../constants/baseUrl"
import axios from "axios";
import Cookies from "js-cookie";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Loader from "../Common/loader/Loader";
import BackButton from "../../components/back";

const DeleteTeacher = () => {
  const [formData, setFormData] = useState({
    teacherId: "",
  });

  const [imageLoaded, setImageLoaded] = useState(false);

  useEffect(() => {
    const img = new Image();
    img.src = "/src/assets/Chandigarh Engineering College Full Logo.png";
    img.onload = () => {
      setImageLoaded(true);
    };
  }, []);

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
      let response = await axios.delete(
        `${BASE_URL}/teacher/deleteTeacher`,
        {
          data: formData,
          headers,
        }
      );

      toast.success("Teacher Deleted Successfully");

      setFormData({
        teacherId: "",
      });
    } catch (err) {
      console.error("Something went wrong", err);
      toast.error("Failed to Delete Teacher");
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
            Delete Teacher
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
                htmlFor="teacherId"
              >
                Teacher ID
              </label>
              <input
                type="text"
                name="teacherId"
                placeholder="Enter Teacher ID"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-2 focus:shadow-outline"
                value={formData.teacherId}
                onChange={handleChange}
                required
              />
            </div>

            <div className="flex justify-center mt-4 w-[100%]">
              <button
                type="submit"
                className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              >
                Delete Teacher
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default DeleteTeacher;
