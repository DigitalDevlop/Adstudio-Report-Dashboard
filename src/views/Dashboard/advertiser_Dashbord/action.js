import { apiGetStats } from "../../../common/axiosCall";

export const stats = async (data, callback) => {
  try {
    const response = await apiGetStats(data);

    if (response.status === 200) {
      console.log("stats successful");
      if (callback) callback(200);
    } else {
      console.error("stats failed. Please check your credentials.");
      if (callback) callback(response.status);
    }
  } catch (error) {
    console.error("An error occurred while making the stats request.", error);
    if (callback) callback(500);
  }
};
