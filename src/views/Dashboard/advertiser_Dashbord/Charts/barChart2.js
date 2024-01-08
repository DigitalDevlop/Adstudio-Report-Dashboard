import { CCard, CCardHeader } from "@coreui/react";
import { CChart } from "@coreui/react-chartjs";
import { getStyle } from "@coreui/utils";
import React, { useEffect, useState } from "react";
import { truncateTextAfterUnderscore } from "../utils";

function DSPBarChart2({ campaigns }) {
  const [data, setData] = useState(null);
  const [labels, setLabels] = useState(null);

  useEffect(() => {
    const tempLabels = campaigns.map((campaign) =>
      truncateTextAfterUnderscore(campaign.Campaign_name)
    );
    setLabels(tempLabels);
    const tempDataImpression = campaigns.map(
      (campaign) => campaign.reached_impression
    );
    const tempDataClicks = campaigns.map(
      (campaign) => campaign.acheived_clicks
    );
    setData({ tempDataClicks, tempDataImpression });
  }, [campaigns]);

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
                backgroundColor: "#ff0400", // Set a unique color for Impressions
                data: data.tempDataImpression, // Use data directly without the "?"
              },
              {
                label: "Clicks",
                backgroundColor: "#fbff00", // Set a unique color for Clicks
                data: data.tempDataClicks, // Use data directly without the "?"
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

export default DSPBarChart2;
