import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Api from "../../api/Api";
import Button from "../../components/button/Button";
import DashboardHeading from "../dashboard/DashboardHeding";
import StudentTable from "../students/StudentTable";
import { toast } from "react-toastify";

const Student = () => {
  const navigate = useNavigate();
  const [student, setStudent] = useState([]);
  useEffect(() => {
    document.title = "Student Management Page";
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
        const response = await Api.getStudent();
        setStudent(response);
      } catch (error) {
        console.log(error.message);
      }
    }
    fetchData();
  }, []);
  return (
    <div>
      <DashboardHeading
        title="Student"
        desc="Manage your student"
      ></DashboardHeading>
      <div className="flex justify-end mb-10">
        <Button kind="ghost" to="/manage/add-user">
          Add new student
        </Button>
      </div>
      <StudentTable data={student}></StudentTable>
    </div>
  );
};

export default Student;
