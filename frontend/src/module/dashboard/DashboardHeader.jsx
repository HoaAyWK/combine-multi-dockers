import Button from "../../components/button/Button";
import React from "react";
import { NavLink, Link } from "react-router-dom";
import styled from "styled-components";
const DashboardHeaderStyles = styled.div`
  background-color: white;
  padding: 20px;
  border-bottom: 1px solid #eee;
  display: flex;
  justify-content: space-between;
  gap: 20px;
  .logo {
    display: flex;
    align-items: center;
    gap: 20px;
    font-size: 18px;
    font-weight: 600;
    img {
      max-width: 40px;
    }
  }
  .header-avatar {
    width: 52px;
    height: 52px;
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      border-radius: 100rem;
    }
  }
  .header-right {
    display: flex;
    align-items: center;
    gap: 20px;
  }
`;

const DashboardHeader = () => {
  return (
    <DashboardHeaderStyles>
      <NavLink to="/" className="logo">
        <img
          srcSet="/images/logo.png 2x"
          alt="monkey-blogging"
          className="logo"
        />
        <span className="hidden lg:inline-block">Student Management</span>
      </NavLink>
    </DashboardHeaderStyles>
  );
};

export default DashboardHeader;
