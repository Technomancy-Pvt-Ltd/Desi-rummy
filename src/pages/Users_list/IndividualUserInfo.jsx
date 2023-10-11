import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { GetUsers } from "../../features/userlist/usersSlice";
import {
  GetAllWithdrawRequests,
  Wreset,
} from "../../features/GetWithdrawRequests/getWithdrawRequestsSlice";
import {
  SettelWithdrawRequest,
  reset,
} from "../../features/settelWithdrawRequest/SettelWithdrawSlice";
import Loder from "../../components/Loader";
import { toast } from "react-toastify";
import BackButton from "../../components/BackButton";
import { BiCopy } from "react-icons/bi";
import { FaAngleDoubleDown, FaRupeeSign } from "react-icons/fa";
import axios from "axios";
function IndividualUserInfo() {
  const { isLoading, users } = useSelector((state) => state.Users);
  const { WisError, WisLoading, AllWithdrawRequests, Wmessage, Wstatus } =
    useSelector((state) => state.AllWithdrawRequests);
  const { Settelmessage, SetteisLoading, Success, isError } = useSelector(
    (state) => state.SettelWithdrawRequest
  );

  const [bal, setBal] = useState();
  const dispatch = useDispatch();
  const params = useParams();
  const userId = params.id;

  const apiUrl = process.env.REACT_APP_API_BASE_URL + "/getWalletAmount/";

  const totalBal = async (id) => {
    try {
      const response = await axios.get(apiUrl + id);

      if (response.data && response.data.success === 1) {
        setBal(response.data);
      }
      if (response.data.success === 2) {
        setBal(response.data.message);
      }
    } catch (error) {
      setBal(error);
    }
  };

  useEffect(() => {
    totalBal(params.id);
    if (users.length === 0) {
      dispatch(GetUsers());
    }

    dispatch(GetAllWithdrawRequests(params.id));
  }, [userId, Success]);

  useEffect(() => {
    if (isError) {
      toast.error(Settelmessage);
      dispatch(GetAllWithdrawRequests(params.id));
    }
    if (Success === 1) {
      toast.success(Settelmessage);
      dispatch(reset());
    }

    if (Success === 2) {
      toast.error(Settelmessage);
      dispatch(reset());
    }
    if (WisError) {
      toast.error(Wmessage);
      dispatch(GetAllWithdrawRequests(params.id));
      dispatch(Wreset());
    }
  }, [Settelmessage, Wstatus, WisError, Success, isError, Wmessage, dispatch]);

  var individualUser = {};

  if (users && users.length) {
    individualUser = users.find((it) => it.id == userId);
  }

  const navigate = useNavigate();

  const paragraphRef = useRef(null);
  const paragraphRef2 = useRef(null);
  const paragraphRef3 = useRef([]);
  const paragraphRef4 = useRef(null);

  const handleWithdraw = (data) => {
    const Wdata = {
      user_id: data.user_id,
      transaction_id: data.transaction_id,
      amount: data.amount,
    };

    if (Wdata) {
      dispatch(SettelWithdrawRequest(Wdata));
    }
  };

  const copyParagraph = () => {
    const paragraphText = paragraphRef.current.innerText;

    const tempElement = document.createElement("textarea");
    tempElement.value = paragraphText;
    document.body.appendChild(tempElement);

    tempElement.select();
    document.execCommand("copy");
    document.body.removeChild(tempElement);

    toast("Unique ID copied!");
  };

  const copyParagraph3 = (index) => {
    const paragraphText3 = paragraphRef3.current[index].innerText;
    const tempElement3 = document.createElement("textarea");
    tempElement3.value = paragraphText3;
    document.body.appendChild(tempElement3);

    tempElement3.select();
    document.execCommand("copy");
    document.body.removeChild(tempElement3);
    toast("Transaction ID copied!");
  };

  const copyParagraph4 = () => {
    const paragraphText4 = paragraphRef4.current.innerText;

    const tempElement4 = document.createElement("textarea");
    tempElement4.value = paragraphText4;
    document.body.appendChild(tempElement4);

    tempElement4.select();
    document.execCommand("copy");
    document.body.removeChild(tempElement4);
    toast("Unique ID copied!!");
  };

  if (isLoading) {
    return <Loder />;
  }






  return (
    <>
      <div
        className="container min-vh-100 page-content page-container pb-5 pt-2"
        id="page-content"
      >
        <div className="container">
          <div className="row container d-flex justify-content-center align-items-center mx-auto ">
            <div className="col-xl-12 col-md-12 ">
              <div className="my-2">
                <BackButton url={"/users"} />
              </div>
              <div className="card user-card-full">
                <div className="row m-l-0 m-r-0">
                  <div className="col-sm-6 ">
                    <div className="card-block ">
                      <h5 className="m-b-20 p-b-5 b-b-default  f-w-800">
                        User Information
                      </h5>

                      <div className="row">
                        <div className="col-3 m-b-10 f-w-600 text-start">
                          Name
                        </div>
                        <div className="col-1">:</div>
                        <div className="col-4">
                          <p className="f-w-600">{individualUser.user_name}</p>
                        </div>
                      </div>

                      <hr />

                      <div className="row">
                        <div className="col-3 m-b-10 f-w-600 text-start">
                          Unique ID
                        </div>
                        <div className="col-1">:</div>
                        <div className="col-4 d-flex">
                          <p ref={paragraphRef} className="f-w-600 me-5">
                            {individualUser.id}
                          </p>
                          <div className="fs-5 pb-1 ">
                            <BiCopy
                              className="copy-btn"
                              onClick={copyParagraph}
                            />
                          </div>
                        </div>
                      </div>

                      <hr />
                 
                      <div className="row">
                        <div className="col-3 m-b-10 f-w-600 text-start">
                        WalletBal
                        </div>
                        <div className="col-1">:</div>
                        <div className="col-4 d-flex">
                          <p className="f-w-600 me-5" ref={paragraphRef2}>
                            <FaRupeeSign />
                            {bal?.walletBal}
                          </p>
                        </div>
                      </div>

                      <div className="row">
                        <div className="col-3 m-b-10 f-w-600 text-start">
                        WinWallet
                        </div>
                        <div className="col-1">:</div>
                        <div className="col-4 d-flex">
                          <p className="f-w-600 me-5" ref={paragraphRef2}>
                            <FaRupeeSign />
                            {bal?.winWallet}
                          </p>
                        </div>
                      </div>
                      <hr />
                      <div className="row">
                        <div className="col-3 m-b-10 f-w-600 text-start">
                          Total Amount
                        </div>
                        <div className="col-1">:</div>
                        <div className="col-4 d-flex">
                          <p className="f-w-600 me-5" ref={paragraphRef2}>
                            <FaRupeeSign />
                            {bal?.walletBal+bal?.winWallet}
                          </p>
                        </div>
                      </div>
                   
                    </div>
                  </div>
                  <div className="col-sm-3 mt-3 pe-5 text-center">
                    <h5>Click here to get All</h5>
                    <div className="fs-1">
                      <FaAngleDoubleDown />
                    </div>
                    <button
                      className="btn main-bg text-light fs-5 mt-3 main-btn "
                      onClick={() =>
                        navigate(`/PreviousTransaction/${individualUser.id}`)
                      }
                    >
                      previous Transaction
                    </button>
                  </div>
                  <div className="col-sm-3 bg-c-lite-green user-profile w-25">
                    <div className="card-block text-center text-white">
                      <div className="m-b-25">
                        <img
                          src="https://img.icons8.com/bubbles/100/000000/user.png"
                          className="img-radius"
                          alt="User Profile"
                        />
                      </div>

                      <i className=" mdi mdi-square-edit-outline feather icon-edit m-t-10 f-16"></i>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="container  text-center   px-5">
              <h5 className="m-b-20 p-b-5 b-b-default text-white py-2  text-center f-w-800">
                Withdraw Requests
              </h5>{" "}
              {SetteisLoading ? (
                <div className="text-light ms-5 text-center">
                  <span>
                    Please do not refresh the page and wait while we are
                    processing your payment.
                  </span>{" "}
                  <span></span>
                </div>
              ) : (
                ""
              )}
              {WisLoading || SetteisLoading ? (
                <div className="loader-m text-light mt-5 mx-auto  "></div>
              ) : AllWithdrawRequests && AllWithdrawRequests.length > 0 ? (
                AllWithdrawRequests.map((user, index) => {
                  const { amount, transaction_id, createdAt, user_id, id } =
                    user;

                  return (
                    <div className="col-xl-12 col-md-12 " key={id}>
                      <div className="card user-card-full ">
                        <div className="row m-l-0 m-r-0">
                          <div className="col-sm-12 ">
                            <h6 className="p-3 text-start ">({index + 1})</h6>
                            <div className="card-block mx-5  px-5">
                              <div className="Deposit-card">
                                <div className="text-center ">
                                  <div className="row">
                                    <div className="col-4 m-b-10 f-w-600 text-center">
                                      Date
                                    </div>
                                    <div className="col-1">:</div>
                                    <div className="col-7">
                                      <p className="f-w-600 text-start">
                                        {
                                          new Date(createdAt)
                                            .toISOString()
                                            .split("T")[0]
                                        }
                                      </p>
                                    </div>
                                  </div>
                                  <hr />
                                  <div className="row">
                                    <div className="col-4 m-b-10 f-w-600 text-center">
                                      Transaction ID
                                    </div>
                                    <div className="col-1">:</div>
                                    <div className="col-7 d-flex">
                                      <p
                                        className="f-w-600 me-5"
                                        ref={(el) =>
                                          (paragraphRef3.current[index] = el)
                                        }
                                      >
                                        {transaction_id}
                                      </p>
                                      <div className="fs-5 pb-1">
                                        <BiCopy
                                          className="copy-btn"
                                          onClick={() => copyParagraph3(index)}
                                        />
                                      </div>
                                    </div>
                                  </div>
                                  <hr />
                                  <div className="row">
                                    <div className="col-4 m-b-10 f-w-600 text-center">
                                      Unique ID
                                    </div>
                                    <div className="col-1">:</div>
                                    <div className="col-7 d-flex">
                                      <p
                                        className="f-w-600 me-5"
                                        ref={paragraphRef4}
                                      >
                                        {user_id}
                                      </p>
                                      <div className="fs-5 pb-1">
                                        <BiCopy
                                          className="copy-btn"
                                          onClick={copyParagraph4}
                                        />
                                      </div>
                                    </div>
                                  </div>
                                  <hr />

                                  <div className="row">
                                    <div className="col-4 m-b-10 f-w-600 text-center">
                                      Amount
                                    </div>
                                    <div className="col-1">:</div>
                                    <div className="col-4">
                                      <p className="f-w-600 text-start">
                                        <FaRupeeSign />
                                        {"  "}
                                        {amount}
                                      </p>
                                    </div>
                                  </div>
                                  <hr />
                                </div>

                                <div className="form-check text-center">
                                  <button
                                    className="btn main-bg text-light  ms-5 main-btn mt-2"
                                    onClick={() => handleWithdraw(user)}
                                  >
                                    Deposit
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>
                          {/* <div className="col-sm-4 user-profile w-25">
                            <div className="card-block text-center text-white">
                              <div className="m-b-25">
                                <img
                                  src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c6/QR_Code_Model_1_Example.svg/2048px-QR_Code_Model_1_Example.svg.png"
                                  className="img-radius1"
                                  alt="User Profile"
                                />
                              </div>

                              <i className=" mdi mdi-square-edit-outline feather icon-edit m-t-10 f-16"></i>
                            </div>
                          </div> */}
                        </div>
                      </div>
                    </div>
                  );
                })
              ) : (
                <h2 className="text-light mt-5 mx-auto bg-success d-inline">
                  There are no pending withdrawal requests.
                </h2>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default IndividualUserInfo;
