import React, { useState } from "react";
import StudentNav from "../Student/StudentNav";
import { toast } from "react-toastify";
import { BASE_URL } from "../../constants/baseUrl"
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import Cookies from "js-cookie";
import { useSelector } from "react-redux";
import TeacherNav from "../Teacher/TeacherNav";

const UpdatePass = () => {
  const { id } = useParams();

  let role = useSelector((state) => state.User.role);

  let navigate = useNavigate();

  const [data, setData] = useState({
    currpass: "",
    newpass: "",
    confirmpass: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      let res =
        role === "teacher"
          ? await axios.put(
              `${BASE_URL}/teacher/updatePassword/${id}`,
              data,
              {
                headers: {
                  "Content-Type": "application/json",
                  Authorization: `Bearer ${Cookies.get("token")}`,
                },
              }
            )
          : await axios.put(
              `${BASE_URL}/student/updatePass/${id}`,
              data,
              {
                headers: {
                  "Content-Type": "application/json",
                  Authorization: `Bearer ${Cookies.get("token")}`,
                },
              }
            );

      // let res = await axios.put(
      //   `http://localhost:4000/student/updatePass/${id}`,
      //   data,
      //   {
      //     headers: {
      //       "Content-Type": "application/json",
      //       Authorization: `Bearer ${Cookies.get("token")}`,
      //     },
      //   }
      // );

      setData({
        currpass: "",
        newpass: "",
        confirmpass: "",
      });

      toast.success("Password Updated Successfully");

      role === "teacher"
        ? navigate(`/teacher/${id}/courses`)
        : navigate(`/student/${id}/attendance`);
    } catch (err) {
      console.log("Something Went Wrong", err);
      toast.error(err.response.data.msg);
    }
  };

  return (
    <>
      <div className="flex w-full relative">
        <div className="fixed top-0 left-0">
          {role == "teacher" ? <TeacherNav /> : <StudentNav />}
        </div>
        <div className="w-full lg:pl-[24%] xl:pl-[15%] min-h-[100vh] font-oswald">
          {/* heading */}
          <div className="w-full cursor-default">
            <h1 className="overflow-hidden w-full text-center font-oswald font-bold text-5xl md:text-8xl lg:text-7xl xl:text-9xl my-9">
              Update Password
            </h1>
          </div>

          {/* main page */}

          <div className="w-full flex justify-center items-center">
            <form
              onSubmit={handleSubmit}
              className="mx-5 text-xl font-medium mt-8 mb-10 xl:mt-7 min-h-[30vh] min-w-[80vw] lg:min-w-[50vw] border-2 rounded-lg border-black flex flex-col gap-2 px-5 py-7"
            >
              <div className="overflow-hidden flex flex-col gap-2">
                <label htmlFor="currpass" className="overflow-hidden">
                  Current Password
                </label>
                <input
                  type="password"
                  placeholder="Enter Current Password"
                  className="w-full border border-black rounded-md py-2 px-2 text-sm"
                  name="currpass"
                  value={data.currpass}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="overflow-hidden flex flex-col gap-2">
                <label htmlFor="newpass" className="overflow-hidden">
                  New Password
                </label>
                <input
                  type="password"
                  placeholder="Enter Current Password"
                  className="w-full border border-black rounded-md py-2 px-2 text-sm"
                  name="newpass"
                  value={data.newpass}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="overflow-hidden flex flex-col gap-2">
                <label htmlFor="confirmpass" className="overflow-hidden">
                  Confirm Password
                </label>
                <input
                  type="password"
                  placeholder="Enter Current Password"
                  className="w-full border border-black rounded-md py-2 px-2 text-sm"
                  name="confirmpass"
                  value={data.confirmpass}
                  onChange={handleChange}
                  required
                />
              </div>

              <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4"
              >
                Update Password
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default UpdatePass;
