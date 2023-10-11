import React, { useEffect, useState } from "react";
import "../Users_list/User.css";
import { getPayInList } from "../../features/PayInList/PayInListSlice";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../components/Loader";
import { toast } from "react-toastify";
import { FaRupeeSign } from "react-icons/fa";

function PayInQueue() {
  const { isError, isLoading, PayInLists, message } = useSelector(
    (state) => state.PayInList
  );

  const [currentPage, setCurrentPage] = useState(1);

  const dispatch = useDispatch();

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const nextPage = () => {
    if (currentPage !== totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prePage = () => {
    if (currentPage !== 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  useEffect(() => {
    dispatch(getPayInList());
    if (isError) {
      toast.error(message);
    
    }
  }, [dispatch ,isError,message]);

  if (isLoading) {
    return (
      <div
        className="d-flex justify-content-center align-items-center"
        style={{ height: "100vh" }}
      >
        <div className="m-auto my-auto w-25 ">
          <Loader />
        </div>
      </div>
    );
  }



  
  const filteredData = PayInLists?.filter(
    (item) => item.payment_status === "PAYMENT_SUCCESS"
  );


  const itemsPerPage = 8;
  const totalPages = Math.ceil(filteredData?.length / itemsPerPage) || 1;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  const reversedArray = filteredData?.slice().reverse();
  const displayedUsers = reversedArray?.slice(startIndex, endIndex);

  const pageNumbers = [];

  if (totalPages <= 6) {
    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(i);
    }
  } else if (currentPage <= 4) {
    pageNumbers.push(1, 2, 3, totalPages);
  } else if (currentPage >= totalPages - 3) {
    pageNumbers.push(
      1,
      totalPages - 4,
      totalPages - 3,
      totalPages - 2,
      totalPages - 1,
      totalPages
    );
  } else {
    pageNumbers.push(
      1,
      currentPage - 1,
      currentPage,
      currentPage + 1,
      totalPages
    );
  }


  return (
    <div className="container-fluid">
      <div className="users mt-3 px-5">
        <div className="  mb-3">
          <span className="btn btn-dark text-light bg-btn my-3">
            All Recived Payment List
          </span>
        </div>

        <div className="row g-0 overflow-x-auto mt-3">
          <table className="table table-bordered table-secondary text-center table-hover">
            <thead>
              <tr className="table-active py-2">
                <th scope="col-8 usertable"> User Name</th>
                <th scope="col-1"> User Id</th>
                <th scope="col-1">Date </th>
                <th scope="col-1">Time </th>
                {/* <th scope="col-1">Mobile No</th> */}
                <th scope="col-1">Transaction Id</th>  
                <th scope="col-1">Amount</th>
              </tr>
            </thead>
            <tbody>
              {displayedUsers?.map((user) => {
                const { transaction_id, user_name,mobile, createdAt, amount, id } =
                  user;
                return (
                  <tr  key={transaction_id}>
                    <td className="py-3">{user_name}</td>
                    <td>{id}</td>
                    <td>{new Date(createdAt).toISOString().split("T")[0]}</td>
                    <td>{ new Date(createdAt).toLocaleString('en-IN', { timeZone: 'Asia/Kolkata', hour12: true, hour: 'numeric', minute: 'numeric' })}</td>
                    {/* <td>{mobile}</td> */}
                    <td>{transaction_id}</td>
                   
                    <td>
                      <FaRupeeSign /> {"  "}
                      {amount}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <nav>
          <ul className="pagination">
            <li className="page-item">
              <button
                type="button"
                className="page-link"
                onClick={prePage}
                disabled={currentPage === 1}
              >
                Prev
              </button>
            </li>
            {pageNumbers.map((n) => (
              <li
                className={`page-item ${currentPage === n ? "active" : ""}`}
                key={n}
              >
                <button
                  type="button"
                  className="page-link"
                  onClick={() => handlePageChange(n)}
                >
                  {n}
                </button>
              </li>
            ))}
            <li className="page-item">
              <button
                type="button"
                className="page-link"
                onClick={nextPage}
                disabled={currentPage === totalPages}
              >
                Next
              </button>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
}

export default PayInQueue;
