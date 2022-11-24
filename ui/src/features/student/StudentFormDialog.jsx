import React, { useState } from "react";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
} from "@mui/material";
import * as Yup from "yup";
import { styled } from "@mui/material/styles";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useDispatch, useSelector } from "react-redux";
import { LoadingButton } from "@mui/lab";

import {
  RHFTextField,
  FormProvider,
  RHFRadioGroup,
} from "../../components/hook-form";
import { Stack } from "@mui/system";
import AvatarUploader from "../../components/AvatarUploader";
import { action_status, BASE_S3_URL } from "../../app/constants";
import RHFDate from "../../components/hook-form/RHFDate";
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

const genders = ["Male", "Female"];

const StudentFormDialog = (props) => {
  const {
    student,
    studentAction,
    dialogTitle,
    dialogContent,
    open,
    handleClose,
  } = props;

  const { updateStatus } = useSelector((state) => state.students);

  const dispatch = useDispatch();

  const StudentSchema = Yup.object().shape({
    firstName: Yup.string().required("First name is required"),
    lastName: Yup.string().required("Last name is required"),
    email: Yup.string().required("Email is required"),
    dateOfBirth: Yup.string().required("Date of birth is required"),
    gender: Yup.string().required(),
    avatar: Yup.mixed(),
    id: Yup.string(),
  });

  const defaultValues = {
    firstName: "",
    lastName: "",
    email: "",
    gender: "Male",
    dateOfBirth: "",
    avatar: null,
    id: "",
  };

  if (student) {
    defaultValues.firstName = student.firstName;
    defaultValues.lastName = student.lastName;
    defaultValues.id = student.id;
    defaultValues.email = student.email;
    defaultValues.gender = student.gender;
    defaultValues.dateOfBirth = student.dateOfBirth;
  }

  useEffect(() => {
    if (updateStatus === action_status.SUCCEEDED) {
      handleClose();
    }
  }, [updateStatus]);

  const methods = useForm({
    resolver: yupResolver(StudentSchema),
    defaultValues,
  });

  const { handleSubmit } = methods;

  const onSubmit = async (data) => {
    dispatch(studentAction(data));
  };

  return (
    <Dialog open={open} onClose={handleClose} fullWidth={true}>
      <DialogTitle>{dialogTitle}</DialogTitle>
      <DialogContent>{dialogContent}</DialogContent>
      <Box sx={{ padding: 2 }}>
        <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
          <Stack spacing={2}>
            <Grid container spacing={1}>
              <Grid item xs={12} md={6}>
                <RHFTextField name="firstName" label="First Name *" fullWidth />
              </Grid>
              <Grid item xs={12} md={6}> 
                <RHFTextField name="lastName" label="Last Name *" fullWidth />
              </Grid>
            </Grid>
            <RHFTextField name="email" label="Email *" fullWidth />
            <RHFDate name="dateOfBirth" label="Date Of Birth *" fullWidth />
            <RHFRadioGroup
              name="gender"
              id="radios-gender"
              label="Gender"
              items={genders}
              row
            />
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                marginBlock: 2,
              }}
            >
              <AvatarUploader
                name="avatar"
                imageUrl={
                  student?.avatar ? `${BASE_S3_URL}${student?.avatar}` : null
                }
              />
            </Box>
          </Stack>
          <DialogActions>
            <ButtonStyle onClick={handleClose}>Cancel</ButtonStyle>
            <LoadingButtonSuccessStyle
              type="submit"
              variant="contained"
              loading={updateStatus === action_status.LOADING ? true : false}
            >
              Save
            </LoadingButtonSuccessStyle>
          </DialogActions>
        </FormProvider>
      </Box>
    </Dialog>
  );
};

export default StudentFormDialog;
