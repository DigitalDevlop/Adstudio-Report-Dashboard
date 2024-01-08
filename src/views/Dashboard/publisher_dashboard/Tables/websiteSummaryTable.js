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

function PublisherWebsite({ websiteData }) {
  console.log("websiteData", websiteData);
  const [data, setData] = useState(null);

  const columns = [
    {
      key: "dimension",
      label: "website",
      _props: { scope: "col" },
    },
    {
      key: "request",
      label: "request",
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
      key: "publisher_earnings",
      label: "Earnings (LKR)",
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
    if (websiteData) {
      const tempData = websiteData.map((websiteData) => ({
        dimension: websiteData.dimension,
        request: numeral(websiteData.request).format("0,0.00"),
        impression: numeral(websiteData.impression).format("0,0.00"),
        clicks: websiteData.clicks,
        publisher_earnings: numeral(websiteData.publisher_earnings).format(
          "0,0.00"
        ),
        ctr: numeral(
          (websiteData.clicks / websiteData.impression) * 100
        ).format("0.00"),
        ecpm: numeral(
          (websiteData.publisher_earnings / websiteData.impression) * 1000
        ).format("0,0.00"),
        ecpc:
          websiteData.clicks > 0
            ? numeral(
                websiteData.publisher_earnings / websiteData.clicks
              ).format("0,0.00")
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

export default PublisherWebsite;
