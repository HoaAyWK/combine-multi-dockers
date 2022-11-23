import React from "react";
import { Container, Typography } from "@mui/material";

import Page from "../components/Page";
const DashboardApp = () => {
  return (
    <Page title="Dashboard">
      <Container maxWidth="xl">
        <Typography variant="h4" sx={{ mb: 5 }}>
          Hi, Welcome back
        </Typography>
      </Container>
    </Page>
  );
};

export default DashboardApp;
