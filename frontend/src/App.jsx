import { Routes, Route, Navigate } from "react-router-dom";
import SignInPage from "./pages/SignInPage";
import DashboardLayout from "./module/dashboard/DashboardLayout";
import Courses from "./module/courses/Courses";
import Enrollments from "./module/enrollments/Enrollments";
import Grades from "./module/grades/Grades";
import Instructor from "./module/instructor/Instructor";
import Semester from "./module/semester/Semester";
import Student from "./module/students/Student";
import Subject from "./module/subjects/Subject";
import EnrollmentAdd from "./module/enrollments/EnrollmentAdd";
import PageNotFound from "./pages/NotFoundPage";

function App() {
  return (
    <Routes>
      <Route element={<DashboardLayout />}>
        <Route path="/" element={<Navigate to="/sign-in" />}></Route>
        <Route path="/manage-course" element={<Courses />}></Route>
        <Route path="/manage-enrollments" element={<Enrollments />}></Route>
        <Route
          path="/manage-enrollments/add-enrollments"
          element={<EnrollmentAdd />}
        ></Route>
        <Route path="/manage-grades" element={<Grades />}></Route>
        <Route path="/manage-instructors" element={<Instructor />}></Route>
        <Route path="/manage-semesters" element={<Semester />}></Route>
        <Route path="/manage-students" element={<Student />}></Route>
        <Route path="/manage-subjects" element={<Subject />}></Route>
      </Route>
      <Route path="/sign-in" element={<SignInPage />}></Route>
      <Route path="*" element={<PageNotFound />}></Route>
    </Routes>
  );
}

export default App;
