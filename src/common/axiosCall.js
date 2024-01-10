import axios from "axios";

// Base URL for API
const API_URL = process.env.REACT_APP_API_URL;

// Default axios instance without authentication
const instance = axios.create({
  baseURL: API_URL,
  timeout: 5000,
  headers: {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
  },
});

// Retrieve authentication data from sessionStorage
// let data = sessionStorage.getItem("authData");

// const authData = JSON.parse(data);
// let athToken = authData?.token || "";
// const token = athToken;

// Authenticated axios instance
// const authInstance = axios.create({
//   baseURL: API_URL,

//   headers: {
//     Authorization: `${token}`,
//     "Content-Type": "application/json",
//   },
// });

const token = () => {
  let sessionData = sessionStorage.getItem("authData");
  const authData = JSON.parse(sessionData);
  return authData?.token || "";
};

// Function to create an authenticated axios instance
const authInstance = () => {
  const authToken = token();

  return axios.create({
    baseURL: API_URL,
    headers: {
      Authorization: `${authToken}`,
      "Content-Type": "application/json",
    },
  });
};

// Another axios instance without authentication
const Rinstance = axios.create({
  baseURL: API_URL,
  timeout: 5000,
  headers: {
    "Content-Type": "application/json",
  },
});

// Authentication API - Login
export const authLogin = async (data) => {
  try {
    const response = await instance.post("/user/login", data);

    console.log("Response Data:", response.data);

    if (response.data) {
      // Serialize the object to JSON and store it in sessionStorage
      sessionStorage.setItem("authData", JSON.stringify(response.data));
    }
    console.log("Response Data:", response.data.token);

    return response;
  } catch (error) {
    throw error;
  }
};
// Authentication API - logout
export const authLogout = async () => {
  try {
    // const response = await authInstance().get("/auth/logout");

    // console.log("Response Data:", response.data);
    sessionStorage.removeItem("authData");
    return {
      status: 200,
    };
    // return response;
  } catch (error) {
    throw error;
  }
};

// API for getting summary data in advertiser page
export const apiGetSummary = async (data) => {
  try {
    const response = await authInstance().get(
      `/3/dsp/summary?from=${data.fromDate}&to=${data.toDate}`,
      data
    );

    console.log("Response Data:", response.data);

    return response;
  } catch (error) {
    throw error;
  }
};

// API for getting summary campagin data in advertiser page
export const apiGetCampaginDetails = async (params) => {
  try {
    const response = await authInstance().get(
      `/3/dsp/detail/?campaignId=${params}`
    );
    console.log("response.data2", response.data);
    return response;
  } catch (error) {
    throw error;
  }
};

// API for getting Daily Summary data in advertiser page
export const getAdvertiserDailySummary = async (campaignId) => {
  try {
    const response = await authInstance().get(
      `/3/dsp/daily/?campaignId=${campaignId}`
    );
    console.log("response.data3", response.data);
    return response;
  } catch (error) {
    throw error;
  }
};

// API for getting Website Summary data in advertiser page
export const getAdvertiserWebsiteSummary = async (campaignId) => {
  try {
    const response = await authInstance().get(
      `/3/dsp/website/?campaignId=${campaignId}`
    );
    console.log("response.data4", response.data);
    return response;
  } catch (error) {
    throw error;
  }
};

// API for getting Banner Summary data in advertiser page
export const getAdvertiserBannerSummary = async (campaignId) => {
  try {
    const response = await authInstance().get(
      `/3/dsp/banner/?campaignId=${campaignId}`
    );
    console.log("response.data5", response.data);
    return response;
  } catch (error) {
    throw error;
  }
};

// API for getting Summary data in Publisher page
export const getPublisherSummary = async (data) => {
  try {
    const response = await authInstance().get(
      `/2/ssp/summary?from=${data.fromDate}&to=${data.toDate}`,
      data
    );

    console.log("Response Data6:", response.data);

    return response;
  } catch (error) {
    throw error;
  }
};

// API for getting Website Summary data in Publisher page
export const getPublisherWebsiteSummary = async (data) => {
  try {
    const response = await authInstance().get(
      `/2/ssp/summary?groupBy=website&from=${data.fromDate}&to=${data.toDate}`
    );
    console.log("response.data4", response.data);
    return response;
  } catch (error) {
    throw error;
  }
};

// API for getting Stats data in Publisher page
export const getPublisherStats = async (data) => {
  try {
    const response = await authInstance().get(
      `/2/stats?from=${data.fromDate}&to=${data.toDate}`
    );
    console.log("response.data4", response.data);
    return response;
  } catch (error) {
    throw error;
  }
};

// API for getting register data
export const authRegister = async (data) => {
  try {
    const response = await Rinstance.post("/user/register", data);

    console.log("Response Data:", response.data);

    if (response.data) {
      // Serialize the object to JSON and store it in sessionStorage
      sessionStorage.setItem("RData", JSON.stringify(response.data));
    }

    return response;
  } catch (error) {
    throw error;
  }
};

const API_BASE_URL = "https://dashboard-api.adstudio.cloud/api";

export const fetchPublishers = async (token) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/2/accounts`, {
      headers: {
        Authorization: `${token}`, // Include the token in the Authorization header
      },
    });
    const publisherData = response.data; // Assuming the API response is an array of objects with publisher names
    // Extract publisher names
    return publisherData;
  } catch (error) {
    console.error("Error fetching publishers:", error);
    throw error;
  }
};

const API_BASE_URL2 = "https://dashboard-api.adstudio.cloud/api";
export const fetchAdvetisers = async (token) => {
  try {
    const response = await axios.get(`${API_BASE_URL2}/3/accounts`, {
      headers: {
        Authorization: `${token}`, // Include the token in the Authorization header
      },
    });
    const advertiserData = response.data;

    return advertiserData;
  } catch (error) {
    console.error("Error fetching advertisers:", error);
    throw error;
  }
};

const API_BASE_URL3 = "https://dashboard-api.adstudio.cloud/api";
export const fetchAdvetisersCampaigns = async (token, advertiserId) => {
  try {
    const response = await axios.get(`${API_BASE_URL3}/3/dsp/summary`, {
      headers: {
        Authorization: ` ${token}`, // Include the token in the Authorization header
      },
      params: {
        advertiserId: advertiserId,
      },
    });
    const advertiserCampaignsData = response.data;
    return advertiserCampaignsData;
  } catch (error) {
    console.error("Error fetching advertiserCampaigns:", error);
    throw error;
  }
};

export default instance;
