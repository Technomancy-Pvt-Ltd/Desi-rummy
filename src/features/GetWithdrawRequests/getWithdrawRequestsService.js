import axios from "axios";
const apiUrl = process.env.REACT_APP_API_BASE_URL
const GetAllWithdrawRequests = async (Id) => {
  const response = await axios.get(apiUrl+"/getWithdrawRequests" + `/${Id}`);

  return response.data;
};

export const getWithdrawRequestsService = {
  GetAllWithdrawRequests,
};
