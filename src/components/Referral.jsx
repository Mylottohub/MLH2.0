import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Spinner } from "react-bootstrap";
import axios from "axios";
import { toast } from "react-toastify";
import Navbar from "./Navbar";

import Footer from "./Footer";
import { BsShareFill } from "react-icons/bs";

const Referral = () => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const { userInfo } = useSelector((state) => state.auth);
  const [error, setError] = useState(null);
  useEffect(() => {
    if (userInfo && userInfo.data) {
      const apiUrl = `https://sandbox.mylottohub.com/v1/get-user/${userInfo.data.id}`;

      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
          "Content-Type": "application json",
          Accept: "application/json",
        },
      };

      axios
        .get(apiUrl, config)
        .then((response) => {
          setUserData(response.data);
          setLoading(false);
        })
        .catch((error) => {
          setError(error);
          setLoading(false);
        });
    }
  }, [userInfo]);
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
          url: `https://www.mylottohub.com/${userData?.id}`,
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
        {loading ? (
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
                value={`https://www.mylottohub.com/${userData?.id}`}
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
                  notify(`https://www.mylottohub.com/${userData?.id}`)
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
                <tbody>
                  <tr>
                    {/* <th scope="col">#</th> */}
                    <th>USERNAME</th>
                    <th>SIGNUP DATE</th>
                  </tr>
                </tbody>

                <tbody>
                  <tr className="table-light">
                    {/* <td></td> */}
                    <td></td>
                    <td></td>
                  </tr>
                </tbody>
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
