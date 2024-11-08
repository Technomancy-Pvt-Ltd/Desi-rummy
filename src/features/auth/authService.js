import axios from "axios";
// const API_URL = "/getWithdrawRequests";
const apiUrl = process.env.REACT_APP_API_BASE_URL;





const login = async (userData) => {

  const response = await axios.post(apiUrl + "/login", userData);

  if (response.data.status && response.data?.result?.privilage === 1) {
   
    localStorage.setItem("user", JSON.stringify(response.data));
  }

  return response.data;
};

//  Logout

const logout = () => localStorage.removeItem("user");
const authService = {
  login,
  logout,
};

export default authService;
