import { Button, Modal, Spinner } from "react-bootstrap";
import { images } from "../../constant";
import { useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "react-toastify";
import * as yup from "yup";
import { useState } from "react";
import { HTTP } from "../../utils";

const schema = yup.object().shape({
  amount: yup.string().required("This is a required field"),
});

const Deposit = () => {
  const [showAmountInput, setShowAmountInput] = useState(false);
  const [selectedPaymentOption, setSelectedPaymentOption] = useState("");
  const [monnifyInfo, setMonnifyInfo] = useState(null);
  const [showMonnifyModal, setShowMonnifyModal] = useState(false);

  const handlePaymentOptionChange = (e) => {
    const selectedOption = e.target.value;
    setSelectedPaymentOption(selectedOption);
    setShowAmountInput(
      selectedOption === "flutterwave" ||
        selectedOption === "paystack" ||
        selectedOption === "monnify"
    );
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  const { userInfo } = useSelector((state) => state.auth);
  const userId = userInfo.data.id.toString();

  const [isLoading, setIsLoading] = useState(false);

  const handleCloseMonnifyModal = () => {
    setShowMonnifyModal(false);
  };

  const submitForm = async (data) => {
    setIsLoading(true);
    try {
      if (selectedPaymentOption === "paystack") {
        // Prepare the Paystack payment data
        const paymentData = {
          id: userId,
          amount: data.amount,
          posting: "paystack",
        };

        try {
          const paystackResponse = await HTTP.post(
            "/payment-initialize",
            paymentData,
            {
              headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
                Authorization: `Bearer ${userInfo.token}`,
              },
            }
          );

          if (paystackResponse.status === 200) {
            const paystackData = paystackResponse.data;
            // Redirect the user to the Paystack checkout page
            window.location.href = paystackData.redirect_url;
          } else {
            toast.error("An error occurred.");
          }
        } catch (error) {
          console.error("Error initializing Paystack payment:", error);
          toast.error("An error occurred.");
        }
      } else if (selectedPaymentOption === "flutterwave") {
        // Prepare the flutterwave payment data
        const paymentData = {
          id: userId,
          amount: data.amount,
          posting: "flutterwave",
        };

        try {
          const flutterwaveResponse = await HTTP.post(
            "/payment-initialize",
            paymentData,
            {
              headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
                Authorization: `Bearer ${userInfo.token}`,
              },
            }
          );

          if (flutterwaveResponse.status === 200) {
            const flutterwaveData = flutterwaveResponse.data;
            // Redirect the user to the flutterwave checkout page
            window.location.href = flutterwaveData.redirect_url;
          } else {
            toast.error("An error occurred.");
          }
        } catch (error) {
          console.error("Error initializing Flutterwave payment:", error);
          toast.error("An error occurred.");
        }
      } else if (selectedPaymentOption === "monnify") {
        // Prepare the monnify payment data
        const paymentData = {
          id: userId,
          amount: data.amount,
          posting: "monnify",
        };

        try {
          const monnifyResponse = await HTTP.post(
            "/payment-initialize",
            paymentData,
            {
              headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
                Authorization: `Bearer ${userInfo.token}`,
              },
            }
          );

          if (monnifyResponse.status === 200) {
            const monnifyData = monnifyResponse.data;
            setMonnifyInfo(monnifyData);
            setShowMonnifyModal(true);
          } else {
            toast.error("An error occurred.");
          }
        } catch (error) {
          console.error("Error initializing Monnify payment:", error);
          toast.error("An error occurred.");
        }
      }
    } catch (err) {
      toast.error("An error occurred.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <div>
        <div style={{ marginTop: "-30px" }}>
          <div className="container">
            <span>
              <strong>Deposit</strong>
            </span>
            <br />
            <small className="mt-3">
              How much do you want to deposit to your wallet?
            </small>

            <form onSubmit={handleSubmit(submitForm)}>
              <div className="mb-3 mt-4">
                {showAmountInput && (
                  <input
                    type="tel"
                    className="form-control p-3 mb-2"
                    placeholder="Enter Amount"
                    name="amount"
                    {...register("amount", {
                      required: "Required",
                    })}
                  />
                )}
                {errors.amount && (
                  <p className="text-danger text-capitalize">
                    {errors.amount.message}
                  </p>
                )}
              </div>

              {/* <div className="mb-3">
                <div className="nav-item dropdown">
                  <a
                    className="dropdown-toggle form-select p-3 mb-2 text-dark"
                    style={{textDecoration:'none'}}
                    href="#"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                    type="button"
                    data-toggle="dropdown"
                  >
                    Choose Payment Options
                  </a>
                  <ul className="dropdown-menu shadow card">
                    <li data-value="1">
                      <a className="dropdown-item">
                        <div className="d-flex">
                          <img src={images.rave} /> Flutterwave{" "}
                          <div className="form-check text-left">
                            <input
                              className="form-check-input"
                              type="radio"
                              name="flexRadioDefault"
                              id="flexRadioDefault1"
                              checked
                            />
                          </div>
                        </div>
                      </a>
                    </li>

                    <li data-value="2">
                      <a className="dropdown-item">
                        <div className="d-flex">
                          <img src={images.paystack} /> Paystack{" "}
                          <div className="form-check">
                            <input
                              className="form-check-input"
                              type="radio"
                              name="flexRadioDefault"
                              id="flexRadioDefault1"
                            />
                          </div>
                        </div>
                      </a>
                    </li>
                  </ul>
                </div>
              </div> */}
              <div className="mb-3">
                <div className="nav-item dropdown">
                  <select
                    className="form-select p-3 mb-2 text-dark"
                    value={selectedPaymentOption}
                    onChange={handlePaymentOptionChange}
                  >
                    <option value="">Choose Payment Options</option>
                    <option value="flutterwave">
                      <img src={images.rave} />
                      Flutterwave
                    </option>
                    <option value="paystack">
                      <img src={images.paystack} />
                      Paystack
                    </option>
                    <option value="monnify">
                      {/* <img src={images.paystack} /> */}
                      Bank Transfer (Monnify)
                    </option>
                  </select>
                </div>
              </div>

              <Button
                type="submit"
                className="w-100 p-3"
                style={{ background: "#27AAE1" }}
                disabled={isLoading}
              >
                {isLoading ? (
                  <Spinner
                    as="span"
                    animation="border"
                    size="sm"
                    role="status"
                    aria-hidden="true"
                  />
                ) : (
                  " Proceed"
                )}
              </Button>
            </form>
          </div>
        </div>
      </div>

      <div>
        {/* Monnify Modal */}
        <Modal
          show={showMonnifyModal}
          onHide={handleCloseMonnifyModal}
          backdrop="static"
          keyboard={false}
          size="lg"
          centered
        >
          <Modal.Header closeButton>
            <h6>Make Payment to the Account below to fund your Account</h6>
          </Modal.Header>
          <Modal.Body>
            <p>Bank Name: {monnifyInfo?.bank_name}</p>
            <p>Account Name: {monnifyInfo?.account_name}</p>
            <p>Account Number: {monnifyInfo?.account_number}</p>
          </Modal.Body>
        </Modal>
      </div>
    </div>
  );
};

export default Deposit;
