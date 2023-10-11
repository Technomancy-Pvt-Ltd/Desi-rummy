import axios from "axios";

const apiUrl = process.env.REACT_APP_API_BASE_URL+"/getAllUsersTransaction"
const getPayInList = async () => {
 
  const response = await axios.get(apiUrl);

  return response.data;
};

const PayInListService = {
  getPayInList,
};

export default PayInListService;
