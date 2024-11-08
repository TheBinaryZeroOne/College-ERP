import React, { useState, useEffect } from "react";
import { BASE_URL } from "../../constants/baseUrl";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import Cookies from "js-cookie";
import { useDispatch } from "react-redux";
import { addUserDetails } from "../../features/UserSlice";
import { jwtDecode } from "jwt-decode";
import Loader from "./loader/Loader";

const Login = () => {
  const [rollNo, setRollNo] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("student"); // default role
  const navigate = useNavigate();

  let dispatch = useDispatch();

  const [imageLoaded, setImageLoaded] = useState(false);

  useEffect(() => {
    const img = new Image();
    img.src = "/src/assets/Chandigarh Engineering College Full Logo.png";
    img.onload = () => {
      setImageLoaded(true);
    };
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Send login request
      const response =
        role == "student"
          ? await axios.post(`${BASE_URL}/student/login`, {
              student_id: rollNo,
              password: password,
            })
          : await axios.post(`${BASE_URL}/teacher/login`, {
              teacher_Id: rollNo,
              password,
            });

      console.log(response.data);

      const { token } = response.data;

      Cookies.set("token", token);

      dispatch(addUserDetails({ token: token }));

      let decodedToken = jwtDecode(token);
      console.log(decodedToken);

      if (decodedToken.role == "admin") {
        return navigate("/admin/adminPanel");
      } else {
        return role == "student"
          ? navigate(`/student/${decodedToken.id}/attendance`)
          : navigate(`/teacher/${decodedToken.id}/courses`);
      }
    } catch (err) {
      console.error("Login error:", err.response ? err.response.data : err);
      toast.error("Invalid Credintials");
    }
  };

  if (!imageLoaded) {
    return <Loader />;
  }

  return (
    <div className="flex font-oswald">
      {/* College logo */}
      <div className="w-[50%] h-screen hidden lg:block">
        <img
          className="h-[100%] w-[100%]"
          src="https://media.licdn.com/dms/image/D4D22AQGHucPZtJtSeA/feedshare-shrink_800/0/1689740960638?e=2147483647&v=beta&t=sGhGLQRQjhSZd7NWNsUL-Ge497aDqSaIGrUszGaTtKc"
          alt="college image"
        />
      </div>

      {/* Form area */}
      <div className="w-screen lg:w-[50%] h-screen bg-white flex items-center justify-center flex-col gap-5">
        {/* Logo */}
        <div className="w-[100%] flex items-center justify-center">
          <img
            className="w-[50%]"
            src=" src/assets/Chandigarh Engineering College Full Logo.png"
            alt="Chandigarh Engineering College Logo"
          />
        </div>

        {/* Form */}
        <div className="w-screen lg:w-[100%] px-10 lg:px-[5rem] xl:px-[10rem]">
          <form
            method="post"
            onSubmit={handleSubmit}
            className="flex flex-col justify-between gap-2 border-2 border-black rounded-lg px-3 py-3"
          >
            {/* Role options */}
            <div className="w-full flex justify-evenly px-5 mb-4">
              <button
                type="button"
                className={`font-bold ${
                  role === "student" ? "text-blue-500" : "text-gray-500"
                }`}
                onClick={() => setRole("student")}
              >
                Student
              </button>
              <div className="bg-black w-1"></div>
              <button
                type="button"
                className={`font-bold ${
                  role === "teacher" ? "text-blue-500" : "text-gray-500"
                }`}
                onClick={() => setRole("teacher")}
              >
                Teacher
              </button>
            </div>
            <hr className="border-t-2 border-black" />

            {/* Input fields */}
            <div className="flex flex-col gap-4 mt-4">
              <div className="flex flex-col">
                <label
                  className="block text-gray-700 font-bold mb-2"
                  htmlFor="roll number"
                >
                  Roll No.
                </label>
                <input
                  type="text"
                  id="rollno"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  value={rollNo}
                  onChange={(e) => setRollNo(e.target.value)}
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
                  id="password"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="mt-1">
              <Link
                to={
                  role === "student"
                    ? "/student/00151561ada/forgetPassword"
                    : "/teacher/ddfsd45/forgetPassword"
                }
              >
                <u className="cursor-pointer">Forget Password</u>
              </Link>
            </div>

            {/* Submit button */}
            <div className="flex justify-center mt-4 w-[100%]">
              <button
                type="submit"
                className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              >
                Login
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
