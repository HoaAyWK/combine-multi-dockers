import React, { Children } from "react";
import styled from "styled-components";
import { NavLink } from "react-router-dom";
const AuthenticationPageStyles = styled.div`
  min-height: 100vh;
  padding: 40px;

  .logo {
    margin: 0 auto 20px;
  }

  .heading {
    text-align: center;
    color: #1dc071;
    font-weight: bold;
    font-size: 40px;
    margin-bottom: 60px;
  }

  .form {
    max-width: 600px;
    margin: 0 auto;
  }

  .have-account {
    margin-bottom: 20px;
    a {
      display: inline-block;
      color: #1dc071;
      font-weight: 500;
    }
  }
`;

const AuthenticationPage = ({ children }) => {
  return (
    <AuthenticationPageStyles>
      {" "}
      <div className="container">
        {" "}
        <NavLink to="/">
          <img
            srcSet="/images/logo.png 2x"
            alt="monkey-blogging"
            className="logo"
          />
        </NavLink>
        <h1 className="heading">Student Management</h1>
        {children}
      </div>
    </AuthenticationPageStyles>
  );
};

export default AuthenticationPage;
