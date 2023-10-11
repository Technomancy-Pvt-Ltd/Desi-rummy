import React, { useCallback, useEffect } from "react";
import { useState } from "react";
import BackButton from "../../components/BackButton";
import { useDispatch, useSelector } from "react-redux";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { toast } from "react-toastify";
import Loader from "../../components/Loader";
import {
  GetAllUserTransactions,
  reset,
} from "../../features/UserTransition/UserTransactionSlice";
import { useParams } from "react-router-dom";
import { FaRupeeSign } from "react-icons/fa";

function PreviousTransaction() {
  const {
    isError,
    isLoading,
    AllUserTransaction,
    message,
    isSuccess,
    success,
  } = useSelector((state) => state.AllTransaction);

  const [currentPage, setCurrentPage] = useState(1);
  const dispatch = useDispatch();
  const [searchId, setSearchId] = useState("");
  const [searchResults, setSearchResults] = useState([]);
 
  const params = useParams();
  const userId = params.id;

  const filteredData = AllUserTransaction?.filter(
    (item) => item.payment_status !== "PAYMENT_INITIATED"
  );
  const reversedArray = filteredData?.slice().reverse();

  const searchUsers = useCallback(() => {
    const filteredUsers = reversedArray?.filter((user) => {
      const matchId = user.transaction_id.toString().includes(searchId);
      return matchId;
    });
    setSearchResults(filteredUsers);
  }, [AllUserTransaction, searchId]);

  useEffect(() => {
    dispatch(GetAllUserTransactions(userId));

    if (isError) {
      toast.error(message);
      dispatch(reset());
    }
  }, [dispatch, isError, success, message, userId]);

  useEffect(() => {
    searchUsers();
  }, [searchId, searchUsers]);

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



  const itemsPerPage = 7;
  const totalPages = Math.ceil(filteredData?.length / itemsPerPage) || 1;

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

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
 

  const AllUserTransactions =
    searchResults?.length > 0
      ? searchResults?.slice(startIndex, endIndex)
      : reversedArray?.slice(startIndex, endIndex);

  const pageNumbers = [];

  if (totalPages <= 7) {
    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(i);
    }
  } else if (currentPage <= 4) {
    pageNumbers.push(1, 2, 3, 4, 5, totalPages);
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
    <div className="container">
      <div className="mb-1 mt-3">
        <BackButton url={`/UserInfo/${userId}`} />
      </div>
      <div className=" wrapper-t rounded">
        <div className="container d-flex justify-content-between">
          <nav className="navbar-t navbar-expand-lg navbar-dark dark d-lg-flex align-items-lg-start">
            <a className="navbar-brand" href="blank">
              Transactions
              <p className="text-muted pl-1">Welcome to your transactions</p>
            </a>
            <button
              className="navbar-toggler"
              type="button"
              data-toggle="collapse"
              data-target="#navbarNav"
              aria-controls="navbarNav"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav"></div>
          </nav>
          <div className="search-inputs mt-2">
            <input
              type="text"
              className="rounded-pill border-0 ms-2 p-2 text-center"
              placeholder="Search by transaction ID"
              value={searchId}
              onChange={(e) => setSearchId(e.target.value)}
            />
          </div>
        </div>

        {isSuccess && AllUserTransactions?.length > 0 ? (
          <div className="table-responsive mt-3 px-5">
            <table className="table table-bordered table-secondary table-hover">
              <thead>
                <tr>
                  <th scope="col" className="ps-4">
                    Payment Status
                  </th>
                  <th scope="col">Transaction ID</th>
                  <th scope="col">Date</th>
                  <th scope="col">Time</th>
                  <th scope="col " className="text-end pe-4">
                    Amount
                  </th>
                </tr>
              </thead>
              <tbody>
                {AllUserTransactions.map((user) => {
                  const {
                    id,
                    payment_status,
                    transaction_id,
                    createdAt,
                    amount,
                  } = user;
                  return (
                    <tr key={id}>
                      <td className="ps-4 py-3">
                        <span className="fa fa-exchange mr-1"></span>{" "}
                        {payment_status}
                      </td>
                      <td>
                        <span className="">{transaction_id}</span>
                      </td>
                      <td className="text-muted">
                        {new Date(createdAt).toISOString().split("T")[0]}
                      </td>
                      <td>{ new Date(createdAt).toLocaleString('en-IN', { timeZone: 'Asia/Kolkata', hour12: true, hour: 'numeric', minute: 'numeric' })}</td>
                      
                      <td className="d-flex justify-content-end align-items-center py-3  pe-4">
                        <span  
                         className={`fa ${
                          payment_status === "PAYMENT_SUCCESS"
                            ? " fa-long-arrow-down"
                            : payment_status === "WITHDRAW_REQUEST_SETTELED"
                            ? "fa-long-arrow-up"
                            : payment_status === "WITHDRAW_REQUEST"
                            ? " fa-arrow-circle-up"
                            : payment_status === "PAYMENT_ERROR"
                            ? "fa-exclamation-circle text-danger"
                            : ""
                        }`}
                        ></span>

                        <span>
                          
                          <FaRupeeSign /> {amount}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="d-flex justify-content-center align-items-center mt-3">
            <p className="text-light fs-5">{message}</p>
          </div>
        )}

        <div className="d-flex justify-content-between align-items-center results">
          <div className="pt-3 m-auto">
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
      </div>
    </div>
  );
}

export default PreviousTransaction;
