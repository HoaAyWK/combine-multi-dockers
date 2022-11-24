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

import { RHFTextField, FormProvider } from "../../components/hook-form";
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

const SemesterFormDialog = (props) => {
  const {
    semester,
    semesterAction,
    dialogTitle,
    dialogContent,
    open,
    handleClose,
  } = props;

  const dispatch = useDispatch();
  const SemesterSchema = Yup.object().shape({
    name: Yup.string().required("Semester is required"),
    id: Yup.string(),
  });

  const defaultValues = {
    name: "",
    id: "",
  };

  if (semester) {
    defaultValues.name = semester.name;
    defaultValues.id = semester.id;
  }

  const methods = useForm({
    resolver: yupResolver(SemesterSchema),
    defaultValues,
  });

  const { handleSubmit } = methods;

  const onSubmit = async (data) => {
    console.log(data);
    dispatch(semesterAction(data));
    handleClose();
  };

  return (
    <Dialog open={open} onClose={handleClose} fullWidth={true}>
      <DialogTitle>{dialogTitle}</DialogTitle>
      <DialogContent>{dialogContent}</DialogContent>
      <Box sx={{ padding: 2 }}>
        <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
          <Stack spacing={2}>
            <RHFTextField name="name" label="Semester *" fullWidth />
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

export default SemesterFormDialog;
