import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../../components/button/Button";
import DashboardHeading from "../dashboard/DashboardHeding";
import EnrollmentTable from "./EnrollmentTable";
import { toast } from "react-toastify";
import { useSelector, useDispatch } from "react-redux";
import { action_status } from "../../constant/status";
import { getEnrollment, refresh } from "./enrollmentSlice";
import LoadingPage from "../../components/loading/LoadingPage";

const Enrollments = () => {
  const navigate = useNavigate();
  const {
    enrollment,
    status,
    addEnrollment,
    updateEnrollment,
    deleteEnrollment,
  } = useSelector((state) => state.enrollment);
  const dispatch = useDispatch();

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
      if (status === action_status.IDLE) {
        dispatch(getEnrollment());
      }
      if (addEnrollment) {
        dispatch(getEnrollment());
        dispatch(refresh());
      }
      if (updateEnrollment) {
        dispatch(getEnrollment());
        dispatch(refresh());
      }
      if (deleteEnrollment) {
        dispatch(getEnrollment());
        dispatch(refresh());
      }
    } catch (error) {
      console.log(error.message);
    }
  }, [addEnrollment, updateEnrollment, deleteEnrollment]);

  return (
    <div>
      <DashboardHeading
        title="Enrollment"
        desc="Manage your enrollment"
      ></DashboardHeading>
      {status === action_status.LOADING && <LoadingPage />}
      {status === action_status.SUCCEEDED && (
        <>
          {" "}
          <div className="flex justify-end mb-10">
            <Button kind="ghost" to="/manage-enrollments/add-enrollments">
              Add new enrollment
            </Button>
          </div>
          <EnrollmentTable data={enrollment}></EnrollmentTable>
        </>
      )}
    </div>
  );
};

export default Enrollments;
