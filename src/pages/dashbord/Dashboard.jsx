import axios from "axios";
import React, { useEffect, useState } from "react";
import { FaRupeeSign } from "react-icons/fa";
import { toast } from "react-toastify";
import ExcelExportButton from "../../components/ExportExcle";
import { useDispatch, useSelector } from "react-redux";
import { getPayInList } from "../../features/PayInList/PayInListSlice";

function Dashboard() {
  const apiUrl = process.env.REACT_APP_API_BASE_URL + "/getInOutTotalAmount/";
  const [data, setData] = useState([]);
  const [Error, setError] = useState(null);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [isLoading, setIsLoading] = useState(true);
  const [Excledata, setExcleData] = useState([]);
  const { PayInLists } = useSelector((state) => state.PayInList);
  const dispatch = useDispatch();

  const AdminBalance = async (date) => {
    try {
      setIsLoading(true);
      const formattedDate = `${date.getFullYear()}-${String(
        date.getMonth() + 1
      ).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;

      const response = await axios.get(apiUrl + formattedDate);
      if (response.data && response.data.success === 1) {
      
        setData(response?.data?.data);
        setError(null);
      } else if (response.data.success === 2) {
        setError(response.data.message);
        setError("There has been no transition on this date");
        setData([]);
      }
    } catch (error) {
      setError(error);
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    dispatch(getPayInList());
  }, []);

  useEffect(() => {
    AdminBalance(selectedDate);
  }, [selectedDate]);

  useEffect(() => {
    if (Error == "There has been no transition on this date") {
      toast.success(Error);
    } else {
      toast.error(Error);
    }
  }, [Error]);

  let withdrawTotal = 0;
  let initiatedTotal = 0;
  data?.forEach((item) => {
    if (item.payment_status === "WITHDRAW_REQUEST_SETTLED") {
      withdrawTotal = item.total;
    } else if (item.payment_status === "PAYMENT_SUCCESS") {
      initiatedTotal = item.total;
    }
  });

  const TodayDate = () => {
    setSelectedDate(new Date());
  };

 

  return (
    <div className="container-fluid mt-5 " id="#home">
      <div className="container bg-gark d-flex align-items-center justify-content-between pe-5 mb-5 ">
        <div className="d-flex align-items-center justify-content-start w-50 mb-5">
          {" "}
          <button
            type="button"
            className="btn   text-light me-4 btnshadow bg-btn px-3"
            onClick={TodayDate}
          >
            Today
          </button>{" "}
          <span>
            <input
              type="date"
              id="inputPassword6"
              value={selectedDate.toISOString().substr(0, 10)}
              onChange={(e) => setSelectedDate(new Date(e.target.value))}
              className="htmlForm-control me-2 my-date-input"
              aria-describedby="passwordHelpInline"
            />
          </span>
        </div>
        <div className="mb-5">
          {" "}
          <ExcelExportButton data={PayInLists} />
        </div>
      </div>

      <div className="container-fluid text-center  ">
        <div className="row mb-3 mt-3">
          <div className="col col-12 col-md-6 text-center gap">
            <div
              className="  bg-light text-dark p-2"
              style={{ height: "200px" }}
            >
              <h5>Total Amount Deposited </h5>{" "}
              <span>
                ({" "}
                {`${selectedDate.getDate()}-${
                  selectedDate.getMonth() + 1
                }-${selectedDate.getFullYear()}`}
                )
              </span>
              <hr />
              <div className="d-flex align-items-center justify-content-center  ">
                {isLoading ? (
                  <div className="loader-i text-light mt-5 mx-auto  "></div>
                ) : (
                  <div className="chart fs-1 mt-5 text-success">
                    <FaRupeeSign />
                    {initiatedTotal}
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="col col-12 col-md-6 text-center">
            <div className="bg-light p-2 " style={{ height: "200px" }}>
              {" "}
              <h5>Total Amount Withdrawn</h5>
              <span>
                ({" "}
                {`${selectedDate.getDate()}-${
                  selectedDate.getMonth() + 1
                }-${selectedDate.getFullYear()}`}
                )
              </span>
              <hr />{" "}
              <div className="d-flex align-items-center justify-content-center  ">
                {isLoading ? (
                  <div className="loader-w text-light mt-5 mx-auto  "></div>
                ) : (
                  <div className="chart  fs-1 mt-5 text-danger ">
                    <FaRupeeSign />
                    {withdrawTotal}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
