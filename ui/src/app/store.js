import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import messageReducer from "./slices/messageSlice";
import studentReducer from "./slices/studentSlice";
import courseReducer from "./slices/courseSlice";
import enrollmentReducer from "./slices/enrollmentSlice";
import gradeReducer from "./slices/gradeSlice";
import instructorReducer from "./slices/instructorSlice";
import semesterReducer from "./slices/semesterSlice";
import subjectReducer from "./slices/subjectSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    message: messageReducer,
    students: studentReducer,
    courses: courseReducer,
    enrolments: enrollmentReducer,
    grades: gradeReducer,
    instructors: instructorReducer,
    semesters: semesterReducer,
    subjects: subjectReducer,
  },
});
