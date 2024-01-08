import {
  CCard,
  CCardHeader,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
} from "@coreui/react";
import React, { useEffect, useState } from "react";
import { formatNumber } from "../utils";
import numeral from "numeral";
import { FaEye } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

function SummaryTable({ summary }) {
  const navigate = useNavigate();
  const [campaigns, setCampaigns] = useState(null);

  const columns = [
    {
      key: "campaignName",
      label: "Campaign Name",
      _props: { scope: "col" },
    },
    {
      key: "campaignPeriod",
      label: "Campaign Period",
      _props: { scope: "col" },
    },

    {
      key: "targetImpressions",
      label: "Target Impressions",
      _props: { scope: "col" },
    },
    {
      key: "budget",
      label: "Budget (LKR)",
      _props: { scope: "col" },
    },
    {
      key: "spent",
      label: "Spent (LKR)",
      _props: { scope: "col" },
    },
    {
      key: "reachedImpressions",
      label: "Reached Impressions",
      _props: { scope: "col" },
    },
    {
      key: "achievedClicks",
      label: "Achieved Clicks",
      _props: { scope: "col" },
    },
    {
      // key: "view",
      label: "View",
      _props: { scope: "col" },
    },
  ];

  // Effect to process campaign data when the summary prop changes
  useEffect(() => {
    if (summary && summary?.length > 0) {
      const tempCampaings = summary.map((campaign) => {
        return {
          campaignId: campaign.Campaign_id,
          campaignName: campaign.Campaign_name.replace(/_/g, " "),
          campaignPeriod: campaign.campaign_period,
          targetImpressions: `${formatNumber(
            campaign.kpi_impressions_min
          )} to ${formatNumber(campaign.kpi_impression_max)}`,
          budget: numeral(campaign.budget).format("0,0.00"),
          spent: numeral(campaign.utilized_budget).format("0,0.00"),
          reachedImpressions: formatNumber(campaign.reached_impression),
          achievedClicks: formatNumber(campaign.acheived_clicks),
        };
      });

      let totalCampaignBudget = 0;
      let totalReachedImpressions = 0;
      let totalAchievedClicks = 0;
      let totalUtilizedBudget = 0;

      summary.forEach((item) => {
        totalCampaignBudget += parseFloat(item.budget);
        totalReachedImpressions += item.reached_impression;
        totalAchievedClicks += item.acheived_clicks;
        totalUtilizedBudget += item.utilized_budget;
      });

      setCampaigns({
        campaigns: tempCampaings,
        totals: {
          totalCampaignBudget,
          totalReachedImpressions,
          totalAchievedClicks,
          totalUtilizedBudget,
        },
      });
    }
  }, [summary]);
  return (
    <CCard className="mb-4 position-relative">
      <CCardHeader>Campaigns Summary</CCardHeader>
      <CTable>
        <CTableHead>
          <CTableRow>
            {columns.map((column, i) => (
              <CTableHeaderCell key={i} scope="col">
                {column.label}
              </CTableHeaderCell>
            ))}
          </CTableRow>
        </CTableHead>
        <CTableBody>
          {campaigns &&
            campaigns?.campaigns?.length > 0 &&
            campaigns?.campaigns?.map((campaign, i) => (
              <CTableRow key={i}>
                <CTableDataCell>{campaign?.campaignName}</CTableDataCell>
                <CTableDataCell>{campaign?.campaignPeriod}</CTableDataCell>
                <CTableDataCell>{campaign?.targetImpressions}</CTableDataCell>
                <CTableDataCell>{campaign?.budget}</CTableDataCell>
                <CTableDataCell>{campaign?.spent}</CTableDataCell>
                <CTableDataCell>{campaign?.reachedImpressions}</CTableDataCell>
                <CTableDataCell>{campaign?.achievedClicks}</CTableDataCell>
                <CTableDataCell>
                  <span
                    role="button"
                    onClick={() =>
                      navigate("/dspdashboard/details", {
                        state: { campaignId: campaign?.campaignId },
                      })
                    }
                  >
                    <FaEye />
                  </span>
                </CTableDataCell>
              </CTableRow>
            ))}

          <CTableRow>
            <CTableHeaderCell>Total</CTableHeaderCell>
            <CTableDataCell></CTableDataCell>
            <CTableDataCell></CTableDataCell>
            <CTableDataCell>
              {numeral(campaigns?.totals?.totalCampaignBudget).format("0,0.00")}
            </CTableDataCell>
            <CTableDataCell>
              {numeral(campaigns?.totals?.totalUtilizedBudget).format("0,0.00")}
            </CTableDataCell>
            <CTableDataCell>
              {formatNumber(campaigns?.totals?.totalReachedImpressions)}
            </CTableDataCell>
            <CTableDataCell>
              {formatNumber(campaigns?.totals?.totalAchievedClicks)}
            </CTableDataCell>

            <CTableDataCell>{formatNumber()}</CTableDataCell>
          </CTableRow>
        </CTableBody>
      </CTable>
    </CCard>
  );
}

export default SummaryTable;
