import React, { useState, useEffect } from "react";
import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CRow,
  CWidgetStatsC,
  CButton,
  CButtonGroup,
  CImage,
} from "@coreui/react";
import { cilChartPie, cilAlarm, cilCloudDownload } from "@coreui/icons";
import CIcon from "@coreui/icons-react";
import {
  CChartBar,
  CChartDoughnut,
  CChartLine,
  CChartPie,
  CChartPolarArea,
  CChartRadar,
} from "@coreui/react-chartjs";
import Homengif from "../../assets/images/Home gif.gif";

function Index() {
  const [currentTime, setCurrentTime] = useState(new Date());
  let data = sessionStorage.getItem("authData");
  const authData = JSON.parse(data);
  let userName = authData.name || "";

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000); // Update the time every 1000ms (1 second)

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <CRow>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong> {userName} </strong>
          </CCardHeader>
          <CCardBody>
            <div className="home">Welcome to the Adstudio Dashboard</div>
          </CCardBody>
          <CRow className="p-4">
            <CCol xs={12} sm={6} lg={6}>
              <CWidgetStatsC
                className="mb-3"
                icon={<CIcon icon={cilAlarm} height={36} />}
                color="warning"
                text="Widget helper text"
                title="Local Time"
                value={currentTime.toLocaleTimeString()}
              />
            </CCol>
            <CCol xs={12} sm={6} lg={6}>
              <CWidgetStatsC
                className="mb-3"
                icon={<CIcon icon={cilChartPie} height={36} />}
                color="success"
                text="Widget helper text"
                title="Widget title"
                value="89.9%"
              />
            </CCol>
          </CRow>

          <CRow className="p-4">
            <CCol xs={12} sm={6} lg={6}>
              <CChartRadar
                data={{
                  labels: [
                    "Eating",
                    "Drinking",
                    "Sleeping",
                    "Designing",
                    "Coding",
                    "Cycling",
                    "Running",
                  ],
                  datasets: [
                    {
                      label: "My First dataset",
                      backgroundColor: "rgba(220, 220, 220, 0.2)",
                      borderColor: "rgba(220, 220, 220, 1)",
                      pointBackgroundColor: "rgba(220, 220, 220, 1)",
                      pointBorderColor: "#fff",
                      pointHighlightFill: "#fff",
                      pointHighlightStroke: "rgba(220, 220, 220, 1)",
                      data: [65, 59, 90, 81, 56, 55, 40],
                    },
                    {
                      label: "My Second dataset",
                      backgroundColor: "rgba(151, 187, 205, 0.2)",
                      borderColor: "rgba(151, 187, 205, 1)",
                      pointBackgroundColor: "rgba(151, 187, 205, 1)",
                      pointBorderColor: "#fff",
                      pointHighlightFill: "#fff",
                      pointHighlightStroke: "rgba(151, 187, 205, 1)",
                      data: [28, 48, 40, 19, 96, 27, 100],
                    },
                  ],
                }}
              />
            </CCol>
            <CCol xs={12} sm={6} lg={6}>
              <CImage
                rounded
                thumbnail
                src={Homengif}
                width={800}
                height={800}
                style={{ border: "none" }}
              />
            </CCol>
          </CRow>
        </CCard>
      </CCol>
    </CRow>
  );
}


export default Index;
