import {
  buildCreateSlice,
  createAsyncThunk,
  createSlice,
} from "@reduxjs/toolkit";
import { BASE_URL } from "../constants/baseUrl";
import axios from "axios";

let init = {
  data: null,
  error: null,
  status: "idle", // idle || loading
};

export const fetchCourses = createAsyncThunk(
  "Courses/fetchCourses",
  async () => {
    let res = await axios.get(`${BASE_URL}/courses`);
    return res.data.data;
  }
);

let Courses = createSlice({
  name: "Courses",
  initialState: init,
  reducers: {},
  extraReducers: (builder) =>
    builder
      .addCase(fetchCourses.fulfilled, (state, action) => {
        state.data = action.payload;
        state.status = "idle";
      })
      .addCase(fetchCourses.rejected, (state, action) => {
        (state.error = action.error.message), (state.status = "idle");
      })
      .addCase(fetchCourses.pending, (state) => {
        state.status = "loading";
      }),
});

export default Courses.reducer;
