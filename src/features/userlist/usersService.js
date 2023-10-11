import axios from "axios";
const apiUrl = process.env.REACT_APP_API_BASE_URL+"/getUsers";
const GetUsers = async () => {
  const response = await axios.get(apiUrl);

  return response.data;
};

const usersService = {
  GetUsers,
};

export default usersService;
