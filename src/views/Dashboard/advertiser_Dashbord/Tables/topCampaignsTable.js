import React, { useEffect, useState } from "react";
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
import { formatNumber } from "../utils";
import numeral from "numeral";

function TopCampaignsTable({ summary }) {
  const [campaigns, setCampaigns] = useState(null);

  const columns = [
    {
      key: "campaignName",
      label: "Name",
      _props: { scope: "col" },
    },
    // {
    //   key: "campaignPeriod",
    //   label: "Campaign Period",
    //   _props: { scope: "col" },
    // },
    // {
    //   key: "targetImpressions",
    //   label: "Target Impressions",
    //   _props: { scope: "col" },
    // },
    // {
    //   key: "budget",
    //   label: "Budget (LKR)",
    //   _props: { scope: "col" },
    // },
    {
      key: "spent",
      label: "Spent(LKR)",
      _props: { scope: "col" },
    },
    {
      key: "reachedImpressions",
      label: "Impressions",
      _props: { scope: "col" },
    },
    {
      key: "achievedClicks",
      label: "Clicks",
      _props: { scope: "col" },
    },
    // {
    //   key: "view",
    //   label: "View",
    //   _props: { scope: "col" },
    // },
  ];

  useEffect(() => {
    if (summary && summary?.length > 0) {
      const tempCampaings = summary.map((campaign) => {
        return {
          campaignName: campaign.Campaign_name.replace(/_/g, " "),
          //   campaignPeriod: campaign.campaign_period,
          //   targetImpressions: `${formatNumber(
          //     campaign.kpi_impressions_min
          //   )} to ${formatNumber(campaign.kpi_impression_max)}`,
          //   budget: numeral(campaign.budget).format("0,0.00"),
          spent: numeral(campaign.utilized_budget).format("0,0.00"),
          reachedImpressions: formatNumber(campaign.reached_impression),
          achievedClicks: formatNumber(campaign.acheived_clicks),
        };
      });

      //     let totalCampaignBudget = 0;
      //   let totalReachedImpressions = 0;
      //   let totalAchievedClicks = 0;
      //     let totalUtilizedBudget = 0;

      //   summary.forEach((item) => {
      //     totalCampaignBudget += parseFloat(item.budget);
      //     totalReachedImpressions += item.reached_impression;
      //     totalAchievedClicks += item.acheived_clicks;
      //     totalUtilizedBudget += item.utilized_budget;
      //   });

      // Sort campaigns based on some criteria (e.g., achievedClicks)
      const sortedCampaigns = tempCampaings.sort(
        (a, b) => b.achievedClicks - a.achievedClicks
      );

      // Select the top 3 campaigns
      const top3Campaigns = sortedCampaigns.slice(0, 3);

      setCampaigns({
        campaigns: top3Campaigns,
        totals: {
          //     totalCampaignBudget,
          //   totalReachedImpressions,
          //   totalAchievedClicks,
          //     totalUtilizedBudget,
        },
      });
    }
  }, [summary]);

  return (
    <CCard className="mb-4 position-relative">
      <CCardHeader>Top Campaigns</CCardHeader>
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
                {/* <CTableDataCell>{campaign?.campaignPeriod}</CTableDataCell> */}
                {/* <CTableDataCell>{campaign?.targetImpressions}</CTableDataCell> */}
                {/* <CTableDataCell>{campaign?.budget}</CTableDataCell> */}
                <CTableDataCell>{campaign?.spent}</CTableDataCell>
                <CTableDataCell>{campaign?.reachedImpressions}</CTableDataCell>
                <CTableDataCell>{campaign?.achievedClicks}</CTableDataCell>
                {/* <CTableDataCell>{campaign?.View}</CTableDataCell> */}
              </CTableRow>
            ))}

          {/* <CTableRow>
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
          </CTableRow> */}
        </CTableBody>
      </CTable>
    </CCard>
  );
}

export default TopCampaignsTable;
