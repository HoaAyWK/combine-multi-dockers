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
import { useDispatch } from "react-redux";
import { LoadingButton } from "@mui/lab";

import {
  RHFTextField,
  FormProvider,
  RHFRadioGroup,
} from "../../components/hook-form";
import { Stack } from "@mui/system";
import AvatarUploader from "../../components/AvatarUploader";
import { BASE_S3_URL } from "../../app/constants";
import RHFDate from "../../components/hook-form/RHFDate";

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

const status = ["Active", "UnActive"];

const InstructorFormDialog = (props) => {
  const {
    instructor,
    instructorAction,
    dialogTitle,
    dialogContent,
    open,
    handleClose,
  } = props;

  const dispatch = useDispatch();
  const InstructorSchema = Yup.object().shape({
    firstName: Yup.string().required("First name is required"),
    lastName: Yup.string().required("Last name is required"),
    email: Yup.string().required("Email is required"),
    phone: Yup.string().required("Phone is required"),
    dateOfBirth: Yup.string().required("Date of birth is required"),
    dateJoin: Yup.string().required("Date join is required"),
    status: Yup.string().required("Status is required"),
    avatar: Yup.mixed(),
    id: Yup.string(),
  });

  const defaultValues = {
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    dateOfBirth: "",
    dateJoin: "",
    status: "active",
    id: "",
  };

  if (instructor) {
    defaultValues.firstName = instructor.firstName;
    defaultValues.lastName = instructor.lastName;
    defaultValues.email = instructor.email;
    defaultValues.phone = instructor.phone;
    defaultValues.dateOfBirth = instructor.dateOfBirth;
    defaultValues.dateJoin = instructor.dateJoin;
    defaultValues.status = instructor.status;
    defaultValues.id = instructor.id;
  }

  const methods = useForm({
    resolver: yupResolver(InstructorSchema),
    defaultValues,
  });

  const { handleSubmit } = methods;

  const onSubmit = async (data) => {
    console.log(data);
    dispatch(instructorAction(data));
    handleClose();
  };

  return (
    <Dialog open={open} onClose={handleClose} fullWidth={true}>
      <DialogTitle>{dialogTitle}</DialogTitle>
      <DialogContent>{dialogContent}</DialogContent>
      <Box sx={{ padding: 2 }}>
        <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
          <Stack spacing={2}>
            <RHFTextField name="firstName" label="First Name *" fullWidth />
            <RHFTextField name="lastName" label="Last Name *" fullWidth />
            <RHFTextField name="email" label="Email *" fullWidth />
            <RHFTextField name="phone" label="Phone *" fullWidth />
            <RHFDate name="dateOfBirth" label="Date Of Birth *" fullWidth />
            <RHFDate name="dateJoin" label=" Date Join" fullWidth />

            <RHFRadioGroup
              name="status"
              id="radios-status"
              label="Status"
              items={status}
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
                  instructor?.avatar
                    ? `${BASE_S3_URL}${instructor?.avatar}`
                    : null
                }
              />
            </Box>
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

export default InstructorFormDialog;
