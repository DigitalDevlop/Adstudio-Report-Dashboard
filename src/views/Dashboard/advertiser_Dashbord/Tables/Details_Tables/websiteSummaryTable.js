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
import numeral from "numeral";
import { formatNumber } from "../../utils";

function WebsiteSummaryTable({ websiteData }) {
  const [data, setData] = useState(null);
  const [labels, setLabels] = useState(null);

  const columns = [
    {
      key: "Website_url",
      label: "Date",
      _props: { scope: "col" },
    },
    {
      key: "ad_spend",
      label: "Ad_spend",
      _props: { scope: "col" },
    },
    {
      key: "impression",
      label: "Impressions",
      _props: { scope: "col" },
    },
    {
      key: "clicks",
      label: "Clicks",
      _props: { scope: "col" },
    },
    {
      key: "ctr",
      label: "CTR %",
      _props: { scope: "col" },
    },
    {
      key: "ecpm",
      label: "eCPM",
      _props: { scope: "col" },
    },
    {
      key: "ecpc",
      label: "eCPC",
      _props: { scope: "col" },
    },
  ];

  useEffect(() => {
    if (websiteData && websiteData.length > 0) {
      const tempData = websiteData.map((websiteData) => ({
        Website_url: websiteData.Website_url,
        ad_spend: numeral(websiteData.ad_spend).format("0,0.00"),
        impression: formatNumber(websiteData.impression),
        clicks: websiteData.clicks,
        ctr: numeral(
          (websiteData.clicks / websiteData.impression) * 100
        ).format("0.00"),
        ecpm: numeral(
          (websiteData.ad_spend / websiteData.impression) * 1000
        ).format("0,0.00"),
        ecpc:
          websiteData.clicks > 0
            ? numeral(websiteData.ad_spend / websiteData.clicks).format(
                "0,0.00"
              )
            : "N/A",
      }));

      setData(tempData);
    }
  }, [websiteData]);

  return (
    <CCard className="mb-4 position-relative">
      <CCardHeader>Website Summary</CCardHeader>
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
          {data &&
            data.length > 0 &&
            data.map((rowData, i) => (
              <CTableRow key={i}>
                {columns.map((column, j) => (
                  <CTableDataCell key={j}>{rowData[column.key]}</CTableDataCell>
                ))}
              </CTableRow>
            ))}
        </CTableBody>
      </CTable>
    </CCard>
  );
}

export default WebsiteSummaryTable;
