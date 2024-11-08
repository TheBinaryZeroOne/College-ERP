import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {  BASE_URL } from "../constants/baseUrl"
import axios from "axios";

let init = {
  teacherDetails: {
    data: null,
    error: null,
    status: "idle",
  },
};

export const fetchTeacherDetails = createAsyncThunk(
  "teacher/fetchTeacherDetails",
  async (teacherId) => {
    let res = await axios.get(
      `${BASE_URL}/teacher/${teacherId}/details`
    );

    return res.data;
  }
);

let Teacher = createSlice({
  name: "teacher",
  initialState: init,
  reducers: {},
  extraReducers: (builder) =>
    builder
      .addCase(fetchTeacherDetails.fulfilled, (state, action) => {
        (state.teacherDetails.data = action.payload),
          (state.teacherDetails.status = "idle");
      })
      .addCase(fetchTeacherDetails.rejected, (state, action) => {
        (state.teacherDetails.error = action.error.message),
          (state.teacherDetails.status = "idle");
      })
      .addCase(fetchTeacherDetails.pending, (state) => {
        state.teacherDetails.status = "loading";
      }),
});

export default Teacher.reducer;
