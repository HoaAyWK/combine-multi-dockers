import React from "react";
import { useForm } from "react-hook-form";
import Field from "../../components/field/Field";
import Input from "../../components/input/Input";
import Label from "../../components/label/Label";
import DashboardHeading from "../dashboard/DashboardHeding";
import DropdownSelect from "../../components/dropdown/DropdownSelect";
import { useDispatch, useSelector } from "react-redux";
import Button from "../../components/button/Button";

const EnrollmentAdd = () => {
  const {
    handleSubmit,
    control,
    reset,
    formState: { isValid, isSubmitting },
    setValue,
    getValues,
  } = useForm();

  const handleCreate = (values) => {};
  return (
    <div>
      <DashboardHeading
        title="New Enrollment"
        desc="Add new enrollment"
      ></DashboardHeading>
      <form className="w-[700px] mx-auto" onSubmit={handleSubmit(handleCreate)}>
        <Field>
          <Label htmlFor="id">Id</Label>
          <Input name="id" control={control} type="text"></Input>
        </Field>
        <Field>
          <Label htmlFor="StudentId">Student</Label>
          <DropdownSelect
            control={control}
            name="StudentId"
            dropdownLabel="Chọn"
            setValue={setValue}
          ></DropdownSelect>
        </Field>
        <Field>
          <Label htmlFor="CourseId">Course</Label>
          <DropdownSelect
            control={control}
            name="CourseId"
            dropdownLabel="Chọn"
            setValue={setValue}
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
    </div>
  );
};

export default EnrollmentAdd;
