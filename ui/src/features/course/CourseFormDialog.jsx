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
import {
  getSemesters,
  selectAllSemesters,
} from "../../app/slices/semesterSlice";
import { useEffect } from "react";

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

const CourseFormDialog = (props) => {
  const {
    course,
    courseAction,
    dialogTitle,
    dialogContent,
    open,
    handleClose,
  } = props;

  const dispatch = useDispatch();
  const CourseSchema = Yup.object().shape({
    subjectId: Yup.number().required("Subject is required"),
    semesterId: Yup.number().required("Semester is required"),
    id: Yup.string(),
  });

  const defaultValues = {
    subjectId: "",
    semesterId: "",
    id: "",
  };

  const subjects = useSelector(selectAllSubjects);
  const semesters = useSelector(selectAllSemesters);

  if (course) {
    defaultValues.subjectId = course.subject.id;
    defaultValues.semesterId = course.semester.id;
    defaultValues.id = course.id;
  }

  console.log("Course", course);
  console.log("Subject", subjects);
  console.log("Semester", semesters);

  const methods = useForm({
    resolver: yupResolver(CourseSchema),
    defaultValues,
  });

  const { handleSubmit } = methods;

  useEffect(() => {
    dispatch(getSubjects());
    dispatch(getSemesters());
  }, [dispatch]);

  const onSubmit = async (data) => {
    console.log("data", data);
    dispatch(courseAction(data));
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
              name="subjectId"
              label="Subject *"
              id="subjectId"
              data={subjects}
            />
            <RHFSelect
              name="semesterId"
              label="Semester *"
              id="semesterId"
              data={semesters}
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

export default CourseFormDialog;
