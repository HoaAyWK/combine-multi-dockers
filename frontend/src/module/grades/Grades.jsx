import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../../components/button/Button";
import DashboardHeading from "../dashboard/DashboardHeding";
import GradesTable from "./GradesTable";
import { toast } from "react-toastify";
import Api from "../../api/Api";

const Grades = () => {
  const navigate = useNavigate();
  const [grades, setGrades] = useState([]);
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
        const response = await Api.getGrades();
        setGrades(response);
      } catch (error) {
        console.log(error.message);
      }
    }
    fetchData();
  }, []);
  return (
    <div>
      <DashboardHeading
        title="Grades"
        desc="Manage your grades"
      ></DashboardHeading>
      <div className="flex justify-end mb-10">
        <Button kind="ghost" to="/manage/add-user">
          Add new grades
        </Button>
      </div>
      <GradesTable data={grades}></GradesTable>
    </div>
  );
};

export default Grades;
