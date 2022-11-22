import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../../components/button/Button";
import DashboardHeading from "../dashboard/DashboardHeding";
import SemesterTable from "./SemesterTable";
import { toast } from "react-toastify";
import Api from "../../api/Api";

const Semester = () => {
  const navigate = useNavigate();
  const [semester, setSemester] = useState([]);
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
        const response = await Api.getSemester();
        setSemester(response);
      } catch (error) {
        console.log(error.message);
      }
    }
    fetchData();
  }, []);

  return (
    <div>
      <DashboardHeading
        title="Semester"
        desc="Manage your semester"
      ></DashboardHeading>
      <div className="flex justify-end mb-10">
        <Button kind="ghost" to="/manage/add-user">
          Add new semester
        </Button>
      </div>
      <SemesterTable data={semester}></SemesterTable>
    </div>
  );
};

export default Semester;
