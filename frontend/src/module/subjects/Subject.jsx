import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../../components/button/Button";
import DashboardHeading from "../dashboard/DashboardHeding";
import SubjectTable from "./SubjectTable";
import Api from "../../api/Api";
import { toast } from "react-toastify";

const Subject = () => {
  const navigate = useNavigate();
  const [subject, setSubject] = useState([]);
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
        const response = await Api.getSubject();
        setSubject(response);
      } catch (error) {
        console.log(error.message);
      }
    }
    fetchData();
  }, []);

  return (
    <div>
      <DashboardHeading
        title="Subject"
        desc="Manage your subject"
      ></DashboardHeading>
      <div className="flex justify-end mb-10">
        <Button kind="ghost" to="/manage/add-user">
          Add new subject
        </Button>
      </div>
      <SubjectTable data={subject}></SubjectTable>
    </div>
  );
};

export default Subject;
