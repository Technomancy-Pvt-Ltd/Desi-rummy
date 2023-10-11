import React, { useCallback, useEffect, useState } from "react";
import "./User.css";
import { GetUsers} from "../../features/userlist/usersSlice";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../components/Loader";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

function UserList() {
  const { isError, isLoading, users, message ,status} = useSelector(
    (state) => state.Users
  );

  const [searchName, setSearchName] = useState("");
  const [searchId, setSearchId] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const itemsPerPage = 8;
  const totalPages = Math.ceil(users?.length / itemsPerPage) || 1;  




  const searchUsers = useCallback(() => {
    const filteredUsers = users?.filter((user) => {
      const matchName = user.user_name
        .toLowerCase()
        .includes(searchName.toLowerCase());
      const matchId = user.mobile.toString().includes(searchId);
      return matchName && matchId;
    });
    setSearchResults(filteredUsers);
  }, [searchName, searchId, users]);

  useEffect(() => {
  
      dispatch(GetUsers());
    
 
    if (isError) {
      toast.error(message);
    
    }
    if (status === 2) {
      toast.error(message);
    }
  }, [dispatch, isError, message, status]);

  useEffect(() => {
    searchUsers();
  }, [searchUsers]);

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

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  const displayedUsers =
    searchResults.length > 0
      ? searchResults.slice(startIndex, endIndex)
      : users?.slice(startIndex, endIndex);

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


  return (
    <div className="container-fluid">
      <div className="users mt-3 px-5">
        <div className="  mb-3">
          <span className="btn btn-dark text-light bg-btn my-2 ">Users</span>
        </div>

        <div className="search-inputs ">
          <input
            type="text"
            className="rounded-pill border-0 p-2 text-center"
            placeholder="Search by User Name"
            value={searchName}
            onChange={(e) => setSearchName(e.target.value)}
          />

          <input
            type="text"
            className="rounded-pill border-0 ms-2 p-2 text-center"
            placeholder="Search by Mobile No."
            value={searchId}
            onChange={(e) => setSearchId(e.target.value)}
          />
        </div>

        <div className="row g-0 overflow-x-auto mt-3">
          <table className="table table-bordered table-secondary text-center table-hover">
            <thead>
              <tr className="table-active py-2">
                <th scope="col-8 usertable"> User Name</th>
                <th scope="col-1">Mail Id</th>
                <th scope="col-1">country Name</th>
                <th scope="col-1">mobile</th>
                <th scope="col-1">About</th>
              </tr>
            </thead>
            <tbody>
              {displayedUsers?.map((user) => {
                const { email_id, user_name, country_name, mobile, id } = user;
                return (
                  <tr key={id}>
                    <td>{user_name}</td>
                    <td>{email_id}</td>
                    <td>{country_name}</td>
                    <td>{mobile}</td>
                    <td>
                      <div
                        className="btn btn-dark"
                        onClick={() => navigate(`/UserInfo/${id}`)}
                      >
                        View
                      </div>
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

export default UserList;
