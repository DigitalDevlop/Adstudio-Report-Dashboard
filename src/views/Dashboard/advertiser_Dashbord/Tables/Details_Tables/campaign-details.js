import moment from "moment";
import React from "react";
import {
  CCard,
  CCardHeader,
  CCol,
  CRow,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
} from "@coreui/react";
import { formatNumber } from "../../utils";
import numeral from "numeral";

function CampaignDetails({ campaignData }) {
  const tableStyle = {
    borderBottom: "1px solid #dee2e6",
  };

  return (
    <CCard className="mb-4 position-relative">
      <CCardHeader>Campaign Wise Summary</CCardHeader>
      <div className="mb-4 p-3">
        <h5 className="text-primary mb-3">{campaignData.Campaign_name}</h5>
        <CTable style={tableStyle} striped bordered hover responsive size="sm">
          <CTableBody>
            <CTableRow>
              <CTableHeaderCell>Campaign Period</CTableHeaderCell>
              <CTableDataCell className="text-right">
                {moment(campaignData.start_date).format("YYYY-MM-DD")} to{" "}
                {moment(campaignData.end_date).format("YYYY-MM-DD")}
              </CTableDataCell>
            </CTableRow>
            <CTableRow>
              <CTableHeaderCell>Target Impressions</CTableHeaderCell>
              <CTableDataCell className="text-right">
                {formatNumber(campaignData.kpi_impressions_min)} to{" "}
                {formatNumber(campaignData.kpi_impression_max)}
              </CTableDataCell>
            </CTableRow>
            <CTableRow>
              <CTableHeaderCell>Reached Impressions</CTableHeaderCell>
              <CTableDataCell className="text-right">
                {formatNumber(campaignData.reached_impression)}
              </CTableDataCell>
            </CTableRow>
            <CTableRow>
              <CTableHeaderCell>Achieved Clicks</CTableHeaderCell>
              <CTableDataCell className="text-right">
                {formatNumber(campaignData.acheived_clicks)}
              </CTableDataCell>
            </CTableRow>
            <CTableRow>
              <CTableHeaderCell>Campaign Budget (LKR)</CTableHeaderCell>
              <CTableDataCell className="text-right">
                {numeral(campaignData.campaign_budget).format("0,0.00")}
              </CTableDataCell>
            </CTableRow>
            <CTableRow>
              <CTableHeaderCell>Utilized Budget (LKR)</CTableHeaderCell>
              <CTableDataCell className="text-right">
                {numeral(campaignData.utilized_budget).format("0,0.00")}
              </CTableDataCell>
            </CTableRow>
          </CTableBody>
        </CTable>
      </div>
    </CCard>
  );
}

export default CampaignDetails;
