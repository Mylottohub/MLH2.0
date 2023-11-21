import { Button, Modal, Spinner } from "react-bootstrap";
import { images } from "../../constant";
import { useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "react-toastify";
import * as yup from "yup";
import { useState, useEffect } from "react";
import axios from "axios";


const WithdrawModal = () => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  // const [error, setError] = useState(null);
  const { userInfo } = useSelector((state) => state.auth);

  useEffect(() => {
    if (userInfo && userInfo.data) {
      // Define your API endpoint URL
      const apiUrl = `https://sandbox.mylottohub.com/v1/get-user/${userInfo.data.id}`;
  
      // Replace "YOUR_BEARER_TOKEN" with the actual bearer token
      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
          "Content-Type": "application json", // Set the content type to JSON
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
          // setError(error);
          setLoading(false);
        });
    }
  }, [userInfo]);
  
  return (
    <div>
         <div style={{ marginTop: "-30px" }}>
          <div className="container">
            <span>
              <strong>Withdraw Funds</strong>
            </span>
            <br />
            <small className="mt-3">
              Winning Wallet Balance - <strong>₦{userInfo.data.wwallet}</strong>
            </small>
            <hr />
            <p>
              Please click the buttons below to either withdraw funds to your
              bank account or transfer back to your lotto wallet.
            </p>
            <br />
            <p>
              <a
                className="btn btn-blue2 btn-block btn-lg"
              >
                Cash Out to Bank
              </a>
            </p>

            <p>
              <a
               className="btn btn-trans2_border btn-block btn-lg"
              >
                Transfer to wallet
              </a>
            </p>
           
          </div>

          {/* <button
            className="btn text-white mt-4"
            style={{ background: "#0AB39C", float: "right" }}
          >
            Clock in
          </button> */}
        </div>
    </div>
  )
}

export default WithdrawModal