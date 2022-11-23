import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../../components/button/Button";
import DashboardHeading from "../dashboard/DashboardHeding";
import SemesterTable from "./SemesterTable";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { getSemester } from "./semesterSlice";
import { action_status } from "../../constant/status";
import LoadingPage from "../../components/loading/LoadingPage";

const Semester = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { status, semester } = useSelector((state) => state.semester);
  const { current } = useSelector((state) => state.current);

  useEffect(() => {
    if (!current) {
      toast.dismiss();
      toast.warning("Please Log In");
      navigate("/sign-in");
    }
  }, [current]);

  useEffect(() => {
    try {
      dispatch(getSemester());
    } catch (error) {
      console.log(error.message);
    }
  }, []);

  return (
    <div>
      <DashboardHeading
        title="Semester"
        desc="Manage your semester"
      ></DashboardHeading>
      {status === action_status.LOADING && <LoadingPage />}
      {status === action_status.SUCCEEDED && (
        <>
          {" "}
          <div className="flex justify-end mb-10">
            <Button kind="ghost" to="/manage/add-user">
              Add new semester
            </Button>
          </div>
          <SemesterTable data={semester}></SemesterTable>
        </>
      )}
    </div>
  );
};

export default Semester;
