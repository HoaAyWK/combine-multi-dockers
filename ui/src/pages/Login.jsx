import React, { useEffect } from "react";
import { Link as RouterLink } from "react-router-dom";
import { styled } from "@mui/material/styles";
import { Card, Link, Container, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Navigate } from "react-router-dom";

import useResponsive from "../hooks/useResponsive";
import Page from "../components/Page";
import Logo from "../components/Logo";
import { LoginForm } from "../features/auth/login";
import { action_status, MESSAGE_ERRORS, ROLES } from "../app/constants";
import { getCurrentUser, refresh, logout } from "../app/slices/authSlice";
import useLocalStorage from "../hooks/useLocalStorage";
import { setMessage } from "../app/slices/messageSlice";

const RootStyle = styled("div")(({ theme }) => ({
  [theme.breakpoints.up("md")]: {
    display: "flex",
  },
}));

const HeaderStyle = styled("header")(({ theme }) => ({
  top: 0,
  zIndex: 9,
  lineHeight: 0,
  width: "100%",
  display: "flex",
  alignItems: "center",
  position: "absolute",
  padding: theme.spacing(3),
  justifyContent: "space-between",
  [theme.breakpoints.up("md")]: {
    alignItems: "flex-start",
    padding: theme.spacing(7, 5, 0, 7),
  },
}));

const SectionStyle = styled(Card)(({ theme }) => ({
  width: "100%",
  maxWidth: 464,
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  margin: theme.spacing(2, 0, 2, 2),
}));

const ContentStyle = styled("div")(({ theme }) => ({
  maxWidth: 480,
  margin: "auto",
  minHeight: "100vh",
  display: "flex",
  justifyContent: "center",
  flexDirection: "column",
  padding: theme.spacing(12, 0),
}));

const Login = () => {
  const navigate = useNavigate();

  const [user] = useLocalStorage("user", null);

  const smUp = useResponsive("up", "sm");

  const mdUp = useResponsive("up", "md");

  const dispatch = useDispatch();

  const { loginStatus } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(logout());
  }, [dispatch]);

  useEffect(() => {
    if (user) {
      navigate("/dashboard/app");
    }
  }, [user, dispatch, navigate]);

  useEffect(() => {
    if (loginStatus === action_status.SUCCEEDED) {
      navigate("/dashboard/app");
    }
  }, [loginStatus, navigate]);

  return (
    <Page title="Login">
      <RootStyle>
        <HeaderStyle>
          <Logo />

          {smUp && (
            <Typography variant="body2" sx={{ mt: { md: -2 } }}>
              Don’t have an account? {""}
              <Link variant="subtitle2" component={RouterLink} to="/register">
                Get started
              </Link>
            </Typography>
          )}
        </HeaderStyle>

        {mdUp && (
          <SectionStyle>
            <Typography variant="h3" sx={{ px: 5, mt: 10, mb: 5 }}>
              Hi, Welcome Back
            </Typography>
            <img
              src="/static/illustrations/illustration_login.png"
              alt="login"
            />
          </SectionStyle>
        )}

        <Container maxWidth="sm">
          <ContentStyle>
            <Typography variant="h4" gutterBottom>
              Sign in to SM
            </Typography>

            <Typography sx={{ color: "text.secondary", mb: 2 }}>
              Enter your details below.
            </Typography>

            <LoginForm />

            {!smUp && (
              <Typography variant="body2" align="center" sx={{ mt: 3 }}>
                Don’t have an account?{" "}
                <Link variant="subtitle2" component={RouterLink} to="/register">
                  Get started
                </Link>
              </Typography>
            )}
          </ContentStyle>
        </Container>
      </RootStyle>
    </Page>
  );
};

export default Login;
