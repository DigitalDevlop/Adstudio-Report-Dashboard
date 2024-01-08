import React, { useEffect, useState } from "react";
import SummaryTable from "../Tables/summaryTable";
import { useLocation } from "react-router-dom";
import CampaignDetails from "../Tables/Details_Tables/campaign-details";
import {
  apiGetCampaginDetails,
  getAdvertiserBannerSummary,
  getAdvertiserDailySummary,
  getAdvertiserWebsiteSummary,
} from "src/common/axiosCall";
import DailySummaryChart from "../Charts/details_Chart/dailySummaryChart";
import DetailsSummaryTable from "../Tables/Details_Tables/detailsSummaryTable";
import WebsiteSummaryTable from "../Tables/Details_Tables/websiteSummaryTable";
import BannerSummaryTable from "../Tables/Details_Tables/bannerTable";

// DSP Advertiser Dashboard Component
function DSPADashboard() {
  // Get current location using React Router
  const location = useLocation();

  // Extract campaignId from location state
  const campaignId = location?.state?.campaignId;

  // State variables to store campaign data, daily data, website data, and banner data
  const [campaignData, setCampaignData] = useState(null);
  const [dailyData, setDailyData] = useState(null);
  const [websiteData, setWebsiteData] = useState(null);
  const [bannerData, setBannerData] = useState(null);

  // Fetch data when the component mounts or when campaignId changes
  useEffect(() => {
    const fetchData = async () => {
      // Fetch campaign details, daily summary, website summary, and banner summary
      const res = await apiGetCampaginDetails(campaignId);
      const resDaily = await getAdvertiserDailySummary(campaignId);
      const resWebsite = await getAdvertiserWebsiteSummary(campaignId);
      const resBanner = await getAdvertiserBannerSummary(campaignId);
      console.log("banner Summary:", resBanner.data);

      // Update state variables with fetched data
      if (res.data) {
        setCampaignData(res.data[0]);
        console.log("res.data", res.data);
      }
      if (resDaily.data) {
        setDailyData(resDaily.data);
        console.log("resDaily.data", resDaily.data);
      }
      if (resWebsite.data) {
        setWebsiteData(resWebsite.data);
        console.log("resWebsite", resWebsite);
      }
      if (resBanner.data) {
        setBannerData(resBanner.data);
        console.log("resBanner", resBanner);
      }
    };

    // Call the fetchData function
    fetchData();
  }, [campaignId]);

  // Render campaign details, charts, and tables based on data availability
  return (
    <div>
      {campaignId ? (
        <div>
          {campaignData && <CampaignDetails campaignData={campaignData} />}
          {dailyData && <DailySummaryChart dailyData={dailyData} />}
          {dailyData && <DetailsSummaryTable dailyData={dailyData} />}
          {websiteData && <WebsiteSummaryTable websiteData={websiteData} />}
          {bannerData && <BannerSummaryTable bannerData={bannerData} />}
        </div>
      ) : (
        <h3>No Campaign Found!</h3>
      )}
    </div>
  );
}

export default DSPADashboard;
