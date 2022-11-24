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

import { FormProvider, RHFTextField } from "../../components/hook-form";
import { Stack } from "@mui/system";
import { BASE_S3_URL } from "../../app/constants";

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

const SubjectFormDialog = (props) => {
  const {
    subject,
    subjectAction,
    dialogTitle,
    dialogContent,
    open,
    handleClose,
  } = props;

  const dispatch = useDispatch();
  const SubjectSchema = Yup.object().shape({
    name: Yup.string().required("Subject is required"),
    numOfCredits: Yup.number().required("Number Of Credit is required"),
    id: Yup.string(),
  });

  const defaultValues = {
    name: "",
    numOfCredits: "",
    id: "",
  };

  if (subject) {
    defaultValues.name = subject.name;
    defaultValues.numOfCredits = subject.numOfCredits;
    defaultValues.id = subject.id;
  }

  const methods = useForm({
    resolver: yupResolver(SubjectSchema),
    defaultValues,
  });

  const { handleSubmit } = methods;

  const onSubmit = async (data) => {
    console.log("data", data);
    dispatch(subjectAction(data));
    handleClose();
  };

  return (
    <Dialog open={open} onClose={handleClose} fullWidth={true}>
      <DialogTitle>{dialogTitle}</DialogTitle>
      <DialogContent>{dialogContent}</DialogContent>
      <Box sx={{ padding: 2 }}>
        <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
          <Stack spacing={2}>
            <RHFTextField name="name" label="Subject *" fullWidth />
            <RHFTextField
              name="numOfCredits"
              label="Number Of Creadit *"
              fullWidth
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

export default SubjectFormDialog;
