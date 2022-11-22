import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../../components/button/Button";
import DashboardHeading from "../dashboard/DashboardHeding";
import EnrollmentTable from "./EnrollmentTable";
import { toast } from "react-toastify";
import { useSelector, useDispatch } from "react-redux";
import { action_status } from "../../constant/status";
import { getEnrollment } from "./enrollmentSlice";
import LoadingPage from "../../components/loading/LoadingPage";

const Enrollments = () => {
  const navigate = useNavigate();
  const { enrollment, status } = useSelector((state) => state.enrollment);
  const dispatch = useDispatch();

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
      if (status === action_status.IDLE) {
        dispatch(getEnrollment());
      }
    } catch (error) {
      console.log(error.message);
    }
  }, []);

  console.log(enrollment);

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
