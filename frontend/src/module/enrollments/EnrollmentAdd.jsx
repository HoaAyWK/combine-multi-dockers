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

const EnrollmentAdd = () => {
  const {
    handleSubmit,
    control,
    reset,
    formState: { isValid, isSubmitting },
    setValue,
    getValues,
  } = useForm();

  const { student } = useSelector((state) => state.student);
  const { status, course } = useSelector((state) => state.course);
  const dispatch = useDispatch();
  console.log("Student", student);
  console.log("Course", course);

  useEffect(() => {
    try {
      dispatch(getStudent());
      dispatch(getCourse());
    } catch (error) {
      console.log(error.message);
    }
  }, []);

  const handleCreate = () => {
    const studentId = getValues("StudentId");
    console.log(studentId);
  };
  return (
    <div>
      <DashboardHeading
        title="New Enrollment"
        desc="Add new enrollment"
      ></DashboardHeading>
      {status === action_status.LOADING && <LoadingPage />}
      {status === action_status.SUCCEEDED && (
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
