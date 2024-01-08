import React, { useState } from "react";
import {
  CButton,
  CCard,
  CCardBody,
  CCol,
  CContainer,
  CForm,
  CFormInput,
  CInputGroup,
  CInputGroupText,
  CRow,
  CProgress,
} from "@coreui/react";
import CIcon from "@coreui/icons-react";
import { cilLockLocked, cilUser } from "@coreui/icons";
import { useNavigate } from "react-router-dom";
import { all } from "axios";

const Register = () => {
  const [step, setStep] = useState(1);
  const [application, setAplication] = useState("");
  const [allFormData, setAllFormData] = useState({
    name: "",
    email: "",
    password: "",
    rePassword: "",
    role: "",
    application: "",
    advertiser: [],
    campaign: [],
    publisher: [],
  });

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    rePassword: "",
    role: "",
  });

  const [dashboardName, setDashboardName] = useState("");

  const totalSteps = 3;
  const navigate = useNavigate();

  const handleFormChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));

    setAllFormData((prevAllFormData) => ({
      ...prevAllFormData,
      [name]: value,
    }));

    // console.log('aaaaaaaaaaaaaaaaaaa'allFormData)
    // Update allFormData with the current form data
  };

  const handleNext = () => {
    // console.log('Before navigation - allFormData:', allFormData);
    if (step < totalSteps) {
      if (application === "advertiser") {
        navigate("/selectAdvertiser", { state: { allFormData } });
        console.log("aaaaaaaaaaaaaaaaaa", allFormData);
      }

      if (application === "publisher") {
        navigate("/selectPublisher", { state: { allFormData } });
        console.log("aaaaaaaaaaaaaaaaaa", allFormData);
      }
      if (application === "internal") {
        navigate("/home", { state: { allFormData } });
        console.log("aaaaaaaaaaaaaaaaaa", allFormData);
      } else {
        setStep(step + 1);
      }
    }
  };

  const handlePrev = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const handleUserTypeChange = (event) => {
    setAplication(event.target.value);
    const selectedUserType = event.target.value;

    // Set the dashboard name based on the selected user type
    switch (event.target.value) {
      case "advertiser":
        setDashboardName("Advertiser Dashboard");
        break;
      case "publisher":
        setDashboardName("Publisher Dashboard");
        break;
      case "internal":
        setDashboardName("Internal Dashboard");
        break;
      default:
        setDashboardName(""); // Clear the dashboard name if none is selected
    }

    setAllFormData((prevAllFormData) => ({
      ...prevAllFormData,
      application: selectedUserType,
    }));
    console.log("Data:", allFormData);
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <div>
            <CContainer>
              <CRow className="justify-content-center">
                <CCol md={9} lg={7} xl={6}>
                  <CCardBody className="p-1">
                    <CForm>
                      <CInputGroup className="mb-3">
                        <CInputGroupText>
                          <CIcon icon={cilUser} />
                        </CInputGroupText>
                        <CFormInput
                          onChange={handleFormChange}
                          name="name"
                          placeholder="name"
                          autoComplete="name"
                          style={{ fontSize: "16px" }}
                        />
                      </CInputGroup>
                      <CInputGroup className="mb-3">
                        <CInputGroupText>@</CInputGroupText>
                        <CFormInput
                          onChange={handleFormChange}
                          name="email"
                          placeholder="Email"
                          autoComplete="email"
                          style={{ fontSize: "16px" }}
                        />
                      </CInputGroup>
                      <CInputGroup className="mb-3">
                        <CInputGroupText>
                          <CIcon icon={cilLockLocked} />
                        </CInputGroupText>
                        <CFormInput
                          onChange={handleFormChange}
                          type="password"
                          name="password"
                          placeholder="Password"
                          autoComplete="new-password"
                          style={{ fontSize: "16px" }}
                        />
                      </CInputGroup>
                      <CInputGroup className="mb-4">
                        <CInputGroupText>
                          <CIcon icon={cilLockLocked} />
                        </CInputGroupText>
                        <CFormInput
                          onChange={handleFormChange}
                          type="password"
                          name="rePassword"
                          placeholder="Repeat password"
                          autoComplete="new-password"
                          style={{ fontSize: "16px" }}
                        />
                      </CInputGroup>
                      <CInputGroup>
                        <CInputGroupText>
                          <CIcon icon={cilUser} />
                        </CInputGroupText>
                        <select
                          className="form-select mb-0.5"
                          style={{ fontSize: "16px" }}
                          name="role"
                          onChange={handleFormChange}
                        >
                          <option value="">--Select--</option>
                          <option value="user">User</option>
                          <option value="admin">Admin</option>
                        </select>
                      </CInputGroup>
                    </CForm>
                  </CCardBody>
                </CCol>
              </CRow>
            </CContainer>
          </div>
        );
      case 2:
        return (
          <div>
            <CContainer>
              <CRow className="justify-content-center">
                <CCol md={9} lg={7} xl={6}>
                  <CCardBody className="p-1">
                    <CForm>
                      <div className="mb-3">
                        <div className="form-check">
                          <input
                            className="form-check-input"
                            type="radio"
                            name="application"
                            checked={application === "advertiser"}
                            onChange={handleUserTypeChange}
                            id="advertiserRadio"
                            value="advertiser"
                          />
                          <label
                            className="form-check-label"
                            htmlFor="advertiserRadio"
                            style={{ fontSize: "16px" }}
                          >
                            Advertiser
                          </label>
                        </div>
                        <div className="form-check">
                          <input
                            className="form-check-input"
                            type="radio"
                            name="application"
                            checked={application === "publisher"}
                            onChange={handleUserTypeChange}
                            id="publisherRadio"
                            value="publisher"
                          />
                          <label
                            className="form-check-label"
                            htmlFor="publisherRadio"
                            style={{ fontSize: "16px" }}
                          >
                            Publisher
                          </label>
                        </div>
                        <div className="form-check">
                          <input
                            className="form-check-input"
                            type="radio"
                            name="application"
                            checked={application === "internal"}
                            onChange={handleUserTypeChange}
                            id="internalRadio"
                            value="internal"
                          />
                          <label
                            className="form-check-label"
                            htmlFor="internalRadio"
                            style={{ fontSize: "16px" }}
                          >
                            Internal
                          </label>
                        </div>
                      </div>
                    </CForm>
                  </CCardBody>
                </CCol>
              </CRow>
            </CContainer>
          </div>
        );
      case 3:
        return <div>{/* Step 3 form fields */}</div>;
      default:
        return null;
    }
  };

  const calculateProgress = () => {
    return (step / totalSteps) * 100;
  };

  return (
    <div className="bg-light min-vh-100 d-flex flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md={9} lg={7} xl={6}>
            <CCard className="mx-4">
              <CCardBody className="p-4">
                <CProgress value={calculateProgress()} className="mb-2" />

                <CForm>
                  <center>
                    <h1>Register</h1>
                    <p className="text-medium-emphasis">Create your account</p>
                  </center>
                  {renderStep()}
                  <div
                    className={`d-flex justify-content-${
                      step === 1 ? "end" : "between"
                    }`}
                  >
                    {step > 1 && (
                      <CButton color="primary" onClick={handlePrev}>
                        Previous
                      </CButton>
                    )}
                    {step === 1 && (
                      <CButton color="success" onClick={handleNext}>
                        Next
                      </CButton>
                    )}
                    {step === 2 && (
                      <CButton color="success" onClick={handleNext}>
                        {step < totalSteps ? "Next" : "Submit"}
                      </CButton>
                    )}
                  </div>
                </CForm>
              </CCardBody>
            </CCard>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  );
};

export default Register;
