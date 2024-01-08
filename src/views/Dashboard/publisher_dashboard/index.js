import React, { useEffect, useState } from "react";
import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CRow,
  CSpinner,
} from "@coreui/react";
import { CChartBar } from "@coreui/react-chartjs";

import {
  getPublisherStats,
  getPublisherSummary,
  getPublisherWebsiteSummary,
} from "src/common/axiosCall";
import { optionsStat } from "./publisher.constant";
import moment from "moment";
import DailySummaryChart from "./Chart/dailySummaryChart";

import PublisherWebsite from "./Tables/websiteSummaryTable";
import SspWidgets from "../publisher_dashboard/Widgets/SspWidgetDropdown";
import PublisherSummaryTable from "./Tables/publisherSummaryTable";

const SSPDashboard = () => {
  // State variables for data and date range
  const [dashboardData, setDashboardData] = useState(null);
  const [fromDate, setFromDate] = useState(null);
  const [toDate, setToDate] = useState(null);
  const [websiteData, setWebsiteData] = useState(null);
  const [statsData, setStatsData] = useState(null);

  // Object to store date filter
  let dateFilter = {
    fromDate,
    toDate,
  };

  // Effect to fetch publisher stats based on date filter
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getPublisherStats(dateFilter);
        console.log("Data received:", res.data);

        if (res.data) {
          let filteredData = res.data;
          console.log("filteredData", filteredData);

          setStatsData(filteredData);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [fromDate, toDate]);

  // Effect to fetch publisher summary based on date filter
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getPublisherSummary(dateFilter);
        console.log("Data received:", res.data);

        if (res.data) {
          let filteredData = res.data;
          console.log("filteredData", filteredData);

          setDashboardData(filteredData);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [fromDate, toDate]);

  // Effect to fetch publisher website summary based on date filter
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getPublisherWebsiteSummary(dateFilter);
        console.log("Data received:", res.data);

        if (res.data) {
          let filteredData = res.data;
          console.log("filteredData", filteredData);

          setWebsiteData(filteredData);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [fromDate, toDate]);

  // Function to handle date filter change
  const handleDateFilter = (e) => {
    let currentDate = moment().format("YYYY-MM-DD");
    let from, to;

    // Apply different date filters based on user selection
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
        <h1>Publisher Dashboard</h1>
        <div>
          {/* Selection Bar */}
          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              alignItems: "center", // Center the select element vertically
              marginBottom: "20px", // Add some spacing at the bottom
            }}
          >
            <select
              style={{
                padding: "10px", // Add padding to the select element
                borderRadius: "10px", // Rounded corners
                border: "1px solid #ccc", // Add a border
                background: "#f5f5f5", // Background color
                outline: "none", // Remove the default outline
                minWidth: "150px", // Set a minimum width
              }}
              onChange={(e) => handleDateFilter(e)}
            >
              {optionsStat.map((option) => (
                <option
                  key={option.value}
                  value={option.value}
                  style={{
                    borderRadius: "10px", // Rounded corners for the options
                    background: "#fff", // Background color for options
                  }}
                >
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        </div>
        {statsData ? (
          <SspWidgets data={statsData} />
        ) : (
          <CSpinner color="primary" />
        )}

        {dashboardData && <DailySummaryChart data={dashboardData} />}

        {websiteData && <PublisherWebsite websiteData={websiteData} />}
        {dashboardData && <PublisherSummaryTable summaryData={dashboardData} />}
      </div>
    </CRow>
  );
};

export default SSPDashboard;
