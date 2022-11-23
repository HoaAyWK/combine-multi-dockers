import React, { useEffect } from "react";
import DashboardHeading from "../dashboard/DashboardHeding";
import Button from "../../components/button/Button";
import CoursesTable from "./CoursesTable";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getCourse } from "./courseSlice";
import { action_status } from "../../constant/status";
import LoadingPage from "../../components/loading/LoadingPage";

const Courses = () => {
  const navigate = useNavigate();
  const { statusCourse, course } = useSelector((state) => state.course);
  const { current } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!current) {
      toast.dismiss();
      toast.warning("Please Log In");
      navigate("/sign-in");
    }
  }, [current]);

  useEffect(() => {
    try {
      if (statusCourse === action_status.IDLE) dispatch(getCourse());
    } catch (error) {
      console.log(error.message);
    }
  }, []);
  return (
    <div>
      <DashboardHeading
        title="Courses"
        desc="Manage your courses"
      ></DashboardHeading>
      {statusCourse === action_status.LOADING && <LoadingPage />}
      {statusCourse === action_status.SUCCEEDED && (
        <>
          {" "}
          <div className="flex justify-end mb-10">
            <Button kind="ghost" to="/manage/add-user">
              Add new courses
            </Button>
          </div>
          <CoursesTable data={course}></CoursesTable>
        </>
      )}
    </div>
  );
};

export default Courses;
