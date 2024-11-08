import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

import { BASE_URL } from "../constants/baseUrl";

let init = {
  attendance: {
    data: null,
    error: null,
    status: "idle",
  },
  studentDetails: {
    data: null,
    error: null,
    status: "idle",
  },
};

export const fetchAttendance = createAsyncThunk(
  "Student/fetchAttendance",
  async (studentId) => {
    let res = axios.get(`${BASE_URL}/student/getAttendance/${studentId}`);

    return res;
  }
);

export const fetchStudentDetails = createAsyncThunk(
  "Student/fetchStudentDetails",
  async (studentId) => {
    let res = await axios.get(
      `${BASE_URL}/student/${studentId}/details`
    );

    return res.data;
  }
);

let Student = createSlice({
  name: "Student",
  initialState: init,
  reducers: {},
  extraReducers: (builder) =>
    builder
      .addCase(fetchAttendance.fulfilled, (state, action) => {
        state.attendance.data = action.payload;
        state.attendance.status = "idle";
      })
      .addCase(fetchAttendance.rejected, (state, action) => {
        state.attendance.error = action.error.message;
        state.attendance.status = "idle";
      })
      .addCase(fetchAttendance.pending, (state) => {
        state.attendance.status = "loading";
      })
      .addCase(fetchStudentDetails.fulfilled, (state, action) => {
        (state.studentDetails.data = action.payload),
          (state.studentDetails.status = "idle");
      })
      .addCase(fetchStudentDetails.rejected, (state, action) => {
        state.studentDetails.error = action.error.message;
        state.studentDetails.status = "idle";
      })
      .addCase(fetchStudentDetails.pending, (state) => {
        state.studentDetails.status = "loading";
      }),
});

export default Student.reducer;
