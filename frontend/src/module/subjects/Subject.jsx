import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../../components/button/Button";
import DashboardHeading from "../dashboard/DashboardHeding";
import SubjectTable from "./SubjectTable";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { getSubject } from "./subjectSlice";
import { action_status } from "../../constant/status";
import LoadingPage from "../../components/loading/LoadingPage";

const Subject = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { status, subject } = useSelector((state) => state.subject);
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
      dispatch(getSubject());
    } catch (error) {
      console.log(error.message);
    }
  }, []);

  return (
    <div>
      <DashboardHeading
        title="Subject"
        desc="Manage your subject"
      ></DashboardHeading>
      {status === action_status.LOADING && <LoadingPage />}
      {status === action_status.SUCCEEDED && (
        <>
          {" "}
          <div className="flex justify-end mb-10">
            <Button kind="ghost" to="/manage/add-user">
              Add new subject
            </Button>
          </div>
          <SubjectTable data={subject}></SubjectTable>
        </>
      )}
    </div>
  );
};

export default Subject;
