import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../../components/button/Button";
import DashboardHeading from "../dashboard/DashboardHeding";
import InstructorTable from "../instructor/InstructorTable";
import { toast } from "react-toastify";
import Api from "../../api/Api";

const Instructor = () => {
  const navigate = useNavigate();
  const [instructor, setInstructor] = useState([]);
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
        const response = await Api.getInstructor();
        setInstructor(response);
      } catch (error) {
        console.log(error.message);
      }
    }
    fetchData();
  }, []);
  return (
    <div>
      <DashboardHeading
        title="Instructor"
        desc="Manage your instructor"
      ></DashboardHeading>
      <div className="flex justify-end mb-10">
        <Button kind="ghost" to="/manage/add-user">
          Add new instructor
        </Button>
      </div>
      <InstructorTable data={instructor}></InstructorTable>
    </div>
  );
};

export default Instructor;
