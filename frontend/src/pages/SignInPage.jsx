import React, { useEffect, useState } from "react";
import { useNavigate, NavLink } from "react-router-dom";
import AuthenticationPage from "./AuthenticationPage";
import { useForm } from "react-hook-form";
import Field from "../components/field/Field";
import Label from "../components/label/Label";
import Input from "../components/input/Input";
import Button from "../components/button/Button";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "react-toastify";
import IconEyeOpen from "../components/icon/IconEyeOpen";
import IconEyeClose from "../components/icon/IconEyeClose";
import InputPasswordToggle from "../components/input/InputPasswordToggle";
import Api from "../api/Api";

const schema = yup.object({
  username: yup
    .string()
    .required("Please enter your username")
    .email("Email must be valid")
    .min(3, "Username must be at least 3 characters or greater"),
  password: yup
    .string()
    .required("Please enter your password")
    .min(8, "Your password must be at least 8 characters or greater"),
});

const SignInPage = () => {
  const {
    handleSubmit,
    control,
    formState: { isValid, isSubmitting, errors },
    reset,
  } = useForm({
    mode: "onChange",
    resolver: yupResolver(schema),
  });

  const navigate = useNavigate();

  useEffect(() => {
    document.title = "SignIn Page";
  });

  const handleSignIn = async (values) => {
    if (!isValid) return;
    try {
      const response = await Api.login(values);
      localStorage.setItem("jwt", response.token);
      localStorage.setItem("user", response.username);
      toast.success("Sign In Successfully!!!", { pauseOnHover: false });
      navigate("/manage-enrollments");
      reset({
        username: "",
        password: "",
      });
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <AuthenticationPage>
      <form
        className="form"
        onSubmit={handleSubmit(handleSignIn)}
        autoComplete="off"
      >
        <Field>
          <Label htmlFor="username">Email</Label>
          <Input
            type="text"
            name="username"
            placeholder="Enter your email"
            control={control}
          ></Input>
          {errors.username && (
            <p className="text-red-500 text-lg font-medium">
              {errors.username?.message}
            </p>
          )}
        </Field>

        <Field>
          <Label htmlFor="password">Password</Label>
          <InputPasswordToggle
            control={control}
            name="password"
          ></InputPasswordToggle>
          {errors.password && (
            <p className="text-red-500 text-lg font-medium">
              {errors.password?.message}
            </p>
          )}
        </Field>

        <Button
          type="submit"
          isLoading={isSubmitting}
          disable={isSubmitting}
          style={{
            width: "100%",
            maxWidth: 300,
            margin: "0 auto",
            fontSize: "20px",
          }}
        >
          Sign In
        </Button>
      </form>
    </AuthenticationPage>
  );
};

export default SignInPage;
