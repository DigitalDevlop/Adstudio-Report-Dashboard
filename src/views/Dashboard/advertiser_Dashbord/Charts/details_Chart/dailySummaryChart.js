import { CCard, CCardHeader } from "@coreui/react";
import { CChart } from "@coreui/react-chartjs";
import { getStyle } from "@coreui/utils";
import React, { useEffect, useState } from "react";
import { truncateTextAfterUnderscore } from "../../utils";

function DailySummaryChart({ dailyData }) {
  const [data, setData] = useState(null);
  const [labels, setLabels] = useState(null);

  //   ad_spend: 3019.462
  // clicks: 41
  // date: "2023-03-20"
  // impression: 48701
  useEffect(() => {
    const tempLabels = dailyData.map((dailyData) =>
      truncateTextAfterUnderscore(dailyData.date)
    );
    setLabels(tempLabels);
    const tempDataImpression = dailyData.map(
      (dailyData) => dailyData.impression
    );
    const tempDataClicks = dailyData.map((dailyData) => dailyData.clicks);
    setData({ tempDataClicks, tempDataImpression });
    const tempDataAd_spend = dailyData.map((dailyData) => dailyData.ad_spend);
    setData({ tempDataClicks, tempDataImpression, tempDataAd_spend });
  }, [dailyData]);

  return (
    labels &&
    data && (
      <CCard className="mb-4 position-relative">
        <CCardHeader>Campaign Chart</CCardHeader>
        <CChart
          type="bar"
          data={{
            labels: labels,
            datasets: [
              {
                label: "Impressions",
                backgroundColor: "#7cff00", // Set a unique color for Impressions
                data: data.tempDataImpression, // Use data directly without the "?"
              },
              {
                label: "Clicks",
                backgroundColor: "#fbff00", // Set a unique color for Clicks
                data: data.tempDataClicks, // Use data directly without the "?"
              },
              {
                label: "Ad_spend",
                backgroundColor: "#ff0400", // Set a unique color for Clicks
                data: data.tempDataAd_spend, // Use data directly without the "?"
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
          }}
        />
      </CCard>
    )
  );
}

export default DailySummaryChart;
