import React from "react";
import { Navigate, useRoutes } from "react-router-dom";

import DashboardLayout from "./layouts/dashboard";
import LogoOnlyLayout from "./layouts/LogoOnlyLayout";
import DashboardApp from "./pages/DashboardApp";
import Login from "./pages/Login";
import Register from "./pages/Register";
import NotFound from "./pages/Page404";
import Student from "./pages/Student";
import Instructor from "./pages/Instructor";
import Course from "./pages/course";
import Subject from "./pages/subject";
import Enrollment from "./pages/enrollment";
import Grade from "./pages/grade";
import { element } from "prop-types";
import Semester from "./pages/semester";

const Router = () => {
  return useRoutes([
    {
      path: "/dashboard",
      element: <DashboardLayout />,
      children: [
        { path: "app", element: <DashboardApp /> },
        { path: "students", element: <Student /> },
        { path: "instructors", element: <Instructor /> },
        { path: "courses", element: <Course /> },
        { path: "subjects", element: <Subject /> },
        { path: "enrollments", element: <Enrollment /> },
        { path: "grades", element: <Grade /> },
        { path: "semesters", element: <Semester /> },
      ],
    },
    {
      path: "login",
      element: <Login />,
    },
    {
      path: "register",
      element: <Register />,
    },
    {
      path: "/",
      element: <LogoOnlyLayout />,
      children: [
        { path: "/", element: <Navigate to="/dashboard/app" /> },
        { path: "404", element: <NotFound /> },
        { path: "*", element: <Navigate to="/404" /> },
      ],
    },
    {
      path: "*",
      element: <Navigate to="/404" replace />,
    },
  ]);
};

export default Router;
