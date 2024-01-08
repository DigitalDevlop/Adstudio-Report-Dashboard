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
import { formatNumber } from "../../advertiser_Dashbord/utils";

function PublisherSummaryTable({ summaryData }) {
  console.log("summaryData", summaryData);
  const [data, setData] = useState(null);
  const [labels, setLabels] = useState(null);

  const columns = [
    {
      key: "date",
      label: "Date",
      _props: { scope: "col" },
    },
    {
      key: "request",
      label: "Request",
      _props: { scope: "col" },
    },
    {
      key: "impressions",
      label: "Impressions",
      _props: { scope: "col" },
    },
    {
      key: "clicks",
      label: "Clicks",
      _props: { scope: "col" },
    },
    {
      key: "publisher_earnings",
      label: "Earnings",
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
    if (summaryData && summaryData.length > 0) {
      const tempData = summaryData.map((summaryData) => ({
        date: summaryData.date,
        request: numeral(summaryData.request).format("0,0.00"),
        impressions: formatNumber(summaryData.impressions),
        clicks: summaryData.clicks,
        publisher_earnings: numeral(summaryData.publisher_earnings).format(
          "0.00"
        ),
        ctr: numeral(
          (summaryData.clicks / summaryData.impressions) * 100
        ).format("0.00"),
        ecpm: numeral(
          (summaryData.publisher_earnings / summaryData.impressions) * 1000
        ).format("0,0.00"),
        ecpc:
          summaryData.clicks > 0
            ? numeral(
                summaryData.publisher_earnings / summaryData.clicks
              ).format("0,0.00")
            : "N/A",
      }));

      setData(tempData);
    }
  }, [summaryData]);

  return (
    <CCard className="mb-4 position-relative">
      <CCardHeader>Daily Summary</CCardHeader>
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

export default PublisherSummaryTable;
