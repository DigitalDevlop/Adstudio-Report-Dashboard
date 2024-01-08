import React, { useState } from "react";
import {
  CAlert, // Import CAlert from CoreUI
  CButton,
  CCard,
  CCardBody,
  CCardGroup,
  CCol,
  CContainer,
  CForm,
  CFormInput,
  CImage,
  CInputGroup,
  CInputGroupText,
  CRow,
} from "@coreui/react";
import { useNavigate } from "react-router-dom";
import { login } from "./login.auth.action";
import Logingif from "../../../assets/images/Login.gif";
import CIcon from "@coreui/icons-react";
import { cilLockLocked, cilUser } from "@coreui/icons";

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [errorMessage, setErrorMessage] = useState(""); // State to hold the error message

  const handleLogin = () => {
    login(formData, (status) => {
      if (status === 200) {
        navigate("/home");
      } else {
        setErrorMessage("Login failed. Please check your email and password.");
      }
    });
  };

  return (
    <div className="bg-light min-vh-100 d-flex flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md={8}>
            <CCardGroup>
              <CCard
                className="p-4"
                style={{
                  background: "linear-gradient(14deg, #db2245, #4b7ca3)",
                }}
              >
                <CCardBody>
                  <CForm>
                    <h1 className="style">Login</h1>
                    <p className="style">Sign In to your account</p>
                    <CInputGroup className="mb-3">
                      <CInputGroupText>
                        <CIcon icon={cilUser} />
                      </CInputGroupText>
                      <CFormInput
                        placeholder="Email"
                        autoComplete="email"
                        value={formData.email}
                        onChange={(e) =>
                          setFormData({ ...formData, email: e.target.value })
                        }
                      />
                    </CInputGroup>
                    <CInputGroup className="mb-4">
                      <CInputGroupText>
                        <CIcon icon={cilLockLocked} />
                      </CInputGroupText>
                      <CFormInput
                        type="password"
                        placeholder="Password"
                        autoComplete="current-password"
                        value={formData.password}
                        onChange={(e) =>
                          setFormData({ ...formData, password: e.target.value })
                        }
                      />
                    </CInputGroup>
                    {errorMessage && (
                      <CAlert color="danger">{errorMessage}</CAlert>
                    )}
                    <CButton
                      color="primary"
                      className="px-4"
                      onClick={handleLogin}
                    >
                      Login
                    </CButton>
                  </CForm>
                </CCardBody>
              </CCard>
              <CCard className="text-white  py-5" style={{ width: "44%" }}>
                <CCardBody className="text-center">
                  <div>
                    <CImage
                      rounded
                      thumbnail
                      src={Logingif}
                      width={400}
                      height={400}
                      style={{ border: "none" }}
                    />
                  </div>
                </CCardBody>
              </CCard>
            </CCardGroup>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  );
};

export default Login;
