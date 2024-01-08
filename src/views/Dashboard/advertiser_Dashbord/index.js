import React, { useState, useEffect } from "react";
import { apiGetSummary } from "src/common/axiosCall";
import DspWidgetsDropdown from "src/views/Dashboard/advertiser_Dashbord/Widgets/DspWidgetDropdown";

import {
  CRow,
  CCol,
  CCard,
  CCardBody,
  CCardHeader,
  CSpinner,
} from "@coreui/react";

import moment from "moment";
import { optionsStat } from "./advertiser.constant";
import SummaryTable from "./Tables/summaryTable";
import DSPBarChart from "./Charts/barChart";
import DSPBarChart2 from "./Charts/barChart2";
import DSPDoughnutChart from "./Charts/doughnutChart";
import TopCampaignsTable from "./Tables/topCampaignsTable";
import { CustomGeoChart } from "./Charts/geoChart";
import CustomHeatMap from "./Charts/heatMap";

// DSP Dashboard Component
const DSPDashboard = () => {
  // State for storing dashboard data and date filters
  const [dashboardData, setDashboardData] = useState(null);
  const [fromDate, setFromDate] = useState(null);
  const [toDate, setToDate] = useState(null);

  // Object to hold date filter values
  let dateFilter = {
    fromDate,
    toDate,
  };
  useEffect(() => {
    const fetchData = async () => {
      const res = await apiGetSummary(dateFilter);

      if (res.data) {
        if (fromDate || toDate) {
          // Filter data based on date range
          let filteredData = res.data.filter((dt) => {
            if (dt.start_date >= fromDate && dt.end_date <= toDate) {
              return dt;
            }
          });

          setDashboardData(filteredData);
        } else {
          setDashboardData(res?.data);
        }
      }
    };
    fetchData();
  }, [fromDate, toDate]);

  // Handle date filter changes
  const handleDateFilter = (e) => {
    let currentDate = moment().format("YYYY-MM-DD");
    let from, to;

    if (e.target.value === "yesterday") {
      from = to = moment().subtract(1, "days").format("YYYY-MM-DD");
    }
    if (e.target.value === "last7days") {
      from = moment().subtract(6, "days").format("YYYY-MM-DD");
      to = currentDate;
    }
    if (e.target.value === "last30days") {
      from = moment().subtract(29, "days").format("YYYY-MM-DD");
      to = currentDate;
    }
    if (e.target.value === "lastMonth") {
      from = moment()
        .subtract(1, "months")
        .startOf("month")
        .format("YYYY-MM-DD");
      to = moment().subtract(1, "months").endOf("month").format("YYYY-MM-DD");
    }
    if (e.target.value === "thisMonth") {
      from = moment().startOf("month").format("YYYY-MM-DD");
      to = currentDate;
    }

    console.log(from, to);
    setFromDate(from);
    setToDate(to);
  };

  return (
    <CRow>
      <div>
        <h1>Advertiser Dashboard</h1>
        <div>
          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              alignItems: "center",
              marginBottom: "20px",
            }}
          >
            <select
              style={{
                padding: "10px",
                borderRadius: "10px",
                border: "1px solid #ccc",
                background: "#f5f5f5",
                outline: "none",
                minWidth: "150px",
              }}
              onChange={(e) => handleDateFilter(e)}
            >
              {optionsStat.map((option) => (
                <option
                  key={option.value}
                  value={option.value}
                  style={{
                    borderRadius: "10px",
                    background: "#fff",
                  }}
                >
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        {dashboardData ? (
          <DspWidgetsDropdown data={dashboardData} />
        ) : (
          <CSpinner color="primary" />
        )}

        <CRow>
          {dashboardData && (
            <CCol xs={12}>
              <CCard className="mb-4">
                <DSPBarChart campaigns={dashboardData} />
              </CCard>
            </CCol>
          )}

          {/* {dashboardData && (
              <CRow>
                <div className="col-md-12 text-right">
                  <CCol xs={4}>
                    <CCardBody>
                      <DSPDoughnutChart campaigns={dashboardData} />
                    </CCardBody>
                  </CCol>
                </div>
              </CRow>
            )} */}

          <CCol xs={6}>
            <CCard className="mb-4">
              <TopCampaignsTable summary={dashboardData} />
            </CCard>
          </CCol>

          <CCol xs={6}>
            <CCard className="mb-4">
              <div className="card">
                <div className="card-header">
                  <h3 className="card-title">
                    <i className="ion ion-clipboard mr-1" />
                    Top Banners
                  </h3>

                  <table className="table">
                    <thead>
                      <tr>
                        <th scope="col">#</th>
                        <th scope="col">Name</th>
                        <th scope="col">Impressions</th>
                        <th scope="col">Clicks</th>
                        <th scope="col">Conversions</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <th scope="row">1</th>
                        <td>Mark</td>
                        <td>Otto</td>
                        <td>@mdo</td>
                        <td>@mdo</td>
                      </tr>
                      <tr>
                        <th scope="row">2</th>
                        <td>Jacob</td>
                        <td>Thornton</td>
                        <td>@fat</td>
                        <td>@fat</td>
                      </tr>
                      <tr>
                        <th scope="row">3</th>
                        <td>Larry</td>
                        <td>the Bird</td>
                        <td>@twitter</td>
                        <td>@twitter</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </CCard>
          </CCol>

          <CCol xs={6}>
            <CCard className="mb-4">
              <div className="card">
                <div className="card-header">
                  <h3 className="card-title">
                    <i className="ion ion-clipboard mr-1" />
                    Top Country
                  </h3>

                  <table className="table">
                    <thead>
                      <tr>
                        <th scope="col">#</th>
                        <th scope="col">Name</th>
                        <th scope="col">Impressions</th>
                        <th scope="col">Clicks</th>
                        <th scope="col">Spend</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <th scope="row">1</th>
                        <td>Mark</td>
                        <td>Otto</td>
                        <td>@mdo</td>
                        <td>@mdo</td>
                      </tr>
                      <tr>
                        <th scope="row">2</th>
                        <td>Jacob</td>
                        <td>Thornton</td>
                        <td>@fat</td>
                        <td>@fat</td>
                      </tr>
                      <tr>
                        <th scope="row">3</th>
                        <td>Larry</td>
                        <td>the Bird</td>
                        <td>@twitter</td>
                        <td>@twitter</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </CCard>
          </CCol>

          <CCol xs={6}>
            <CCard className="mb-4">
              {dashboardData && (
                <CRow>
                  <DSPBarChart2 campaigns={dashboardData} />
                </CRow>
              )}
            </CCard>
          </CCol>
          <CCol xs={6}>
            <CCard className="mb-4">
              {dashboardData && <CRow>{/* <CustomGeoChart /> */}</CRow>}
            </CCard>
          </CCol>
          <CCol xs={6}>
            <CCard className="mb-4">
              {dashboardData && (
                <CRow>
                  <CustomHeatMap />
                </CRow>
              )}
            </CCard>
          </CCol>

          {dashboardData && (
            <CRow>
              <CCol xs={12}>
                <CCardBody>
                  <SummaryTable summary={dashboardData} />
                </CCardBody>
              </CCol>
            </CRow>
          )}
        </CRow>
      </div>
    </CRow>
  );
};

export default DSPDashboard;
