import axios from "axios";

const apiUrl = process.env.REACT_APP_API_BASE_URL+"/getAllWithdrawRequestUsers";
const getPayoutList = async () => {
  const response = await axios.get(apiUrl);
  return response.data;
};

const PayoutListService = {
  getPayoutList,
};

export default PayoutListService;
