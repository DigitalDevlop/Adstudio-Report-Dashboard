import { cilAccountLogout } from "@coreui/icons";
import CIcon from "@coreui/icons-react";
import { CAlert } from "@coreui/react";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { authLogout } from "src/common/axiosCall";

const Logout = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    authLogout();

    navigate("/login");
  };
  return (
    <div>
      <span onClick={handleLogout}>
        <CIcon icon={cilAccountLogout} className="me-2" />
        Logout
      </span>
      {/* {errorMessage && <CAlert color="danger">{errorMessage}</CAlert>} */}
    </div>
  );
};

export default Logout;
