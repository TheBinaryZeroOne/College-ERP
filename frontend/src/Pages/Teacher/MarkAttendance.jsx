import React, { useState, useEffect } from "react";
import TeacherNav from "./TeacherNav";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { BASE_URL } from "../../constants/baseUrl";
import { toast } from "react-toastify";
import Cookies from "js-cookie";
import Modal from "../Common/Modal";

const MarkAttendance = () => {
  let { id, courseId, subId } = useParams();

  const [isModalVisible, setModalVisible] = useState(false);

  const token = Cookies.get("token");

  const [students, setStudents] = useState([]);
  const [attendedStudents, setAttendedStudents] = useState([]);

  let navigate = useNavigate();

  let fetchStudents = async () => {
    try {
      let res = await axios.get(`${BASE_URL}/courses/${courseId}/students`);

      let sortedStudents = res.data.students.sort(
        (a, b) => a.student_id - b.student_id
      );
      setStudents(sortedStudents);
    } catch (err) {
      console.log("Something went wrong", err);
    }
  };

  const handleCheck = (studentId) => {
    setAttendedStudents((prev) => {
      const exists = prev.find((student) => student.studentId === studentId);
      if (exists) {
        return prev.filter((student) => student.studentId !== studentId);
      } else {
        return [...prev, { studentId }];
      }
    });
  };

  const addAttendance = async () => {
    if (attendedStudents.length === 0) {
      setModalVisible(false);
      return toast.error("No Students Selected");
    }

    const formattedDate = new Date().toISOString().split("T")[0];

    try {
      let response = await axios.post(
        `${BASE_URL}/courses/course/attendance`,
        {
          courseId: courseId,
          subjectId: subId,
          date: formattedDate,
          attendanceRecords: attendedStudents,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        }
      );

      if (response.data.success) {
        toast.success("Attendance marked successfully");
        setAttendedStudents([]);
        navigate(`/teacher/${id}/courses`);
      } else {
        toast.error(response.data.msg);
      }
    } catch (err) {
      console.log("Something went wrong", err);
      toast.error("Failed to mark attendance");
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  return (
    <>
      <div className="flex w-full">
        <div className="fixed">
          <TeacherNav />
        </div>

        <div className="min-h-[100vh] w-full lg:ps-[24%] xl:ps-[22%] 2xl:ps-[15%]">
          <div className="w-full cursor-default">
            <h1 className="cursor-default overflow-hidden h-[10vh] lg:h-[15vh] xl:h-[20vh] w-full text-center font-oswald font-bold text-5xl md:text-8xl lg:text-7xl xl:text-9xl my-9">
              Attendance
            </h1>
          </div>

          <div className="flex flex-col w-full min-h-[30vh] gap-2">
            {students.map((student) => {
              return (
                <div
                  key={student._id}
                  className="px-5 2xl:px-10 py-3 bg-gray-100 flex flex-col lg:flex-row items-center lg:justify-between mx-10 xl:me-10 rounded-md"
                >
                  <div>
                    <p className="font-medium">
                      {student.first_name} {student.last_name}{" "}
                      {`(${student.student_id})`}
                    </p>
                  </div>
                  <div>
                    <input
                      type="checkbox"
                      onChange={() => handleCheck(student._id)}
                    />
                  </div>
                </div>
              );
            })}
          </div>
          <div className="my-10 pe-20">
            <button
              onClick={() => setModalVisible(true)}
              className="bg-blue-500 hover:bg-blue-400 text-lg w-full mx-10 xl:me-10 text-white text-center font-bold font-oswald py-3 rounded-md"
            >
              Add Attendance
            </button>
          </div>
        </div>
      </div>
      <Modal
        isVisible={isModalVisible}
        onClose={() => setModalVisible(false)}
        onYes={addAttendance}
        onNo={() => setModalVisible(false)}
        title="Confirm Attendance"
        desc={"Are you sure you want to mark attendace of these students?"}
        note={
          "Note:- Once Attendance is marked it will not be changed in future"
        }
      />
    </>
  );
};

export default MarkAttendance;
