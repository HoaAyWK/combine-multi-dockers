import React, { useEffect, useState } from "react";
import DashboardHeading from "../dashboard/DashboardHeding";
import Button from "../../components/button/Button";
import CoursesTable from "./CoursesTable";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import Api from "../../api/Api";
const Courses = () => {
  const navigate = useNavigate();
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    if (
      localStorage.getItem("jwt") === null &&
      localStorage.getItem("user") === null
    ) {
      toast.warning("Please log in", { pauseOnHover: false });
      navigate("/sign-in");
    }
  }, []);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await Api.getCourses();
        setCourses(response);
      } catch (error) {
        console.log(error.message);
      }
    }
    fetchData();
  }, []);
  return (
    <div>
      <DashboardHeading
        title="Courses"
        desc="Manage your courses"
      ></DashboardHeading>
      <div className="flex justify-end mb-10">
        <Button kind="ghost" to="/manage/add-user">
          Add new courses
        </Button>
      </div>
      <CoursesTable data={courses}></CoursesTable>
    </div>
  );
};

export default Courses;
