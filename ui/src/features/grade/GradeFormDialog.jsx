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

import {
  FormProvider,
  RHFSelect,
  RHFTextField,
} from "../../components/hook-form";
import { Stack } from "@mui/system";
import { BASE_S3_URL } from "../../app/constants";
import { selectAllStudents } from "../../app/slices/studentSlice";
import { selectAllCourses } from "../../app/slices/courseSlice";

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

const GradeFormDialog = (props) => {
  const { grade, gradeAction, dialogTitle, dialogContent, open, handleClose } =
    props;

  const dispatch = useDispatch();
  const GradeSchema = Yup.object().shape({
    studentId: Yup.number().required("Student is required"),
    courseId: Yup.number().required("Course is required"),
    score: Yup.number().required("Score is required"),
    id: Yup.string(),
  });

  const defaultValues = {
    studentId: "",
    courseId: "",
    score: "",
    id: "",
  };

  const students = useSelector(selectAllStudents);
  const courses = useSelector(selectAllCourses);

  const methods = useForm({
    resolver: yupResolver(GradeSchema),
    defaultValues,
  });

  const { handleSubmit } = methods;

  const onSubmit = async (data) => {
    console.log("data", data);
    dispatch(gradeAction(data));
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
            <RHFTextField name="score" label="Score *" fullWidth />
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

export default GradeFormDialog;
