import React from "react";
import { Spinner } from "react-bootstrap";
import { toast } from "react-toastify";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { BsShareFill } from "react-icons/bs";
import { useGetProfileUser, useGetReferral } from "../react-query";

const Referral = () => {
  const { userProfileResponse, isLoadingUserProfile } = useGetProfileUser([]);
  const { userReferred } = useGetReferral([]);
  // console.log(userReferred);
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
          url: `https://www.mylottohub.com?${userProfileResponse?.id}`,
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
        <h5 className="fw-bold mb-3">Referral</h5>
        <p>Want to refer a friend? Please copy your referral link below.</p>
        {isLoadingUserProfile ? (
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
                value={`https://www.mylottohub.com?${userProfileResponse?.id}`}
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
                    `https://www.mylottohub.com?${userProfileResponse?.id}`
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

            <div className="table-responsive">
              <table className="table table-express table-hover mt-4">
                {userReferred ? (
                  userReferred.map((record, index) => (
                    <>
                      <tbody>
                        <tr>
                          <th>USERNAME</th>
                          <th>SIGNUP DATE</th>
                          <th>STATUS</th>
                        </tr>
                      </tbody>

                      <tbody>
                        <tr key={index} className="table-light">
                          <td>{record?.username}</td>
                          <td>{record?.date}</td>
                          <td>{record?.status}</td>
                        </tr>
                      </tbody>
                    </>
                  ))
                ) : (
                  <div className="d-flex justify-content-center text-center">
                    <div className="hidden-xs hidden-sm mx-auto">
                      <div
                        className="alert alert-danger text-center"
                        role="alert"
                      >
                        No Record Found
                      </div>
                    </div>
                  </div>
                )}
              </table>
            </div>
          </div>
        )}
      </div>
      <Footer />
    </React.Fragment>
  );
};

export default Referral;
