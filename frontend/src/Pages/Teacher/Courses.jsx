import React, { useEffect, useState } from "react";
import TeacherNav from "./TeacherNav";
import { BASE_URL } from "../../constants/baseUrl"
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";

const Courses = () => {
  let [courses, setCourses] = useState([]);

  let navigate = useNavigate();

  let { id } = useParams();

  const getCourses = async () => {
    try {
      let response = await axios.get(`${BASE_URL}/courses`);
      setCourses(response.data.data);
    } catch (err) {
      console.log("Something went wrong", err);
    }
  };

  useEffect(() => {
    getCourses();
  }, []);

  return (
    <>
      <div className="flex w-full">
        <div className="fixed">
          <TeacherNav />
        </div>
        <div className="min-h-[100vh] w-full lg:ps-[24%] xl:ps-[22%] 2xl:ps-[15%]">
          <div className="w-full cursor-default">
            <h1 className="cursor-default overflow-hidden w-full text-center font-oswald font-bold text-5xl md:text-8xl lg:text-7xl xl:text-9xl my-9">
              Courses
            </h1>
          </div>
          <div className="px-10 py-5 font-oswald">
            <div className="flex flex-wrap gap-1 lg:gap-10 min-h-[50vh] items-center justify-center">
              {courses.map((course, index) => (
                <Link
                  key={course._id}
                  className="overflow-hidden w-[50vw] h-[20vh] lg:w-[18vw] lg:h-[18vh] xl:w-[15vw] xl:h-[15vh] p-3"
                  to={`/teacher/${id}/courses/course/${course._id}/subjects`}
                >
                  <div className="h-full w-full font-semibold text-xl border-2 rounded-lg border-black bg-gray-100 flex justify-center items-center hover:scale-105 duration-150">
                    <p className="overflow-hidden">{course.courseName}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Courses;
