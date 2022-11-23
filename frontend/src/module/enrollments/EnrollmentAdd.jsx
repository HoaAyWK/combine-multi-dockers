import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import Field from "../../components/field/Field";
import Label from "../../components/label/Label";
import DashboardHeading from "../dashboard/DashboardHeding";
import DropdownSelect from "../../components/dropdown/DropdownSelect";
import { useDispatch, useSelector } from "react-redux";
import Button from "../../components/button/Button";
import { getStudent } from "../students/studentSlice";
import { getCourse } from "../courses/courseSlice";
import { action_status } from "../../constant/status";
import LoadingPage from "../../components/loading/LoadingPage";
import { createEnrollment } from "./enrollmentSlice";
import { toast } from "react-toastify";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Navigate, useNavigate } from "react-router-dom";

const schema = yup.object({
  StudentId: yup.string().required("Please select student"),
  CourseId: yup.string().required("Please select course"),
});
const EnrollmentAdd = () => {
  const {
    handleSubmit,
    control,
    reset,
    formState: { isValid, isSubmitting, errors },
    setValue,
    getValues,
  } = useForm({ mode: "onChange", resolver: yupResolver(schema) });

  const { statusStudent, student } = useSelector((state) => state.student);
  const { statusCourse, course } = useSelector((state) => state.course);
  const { current } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (!current) {
      toast.dismiss();
      toast.warning("Please Log In");
      navigate("/sign-in");
    }
  }, [current]);

  useEffect(() => {
    try {
      if (
        statusStudent === action_status.IDLE &&
        statusCourse === action_status.IDLE
      ) {
        dispatch(getStudent());
        dispatch(getCourse());
      }
    } catch (error) {
      console.log(error.message);
    }
  }, []);

  const handleCreate = () => {
    const studentId = getValues("StudentId");
    const courseId = getValues("CourseId");
    const data = {
      studentId: Number(studentId),
      courseId: Number(courseId),
    };
    console.log(data);
    try {
      dispatch(createEnrollment(data));
      toast.dismiss();
      toast.success("Add Enrollment Success!!!", { pauseOnHover: false });
      reset({
        StudentId: setValue("StudentId", ""),
        CourseId: setValue("CourseId", ""),
      });
      navigate("/manage-enrollments");
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div>
      <DashboardHeading
        title="New Enrollment"
        desc="Add new enrollment"
      ></DashboardHeading>
      {statusStudent === action_status.LOADING &&
        statusCourse === action_status.LOADING && <LoadingPage />}
      {statusStudent === action_status.SUCCEEDED &&
        statusCourse === action_status.SUCCEEDED && (
          <>
            {" "}
            <form
              className="w-[700px] mx-auto"
              onSubmit={handleSubmit(handleCreate)}
            >
              <Field>
                <Label htmlFor="StudentId">Student</Label>
                <DropdownSelect
                  control={control}
                  name="StudentId"
                  dropdownLabel="Chọn"
                  setValue={setValue}
                  data={student}
                ></DropdownSelect>
                {errors.StudentId && (
                  <p className="text-red-500 text-lg font-medium">
                    {errors.StudentId?.message}
                  </p>
                )}
              </Field>
              <Field>
                <Label htmlFor="CourseId">Course</Label>
                <DropdownSelect
                  control={control}
                  name="CourseId"
                  dropdownLabel="Chọn"
                  setValue={setValue}
                  data={course}
                ></DropdownSelect>
                {errors.CourseId && (
                  <p className="text-red-500 text-lg font-medium">
                    {errors.CourseId?.message}
                  </p>
                )}
              </Field>
              <Button
                type="submit"
                className="mx-auto w-[300px] text-2xl"
                isLoading={isSubmitting}
                disable={isSubmitting}
              >
                Create
              </Button>
            </form>
          </>
        )}
    </div>
  );
};

export default EnrollmentAdd;
