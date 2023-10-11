import axios from "axios"

const apiUrl = process.env.REACT_APP_API_BASE_URL+"/getUserTransactions";
const GetAllUserTransactions = async (Id) => {

     const response = await axios.get(apiUrl+`/${Id}`)
 
    return response.data
   
 }





export const UserTransactionService ={
    GetAllUserTransactions
}