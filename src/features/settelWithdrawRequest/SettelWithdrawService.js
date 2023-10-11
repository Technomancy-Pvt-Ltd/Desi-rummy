import axios from "axios";

const apiUrl = process.env.REACT_APP_API_BASE_URL+"/settelWithdrawRequest";
const SettelWithdrawRequest = async (Data) => {

  const response = await axios.post(apiUrl, Data);

  return response.data;
};

export const SettelWithdrawRequestService = {
  SettelWithdrawRequest,
};
