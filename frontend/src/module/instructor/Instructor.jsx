import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../../components/button/Button";
import DashboardHeading from "../dashboard/DashboardHeding";
import InstructorTable from "../instructor/InstructorTable";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { getInstructor } from "./instructorSlice";
import { action_status } from "../../constant/status";
import LoadingPage from "../../components/loading/LoadingPage";

const Instructor = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { status, instructor } = useSelector((state) => state.instructor);
  const { current } = useSelector((state) => state.auth);

  useEffect(() => {
    if (!current) {
      toast.dismiss();
      toast.warning("Please Log In");
      navigate("/sign-in");
    }
  }, [current]);

  useEffect(() => {
    try {
      dispatch(getInstructor());
    } catch (error) {
      console.log(error.message);
    }
  }, []);

  return (
    <div>
      <DashboardHeading
        title="Instructor"
        desc="Manage your instructor"
      ></DashboardHeading>
      {status === action_status.LOADING && <LoadingPage />}
      {status === action_status.SUCCEEDED && (
        <>
          {" "}
          <div className="flex justify-end mb-10">
            <Button kind="ghost" to="/manage/add-user">
              Add new instructor
            </Button>
          </div>
          <InstructorTable data={instructor}></InstructorTable>
        </>
      )}
    </div>
  );
};

export default Instructor;
