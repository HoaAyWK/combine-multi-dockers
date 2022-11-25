import React, { useState, useEffect } from "react";
import { styled } from "@mui/material/styles";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Alert, Link, Stack, IconButton, InputAdornment, Typography } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";

import { login } from "../../../app/slices/authSlice";
import Iconify from "../../../components/Iconify";
import {
  FormProvider,
  RHFTextField,
  RHFCheckbox,
} from "../../../components/hook-form";
import { clearMessage } from "../../../app/slices/messageSlice";
import { action_status } from "../../../app/constants";

const AlertStyle = styled(Alert)(({ theme }) => ({
  paddingBlock: theme.spacing(0),
  marginBlockStart: theme.spacing(1),
}));

const LoadingButtonSuccessStyle = styled(LoadingButton)(({ theme }) => ({
  backgroundColor: theme.palette.success.dark,
  "&:hover": {
    backgroundColor: theme.palette.success.main,
  },
  color: "#fff",
}));

const LoginForm = () => {
  const dispatch = useDispatch();
  const [hiddenAlert, setHiddenAlert] = useState(0);
  const [showPassword, setShowPassword] = useState(false);
  const { message } = useSelector((state) => state.message);
  const { loginStatus } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(clearMessage());
  }, [dispatch]);

  useEffect(() => {
    if (message) {
      setHiddenAlert(1);
    } else {
      setHiddenAlert(0);
    }
  }, [message]);

  const LoginSchema = Yup.object().shape({
    username: Yup.string()
      .email("Email must be a valid email address")
      .required("Email is required"),
    password: Yup.string().required("Password is required"),
  });

  const defaultValues = {
    username: "",
    password: "",
    remember: true,
  };

  const methods = useForm({
    resolver: yupResolver(LoginSchema),
    defaultValues,
  });

  const { handleSubmit } = methods;

  const onSubmit = async (data) => {
    console.log(data);
    dispatch(login(data));
  };

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={3}>
        <RHFTextField name="username" label="Email address" />

        <RHFTextField
          name="password"
          label="Password"
          type={showPassword ? "text" : "password"}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  onClick={() => setShowPassword(!showPassword)}
                  edge="end"
                >
                  <Iconify
                    icon={showPassword ? "eva:eye-fill" : "eva:eye-off-fill"}
                  />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </Stack>
      <AlertStyle
        variant="filled"
        severity="error"
        sx={{ opacity: `${hiddenAlert}` }}
        onClose={() => setHiddenAlert(0)}
      >
        {message}
      </AlertStyle>
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        sx={{ mb: 2 }}
      >
        <RHFCheckbox name="remember" label="Remember me" />
        <Link variant="subtitle2" underline="hover">
          Forgot password?
        </Link>
      </Stack>

      <LoadingButtonSuccessStyle
        fullWidth
        size="large"
        type="submit"
        variant="contained"
        loading={loginStatus === action_status.LOADING ? true : false}
      >
        Login
      </LoadingButtonSuccessStyle>
    </FormProvider>
  );
};

export default LoginForm;
