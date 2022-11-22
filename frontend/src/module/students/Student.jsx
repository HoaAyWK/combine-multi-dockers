import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../../components/button/Button";
import DashboardHeading from "../dashboard/DashboardHeding";
import StudentTable from "../students/StudentTable";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { getStudent } from "./studentSlice";
import { action_status } from "../../constant/status";
import LoadingPage from "../../components/loading/LoadingPage";

const Student = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { status, student } = useSelector((state) => state.student);

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
    try {
      dispatch(getStudent());
    } catch (error) {
      console.log(error.message);
    }
  }, []);

  return (
    <div>
      <DashboardHeading
        title="Student"
        desc="Manage your student"
      ></DashboardHeading>
      {status === action_status.LOADING && <LoadingPage />}
      {status === action_status.SUCCEEDED && (
        <>
          {" "}
          <div className="flex justify-end mb-10">
            <Button kind="ghost" to="/manage/add-user">
              Add new student
            </Button>
          </div>
          <StudentTable data={student}></StudentTable>
        </>
      )}
    </div>
  );
};

export default Student;
