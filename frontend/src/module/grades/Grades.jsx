import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../../components/button/Button";
import DashboardHeading from "../dashboard/DashboardHeding";
import GradesTable from "./GradesTable";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { getGrade } from "./gradeSlice";
import { action_status } from "../../constant/status";
import LoadingPage from "../../components/loading/LoadingPage";

const Grades = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { status, grade } = useSelector((state) => state.grade);

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
    try {
      dispatch(getGrade());
    } catch (error) {
      console.log(error.message);
    }
  }, []);
  return (
    <div>
      <DashboardHeading
        title="Grades"
        desc="Manage your grades"
      ></DashboardHeading>
      {status === action_status.LOADING && <LoadingPage />}
      {status === action_status.SUCCEEDED && (
        <>
          {" "}
          <div className="flex justify-end mb-10">
            <Button kind="ghost" to="/manage/add-user">
              Add new grades
            </Button>
          </div>
        </>
      )}
      <GradesTable data={grade}></GradesTable>
    </div>
  );
};

export default Grades;
