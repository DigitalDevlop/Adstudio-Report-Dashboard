import { CCard, CCardBody, CCardHeader } from "@coreui/react";
import { CChart } from "@coreui/react-chartjs";
import { getStyle } from "@coreui/utils";
import React, { useEffect, useState } from "react";
import { truncateTextAfterUnderscore } from "../utils";

// DSP Bar Chart Component
function DSPBarChart({ campaigns }) {
  // State variables to store chart data
  const [data, setData] = useState(null);
  const [labels, setLabels] = useState(null);

  // Fetch and process data when campaigns prop changes
  useEffect(() => {
    // Extract campaign names for chart labels
    const tempLables = campaigns.map((campaign) =>
      truncateTextAfterUnderscore(campaign.Campaign_name)
    );
    setLabels(tempLables);

    // Extract impression and click data for chart datasets
    const tempDataImpression = campaigns.map(
      (campaign) => campaign.reached_impression
    );
    const tempDataClicks = campaigns.map(
      (campaign) => campaign.acheived_clicks
    );
    setData({ tempDataClicks, tempDataImpression });
  }, [campaigns]);

  // Render the DSP Bar Chart
  return (
    <CCard className="mb-4 position-relative">
      <CCardHeader>Campaign Chart</CCardHeader>
      <CCardBody>
        {labels && data && (
          <CChart
            type="line"
            data={{
              labels: labels,
              datasets: [
                {
                  label: "Impresions",
                  backgroundColor: "rgba(220, 220, 220, 0.2)",
                  borderColor: "rgba(220, 220, 220, 1)",
                  pointBackgroundColor: "rgba(220, 220, 220, 1)",
                  pointBorderColor: "#8fce00",
                  data: data?.tempDataImpression,
                },
                {
                  label: "Clicks",
                  backgroundColor: "rgba(151, 187, 205, 0.2)",
                  borderColor: "rgba(151, 187, 205, 1)",
                  pointBackgroundColor: "rgba(151, 187, 205, 1)",
                  pointBorderColor: "#0048bd",
                  data: data?.tempDataClicks,
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
        )}
      </CCardBody>
    </CCard>
  );
}

export default DSPBarChart;
