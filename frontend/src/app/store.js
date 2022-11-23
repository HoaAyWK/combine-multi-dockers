import { configureStore } from "@reduxjs/toolkit";
import enrollmentReducer from "../module/enrollments/enrollmentSlice";
import authReducer from "../module/authSlice";
import courseReducer from "../module/courses/courseSlice";
import gradeReducer from "../module/grades/gradeSlice";
import instructorReducer from "../module/instructor/instructorSlice";
import semesterReducer from "../module/semester/semesterSlice";
import studentReducer from "../module/students/studentSlice";
import subjectReducer from "../module/subjects/subjectSlice";

const rootReducer = {
  enrollment: enrollmentReducer,
  auth: authReducer,
  course: courseReducer,
  grade: gradeReducer,
  instructor: instructorReducer,
  semester: semesterReducer,
  student: studentReducer,
  subject: subjectReducer,
};
const store = configureStore({
  reducer: rootReducer,
});
export default store;
