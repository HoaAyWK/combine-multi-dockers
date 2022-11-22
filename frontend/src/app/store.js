import { configureStore } from "@reduxjs/toolkit";
import enrollmentReducer from "../module/enrollments/enrollmentSlice";
const rootReducer = {
  enrollment: enrollmentReducer,
};
const store = configureStore({
  reducer: rootReducer,
});
export default store;
