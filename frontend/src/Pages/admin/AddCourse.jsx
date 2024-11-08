import React, { useState, useEffect } from "react";
import { BASE_URL } from "../../constants/baseUrl";
import axios from "axios";
import Cookies from "js-cookie";
import { toast } from "react-toastify";
import Loader from "../Common/loader/Loader";
import BackButton from "../../components/back";

const AddCourse = () => {
  const [formData, setFormData] = useState({
    courseName: "",
    subjects: ["", "", "", "", "", ""], // Six subject input fields
  });

  const [imageLoaded, setImageLoaded] = useState(false);

  useEffect(() => {
    const img = new Image();
    img.src = "/src/assets/Chandigarh Engineering College Full Logo.png";
    img.onload = () => {
      setImageLoaded(true);
    };
  }, []);

  // Change handler for course name
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // Change handler for subjects
  const handleSubjectChange = (index, e) => {
    const { value } = e.target;
    setFormData((prevState) => {
      const newSubjects = [...prevState.subjects];
      newSubjects[index] = value;
      return {
        ...prevState,
        subjects: newSubjects,
      };
    });
  };

  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${Cookies.get("token")}`,
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Transform subjects into an array of objects with subName property
    // trim is used to remove whiteSpaces from the starting and end of the string(input)
    const subjects = formData.subjects
      .filter((subject) => subject.trim() !== "")
      .map((subject) => ({ subName: subject }));

    try {
      // { ...formData, subjects }: This syntax merges the original formData with the new subjects array.
      //    The ...formData spreads all properties of formData into the new object, but since we provide
      // subjects after ...formData, it overwrites the original subjects with the new, filtered array.
      const response = await axios.post(
        `${BASE_URL}/courses/addCourse`,
        { ...formData, subjects }, // Send only non-empty subjects
        { headers }
      );

      // Log the response to debug
      console.log("Server response:", response.data);

      toast.success("Course Added Successfully");

      // Reset form fields after submission
      setFormData({
        courseName: "",
        subjects: ["", "", "", "", "", ""], // Reset subjects to empty strings
      });
    } catch (err) {
      console.error("Something went wrong", err);
      toast.error("Failed to add course");
    }
  };

  if (!imageLoaded) {
    return <Loader />;
  }

  return (
    <div className="flex flex-col w-full min-h-[100vh] bg-blue-400 pb-10">
      <div className="ms-5 mt-5 xl:mt-0 xl:">
        <BackButton targetRoute={"/admin/adminPanel"} />
      </div>

      <div className="text-white flex items-center justify-center py-11">
        <h1 className="font-extrabold text-5xl md:text-8xl text-center overflow-hidden">
          Add Course
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
              htmlFor="courseName"
            >
              Course Name
            </label>
            <input
              type="text"
              name="courseName"
              placeholder="Enter Course Name"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-2 focus:shadow-outline"
              value={formData.courseName}
              onChange={handleChange}
              required
            />
          </div>

          {formData.subjects.map((subject, index) => (
            <div className="flex flex-col mt-3" key={index}>
              <label
                className="block text-gray-700 font-bold mb-2"
                htmlFor={`subject-${index}`}
              >
                Subject {index + 1} {index < 4 ? "(Required)" : "(Optional)"}
              </label>
              <input
                type="text"
                id={`subject-${index}`}
                placeholder={`Enter Subject ${index + 1} Name`}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-2 focus:shadow-outline"
                value={subject}
                onChange={(e) => handleSubjectChange(index, e)}
                required={index < 4} // Only first four subjects are required
              />
            </div>
          ))}

          <div className="flex justify-center mt-4 w-[100%]">
            <button
              type="submit"
              className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Add Course
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddCourse;
