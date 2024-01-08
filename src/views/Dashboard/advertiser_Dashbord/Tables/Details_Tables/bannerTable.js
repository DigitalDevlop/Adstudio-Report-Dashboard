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

function BannerSummaryTable({ bannerData }) {
  const [data, setData] = useState(null);
  const [labels, setLabels] = useState(null);

  // "banner_name": "160X600",
  // "impression": 5978,
  // "clicks": 3,
  // "ad_spend": 298.9
  const columns = [
    {
      key: "banner_name",
      label: "Banner_name",
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
    if (bannerData && bannerData.length > 0) {
      const tempData = bannerData.map((bannerData) => ({
        banner_name: bannerData.banner_name,
        ad_spend: numeral(bannerData.ad_spend).format("0,0.00"),
        impression: formatNumber(bannerData.impression),
        clicks: bannerData.clicks,
        ctr: numeral((bannerData.clicks / bannerData.impression) * 100).format(
          "0.00"
        ),
        ecpm: numeral(
          (bannerData.ad_spend / bannerData.impression) * 1000
        ).format("0,0.00"),
        ecpc:
          bannerData.clicks > 0
            ? numeral(bannerData.ad_spend / bannerData.clicks).format("0,0.00")
            : "N/A",
      }));

      setData(tempData);
    }
  }, [bannerData]);

  return (
    <CCard className="mb-4 position-relative">
      <CCardHeader>Banner Summary</CCardHeader>
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

export default BannerSummaryTable;
