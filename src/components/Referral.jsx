import React, { useEffect, useState } from "react";
import { Spinner } from "react-bootstrap";
import { toast } from "react-toastify";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { BsShareFill } from "react-icons/bs";
import { useGetProfileUser } from "../react-query";
import { useSelector } from "react-redux";
import { HTTP } from "../utils";
import moment from "moment";

const Referral = () => {
  const { userProfileResponse } = useGetProfileUser([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [transaction, setTransaction] = useState([]);
  const { userInfo } = useSelector((state) => state.auth);

  const configHeaders = {
    headers: {
      "content-type": "application/json",
      accept: "application/json",
      Authorization: `Bearer ${userInfo.token}`,
    },
  };

  const fetchData = () => {
    setIsLoading(true);
    HTTP.get(`/user/referral/${userInfo.data.id}?page=${currentPage}`, {
      ...configHeaders,
    })
      .then((response) => {
        setTransaction(response.data.data);
      })
      .catch((error) => {})
      .finally(() => {
        setIsLoading(false);
      });
  };

  useEffect(() => {
    fetchData();
  }, [userInfo.token, currentPage]);
  const fetchDataTransact = (page) => {
    setCurrentPage(page);
  };
  const renderPaginationLabel = (label) => {
    switch (label) {
      case "&laquo; Previous":
        return "Previous";
      case "Next &raquo;":
        return "Next";
      default:
        return label;
    }
  };
  const notify = async (copyMe) => {
    try {
      await navigator.clipboard.writeText(copyMe);
      toast("Copied!");
    } catch (err) {
      toast("Failed to copy!");
    }
  };

  const shareLink = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: "Check out MyLottoHub",
          text: "Join MyLottoHub and explore the exciting world of lotteries!",
          url: `https://www.mylottohub.com/register?user=${userProfileResponse?.id}`,
        });
      } catch (error) {
        console.error("Error sharing:", error);
        toast("Error sharing link");
      }
    } else {
      console.warn("Share API not supported, implement custom sharing logic");
      toast("Share API not supported");
    }
  };
  return (
    <React.Fragment>
      <Navbar />
      <div className="container mt-5">
        <h5 className="fw-bold mb-3"></h5>
        <p>Want to refer a friend? Please copy your referral link below.</p>
        {isLoading ? (
          <div className="spinner text-dark text-center mt-5">
            <Spinner
              as="span"
              animation="border"
              size="sm"
              role="status"
              aria-hidden="true"
            />
          </div>
        ) : (
          <div className="row">
            <div className="col-7 mb-3">
              <input
                id="foo"
                type="text"
                value={`https://www.mylottohub.com/register?user=${userProfileResponse?.id}`}
                className="form-control p-2"
                readOnly=""
                disabled
              />
            </div>
            <div className="col-5">
              <button
                style={{ background: "#27AAE1" }}
                className="btn p-2 text-white  btn-copy"
                data-clipboard-action="copy"
                data-clipboard-target="#foo"
                onClick={() =>
                  notify(
                    `https://www.mylottohub.com/register?user=${userProfileResponse?.id}`
                  )
                }
              >
                Copy Link
              </button>{" "}
              <i
                className="btn p-2 text-white  btn-copy"
                style={{ background: "#27AAE1" }}
                onClick={shareLink}
              >
                {" "}
                <BsShareFill />
              </i>
            </div>

            {transaction.total === 0 ? (
              <div className="d-flex justify-content-center text-center p-5">
                <div className="hidden-xs hidden-sm mx-auto">
                  <div className="alert alert-danger text-center" role="alert">
                    No Record Found
                  </div>
                </div>
              </div>
            ) : (
              <div className="table-responsive">
                <table className="table table-express table-hover mt-4">
                  <tbody>
                    <tr>
                      <th>USERNAME</th>
                      <th>SIGNUP DATE</th>
                      <th>STATUS</th>
                    </tr>
                  </tbody>
                  {transaction?.data?.map((record, index) => (
                    <>
                      <tbody>
                        <tr key={index} className="transact table-light">
                          <td className="text-capitalize">
                            {record?.username}
                          </td>
                          <td>
                            {moment(record?.created_at).format(
                              "Do MMMM YYYY h:mmA"
                            )}
                          </td>
                          <td className="text-capitalize">{record?.funded}</td>
                        </tr>
                      </tbody>
                    </>
                  ))}
                </table>
              </div>
            )}
            <nav aria-label="Page navigation example">
              <ul className="pagination">
                {transaction?.links?.map((link, index) => (
                  <div key={index}>
                    <li className={`page-item ${link?.active ? "active" : ""}`}>
                      <a
                        className="page-link"
                        href={link?.url}
                        onClick={(e) => {
                          e.preventDefault();
                          fetchDataTransact(link?.label);
                        }}
                      >
                        {renderPaginationLabel(link?.label)}
                      </a>
                    </li>
                  </div>
                ))}
              </ul>
            </nav>
          </div>
        )}
      </div>
      <Footer />
    </React.Fragment>
  );
};

export default Referral;
