import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  AppContent,
  AppSidebar,
  AppFooter,
  AppHeader,
} from "../components/index";

const DefaultLayout = () => {
  const navigate = useNavigate();

  // Check the presence of the authToken in sessionStorage
  const authToken = sessionStorage.getItem("authData");

  useEffect(() => {
    // If authToken is not available, navigate to the login page
    if (!authToken) {
      navigate("/login");
    }
  }, [authToken, navigate]);

  // Render the layout only if authToken is available
  return (
    <div>
      {authToken && (
        <>
          <AppSidebar />
          <div className="wrapper d-flex flex-column min-vh-100 bg-light">
            <AppHeader />
            <div className="body flex-grow-1 px-3">
              <AppContent />
            </div>
            <AppFooter />
          </div>
        </>
      )}
    </div>
  );
};

export default DefaultLayout;
