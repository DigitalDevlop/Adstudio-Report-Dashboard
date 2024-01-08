import { CCard, CCardHeader } from "@coreui/react";
import { CChart } from "@coreui/react-chartjs";
import { getStyle } from "@coreui/utils";
import React, { useEffect, useState } from "react";

function DailySummaryChart({ data }) {
  console.log(data, "data1");
  const [cdata, setCdata] = useState(null);
  const [labels, setLabels] = useState(null);

  useEffect(() => {
    const tempLabels = data.map((item) => item.date); // Assuming your data has a "date" property
    setLabels(tempLabels);

    const tempDataImpression = data.map((item) => item.impressions);
    const tempDataClicks = data.map((item) => item.clicks);
    const tempDataRequest = data.map((item) => item.request);
    const tempDataRevenue = data.map((item) => item.revenue);

    // Use an object to update cdata
    setCdata({
      tempDataClicks,
      tempDataImpression,
      tempDataRequest,
      tempDataRevenue,
    });
  }, [data]);

  return (
    labels &&
    cdata && (
      <CCard className="mb-4 position-relative">
        <CCardHeader>Daily Summary Chart</CCardHeader>
        <CChart
          type="bar"
          data={{
            labels: labels,
            datasets: [
              {
                label: "Impressions",
                backgroundColor: "#7cff00",
                data: cdata.tempDataImpression, // Use cdata directly
              },
              {
                label: "Clicks",
                backgroundColor: "#fbff00",
                data: cdata.tempDataClicks,
              },
              {
                label: "Request",
                backgroundColor: "#ff0400",
                data: cdata.tempDataRequest,
              },
              {
                label: "revenue",
                backgroundColor: "#00fbff",
                data: cdata.tempDataRevenue,
              },
            ],
          }}
          options={{
            plugins: {
              legend: {
                labels: {
                  color: getStyle("--cui-body-color"),
                },
              },
            },
            scales: {
              x: {
                grid: {
                  color: getStyle("--cui-border-color-translucent"),
                },
                ticks: {
                  color: getStyle("--cui-body-color"),
                },
              },
              y: {
                grid: {
                  color: getStyle("--cui-border-color-translucent"),
                },
                ticks: {
                  color: getStyle("--cui-body-color"),
                },
              },
            },
            // Add the "xAxis" property to show date labels
            xAxis: {
              ticks: {
                color: getStyle("--cui-body-color"),
              },
            },
          }}
        />
      </CCard>
    )
  );
}

export default DailySummaryChart;
