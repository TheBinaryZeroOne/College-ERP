import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import TeacherNav from "../../Teacher/TeacherNav";
import StudentNav from "../../Student/StudentNav";
import { BASE_URL } from "../../../constants/baseUrl"
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const VerifyOtp = () => {
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

  let navigate = useNavigate();

  const [otp, setOtp] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      let res =
        role === "teacher"
          ? await axios.post(
              `${BASE_URL}/teacher/forgetPassword/verifyotp`,
              { opt: Number(otp), password }
            )
          : await axios.post(
              `${BASE_URL}/student/forgetPassword/verifyotp`,
              { otp: Number(otp), password }
            );

      console.log(res.data);

      if (res.data.success) {
        setOtp(null);
        setPassword("");
        toast.success(res.data.msg);
        navigate("/");
      }
    } catch (err) {
      console.log("Something went wrong", err);
      toast.error(err.response.data.msg);
    }
  };

  return (
    <>
      <div className="flex w-full relative">
        <div className="flex flex-col justify-center gap-10 w-full min-h[100vh]">
          <div className="overflow-hidden w-full cursor-default">
            <h1 className="overflow-hidden w-full h-full text-center font-oswald font-bold text-5xl md:text-8xl lg:text-7xl xl:text-9xl my-9">
              Verify OTP
            </h1>
          </div>

          <div className="w-full flex justify-center items-center lg:mt-2 xl:mt-10 mt-10">
            <form
              onSubmit={handleSubmit}
              className="mx-5 text-xl font-medium mt-8 mb-10 xl:mt-7 min-w-[80vw] lg:min-w-[50vw] border-2 rounded-lg border-black flex flex-col gap-2 px-5 py-7"
            >
              <div className="overflow-hidden flex flex-col gap-2">
                <label htmlFor="email" className="overflow-hidden">
                  OTP
                </label>
                <input
                  type="number"
                  value={otp}
                  placeholder="Enter OTP"
                  className="w-full border border-black rounded-md py-2 px-2 text-sm"
                  onChange={(e) => {
                    setOtp(e.target.value);
                  }}
                  maxLength={4}
                  required
                />
              </div>
              <div className="overflow-hidden flex flex-col gap-2">
                <label htmlFor="email" className="overflow-hidden">
                  Password
                </label>
                <input
                  type="password"
                  value={password}
                  placeholder="Enter New Password"
                  className="w-full border border-black rounded-md py-2 px-2 text-sm"
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                  required
                />
              </div>
              <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4"
              >
                Change Password
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default VerifyOtp;
