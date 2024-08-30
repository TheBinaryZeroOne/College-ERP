import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import TeacherNav from "../../Teacher/TeacherNav";
import StudentNav from "../../Student/StudentNav";
import axios from "axios";
import { toast } from "react-toastify";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import Back from "../../../components/back";

const ForgetPass = () => {
  const location = useLocation();

  const pathParts = location.pathname.split("/");
  const firstPart = pathParts[1];
  console.log(firstPart);

  const [role, setRole] = useState("");

  useEffect(() => {
    if (firstPart == "student") {
      setRole("student");
    } else {
      setRole("teacher");
    }
  }, []);

  // let role = useSelector((state) => state.User.role);

  let { id } = useParams();

  const [email, setEmail] = useState("");

  let navigate = useNavigate("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      let res =
        role === "teacher"
          ? await axios.post("http://localhost:4000/teacher/forgetPassword", {
              email,
            })
          : await axios.post("http://localhost:4000/student/forgetPassword", {
              email,
            });

      if (res.data.success) {
        setEmail("");
        toast.success(res.data.msg);
        role === "teacher"
          ? navigate(`/teacher/${id}/forgetPassword/verifyotp`)
          : navigate(`/student/${id}/forgetPassword/verifyotp`);
      }
    } catch (err) {
      console.log("Something went wrong", err);
      toast.error(err.response.data.msg);
    }
  };

  return (
    <>
      <div className="flex flex-col gap-2 w-full relative">
        <div className="mt-5 ms-5 lg:mt-0 lg:ms-0">
          <Back targetRoute={"/"} />
        </div>

        <div className="flex flex-col justify-center gap-0 w-full min-h[100vh]">
          <div className="overflow-hidden w-full cursor-default">
            <h1 className="overflow-hidden w-full h-full text-center font-oswald font-bold text-5xl md:text-8xl lg:text-7xl xl:text-9xl my-9">
              Forget Password
            </h1>
          </div>

          {/* main page  */}
          <div className="w-full flex justify-center items-center lg:mt-2 xl:mt-10 mt-10">
            <form
              onSubmit={handleSubmit}
              className="mx-5 text-xl font-medium mt-8 mb-10 xl:mt-7 min-w-[80vw] lg:min-w-[50vw] border-2 rounded-lg border-black flex flex-col gap-2 px-5 py-7"
            >
              <div className="overflow-hidden flex flex-col gap-2">
                <label htmlFor="email" className="overflow-hidden">
                  Email
                </label>
                <input
                  type="email"
                  value={email}
                  placeholder="Enter Email"
                  className="w-full border border-black rounded-md py-2 px-2 text-sm"
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                  required
                />
              </div>
              <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4"
              >
                Confirm Email
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default ForgetPass;