import React, { useEffect, useState } from "react";
import TeacherNav from "./TeacherNav";
import { useParams, Link } from "react-router-dom";
import { BASE_URL } from '../../constants/baseUrl'
import axios from "axios";

const Subjects = () => {
  let { courseId, id } = useParams();

  const [subjects, setSubjects] = useState([]);

  const fetchSubjects = async () => {
    try {
      let res = await axios.get(
        `${BASE_URL}/courses/${courseId}/subjects`
      );
      setSubjects(res.data.subjects);
    } catch (err) {
      console.log("Something went wrong", err);
    }
  };

  useEffect(() => {
    fetchSubjects();
  }, [courseId]); // Adding courseId to the dependency array to refetch if it changes

  return (
    <>
      <div className="flex w-full">
        <div className="fixed">
          <TeacherNav />
        </div>

        <div className="min-h-[100vh] w-full lg:ps-[24%] xl:ps-[22%] 2xl:ps-[15%]">
          <div className="w-full cursor-default">
            <h1 className="cursor-default overflow-hidden h-[10vh] lg:h-[15vh] xl:h-[20vh] w-full text-center font-oswald font-bold text-5xl md:text-8xl lg:text-7xl xl:text-9xl my-9">
              Subjects
            </h1>
          </div>

          <div className="px-10 pb-5 font-oswald">
            <div className="flex flex-wrap gap-1 lg:gap-10 min-h-[50vh] items-center justify-center">
              {subjects?.map((subject) => (
                <Link
                  key={subject._id}
                  className="overflow-hidden w-[50vw] h-[20vh] lg:w-[18vw] lg:h-[18vh] xl:w-[15vw] xl:h-[15vh] p-3"
                  to={`/teacher/${id}/courses/course/${courseId}/subjects/subject/${subject._id}/markAttendance`}
                >
                  <div className="h-full w-full font-semibold text-xl border-2 rounded-lg border-black bg-gray-100 flex justify-center items-center hover:scale-105 duration-150">
                    <p className="overflow-hidden text-center">
                      {subject.subName}
                    </p>
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

export default Subjects;
