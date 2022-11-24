import React, { useState } from "react";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import * as Yup from "yup";
import { styled } from "@mui/material/styles";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useDispatch, useSelector } from "react-redux";
import { LoadingButton } from "@mui/lab";

import { FormProvider, RHFSelect } from "../../components/hook-form";
import { Stack } from "@mui/system";
import { BASE_S3_URL } from "../../app/constants";
import { getSubjects, selectAllSubjects } from "../../app/slices/subjectSlice";
import { useEffect } from "react";
import { getStudents, selectAllStudents } from "../../app/slices/studentSlice";
import { getCourses, selectAllCourses } from "../../app/slices/courseSlice";

const ButtonStyle = styled(Button)(({ theme }) => ({
  backgroundColor: theme.palette.grey[500_24],
  color: theme.palette.grey[600],
  "&:hover": {
    backgroundColor: theme.palette.grey[500],
    color: theme.palette.grey[200],
  },
}));

const LoadingButtonSuccessStyle = styled(LoadingButton)(({ theme }) => ({
  backgroundColor: theme.palette.success.dark,
  "&:hover": {
    backgroundColor: theme.palette.success.main,
  },
  color: "#fff",
}));

const EnrollmentFormDialog = (props) => {
  const {
    enrollment,
    enrollmentAction,
    dialogTitle,
    dialogContent,
    open,
    handleClose,
  } = props;

  const dispatch = useDispatch();
  const EnrollmentSchema = Yup.object().shape({
    studentId: Yup.number().required("Student is required"),
    courseId: Yup.number().required("Course is required"),
    id: Yup.string(),
  });

  const defaultValues = {
    studentId: "",
    courseId: "",
    id: "",
  };

  const students = useSelector(selectAllStudents);
  const courses = useSelector(selectAllCourses);

  if (enrollment) {
    defaultValues.studentId = enrollment.student.id;
    defaultValues.courseId = enrollment.course.id;
    defaultValues.id = enrollment.id;
  }

  console.log("Course", courses);
  console.log("Student", students);

  const methods = useForm({
    resolver: yupResolver(EnrollmentSchema),
    defaultValues,
  });

  const { handleSubmit } = methods;

  useEffect(() => {
    dispatch(getStudents());
    dispatch(getCourses());
  }, [dispatch]);

  const onSubmit = async (data) => {
    console.log("data", data);
    dispatch(enrollmentAction(data));
    handleClose();
  };

  return (
    <Dialog open={open} onClose={handleClose} fullWidth={true}>
      <DialogTitle>{dialogTitle}</DialogTitle>
      <DialogContent>{dialogContent}</DialogContent>
      <Box sx={{ padding: 2 }}>
        <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
          <Stack spacing={2}>
            <RHFSelect
              name="studentId"
              label="Student *"
              id="studentId"
              data={students}
            />
            <RHFSelect
              name="courseId"
              label="Course *"
              id="courseId"
              data={courses}
            />
          </Stack>
          <DialogActions>
            <ButtonStyle onClick={handleClose}>Cancel</ButtonStyle>
            <LoadingButtonSuccessStyle type="submit" variant="contained">
              Save
            </LoadingButtonSuccessStyle>
          </DialogActions>
        </FormProvider>
      </Box>
    </Dialog>
  );
};

export default EnrollmentFormDialog;
