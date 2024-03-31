import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useGetAllBank, useGetProfileUser } from "../../react-query";
import { useState, useEffect } from "react";
import { HTTP } from "../../utils";
import { useSelector } from "react-redux";
import { Button, Spinner } from "react-bootstrap";
import { toast } from "react-toastify";

const WithdrawModal = () => {
  // Define the validation schema using yup
  const { userProfileResponse } = useGetProfileUser([]);
  const [showForm, setShowForm] = useState(false);
  const [showWallet, setShowWallet] = useState(false);
  const [accountName, setAccountName] = useState(""); // State to store account name
  const [typingTimeout, setTypingTimeout] = useState(null);
  const [fetchingAccountName, setFetchingAccountName] = useState(false);
  const [schema, setSchema] = useState(null);
  const { allBanks, isLoadingBank } = useGetAllBank();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (userProfileResponse) {
      const schema = yup.object().shape({
        account_no: yup
          .string()
          .min(10, "Account Number must be at least 10 characters")
          .max(10, "Account Number cannot exceed 10 characters")
          .required("Account Number is required"),
        bank_name: yup.string().required("Account Name is required"),
        email: yup.string().email().required(),
      });
      setSchema(schema);
    }
  }, [userProfileResponse]);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = () => {
    toast.success("Account Successfuly Submitted");
  };

  const onSubmitWithdraw = async (e) => {
    e.preventDefault();
    if (userProfileResponse?.wwallet < 1000) {
      toast.error("Insufficient Balance.");
      return;
    }
    const amount = e.target.amount.value;
    if (amount < 1000) {
      toast.error("Amount must be greater than ₦1000.");
      return;
    }
    try {
      const response = await HTTP.post(
        "/payments/withdraw-request",
        {
          amount: amount,
          id: userProfileResponse?.id,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: `Bearer ${userInfo.token}`,
          },
        }
      );
      if (response) {
        toast.success(response.data.message);
      }
    } catch (error) {
      toast.error("Failed to submit withdrawal request");
    }
  };

  const onSubmitTransfer = async (e) => {
    setLoading(true);
    e.preventDefault();

    const amountTransfer = e.target.amountTransfer.value;

    try {
      const response = await HTTP.post(
        "/transfer-wallet",
        {
          amount: amountTransfer,
          id: userProfileResponse?.id,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: `Bearer ${userInfo.token}`,
          },
        }
      );
      if (response) {
        toast.success("Funds transferred successfully");
      }
    } catch (error) {
      toast.error(error.response.data.msg);
    } finally {
      setLoading(false);
    }
  };

  const bankName = watch("bank_name");
  const accountNo = watch("account_no");
  const { userInfo } = useSelector((state) => state.auth);
  const fetchAccountName = async () => {
    try {
      setFetchingAccountName(true);
      const response = await HTTP.post(
        "/user/resolve-bank-account",
        {
          bank_name: bankName,
          account_no: accountNo,
          email: userProfileResponse?.email,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: `Bearer ${userInfo.token}`,
          },
        }
      );

      if (response.data.status === "Success") {
        const resolvedAccountName = response?.data?.data?.data?.account_name;
        setAccountName(resolvedAccountName);
        setValue("account_name", resolvedAccountName);
      }
    } catch (error) {
      // console.error("Error:", error);
      if (error.response && error.response.status === 500) {
        toast.error("Account name not found.");
      }
    } finally {
      setFetchingAccountName(false);
    }
  };

  useEffect(() => {
    if (!accountNo) {
      setAccountName("");
      setValue("account_name", "");
    } else {
      if (bankName && accountNo && accountNo.length === 10) {
        if (typingTimeout) {
          clearTimeout(typingTimeout);
        }
        setTypingTimeout(setTimeout(fetchAccountName, 1000));
      } else if (bankName && accountNo && accountNo.length < 10) {
        // Clear account name if account number length is less than 10
        setAccountName("");
        setValue("account_name", "");
      }
    }
  }, [bankName, accountNo]);
  return (
    <div>
      <div style={{ marginTop: "-30px" }}>
        <div className="container">
          {showForm ? (
            <div>
              {isLoadingBank ? (
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
                <>
                  <span>
                    <strong>Withdraw Funds</strong>
                  </span>
                  <br />
                  <small className="mt-3">
                    Winning Wallet Balance -{" "}
                    <strong>₦{userProfileResponse?.wwallet}</strong>
                  </small>
                  <hr />

                  {userProfileResponse.accno ? (
                    <>
                      <form onSubmit={onSubmitWithdraw}>
                        <div>
                          <input
                            type="text"
                            className="form-control mb-2 p-2"
                            placeholder="Account Number"
                            name="account_no"
                            disabled
                            value={userProfileResponse?.accno}
                          />
                        </div>
                        <div>
                          <input
                            type="text"
                            className="form-control mb-2 p-2"
                            placeholder="Bank Name"
                            name="bank_name"
                            disabled
                            value={userProfileResponse?.bname}
                          />
                        </div>
                        <div>
                          <input
                            type="text"
                            className="form-control mb-2 p-2"
                            placeholder="Account Name"
                            name="account_name"
                            disabled
                            value={userProfileResponse?.accname}
                          />
                        </div>
                        <div>
                          <input
                            type="number"
                            className="form-control mb-2 p-2"
                            placeholder="Amount"
                            min="1"
                            name="amount"
                            required
                          />
                          {/* {withdrawErrors.amount && (
                            <p className="text-danger text-capitalize">
                              {withdrawErrors.amount.message}
                            </p>
                          )} */}
                        </div>
                        <button
                          type="submit"
                          className="btn btn-trans2_border btn-block btn-lg text-white border-0 mt-3"
                          style={{ background: "#27AAE1" }}
                        >
                          Submit
                        </button>
                      </form>
                    </>
                  ) : (
                    <>
                      <form onSubmit={handleSubmit(onSubmit)}>
                        <p>
                          To initiate a withdrawal, choose your bank and input
                          your account number to automatically fill and save
                          your account details.
                        </p>
                        <div>
                          <select
                            className="form-control mb-2 p-2"
                            {...register("bank_name")}
                            defaultValue=""
                          >
                            <option value="" disabled>
                              Select Bank
                            </option>
                            {allBanks.map((bank) => (
                              <option key={bank.id} value={bank.name}>
                                {bank.name}
                              </option>
                            ))}
                          </select>
                          {errors.bank_name && (
                            <p className="text-danger text-capitalize">
                              {errors.bank_name.message}
                            </p>
                          )}
                        </div>
                        <div>
                          <input
                            type="tel"
                            className="form-control mb-2 p-2"
                            placeholder="Account Number"
                            id="account_no"
                            name="account_no"
                            {...register("account_no", {
                              required: "Required",
                            })}
                            onInput={(e) =>
                              (e.target.value = e.target.value.slice(0, 10))
                            }
                          />
                          {errors.account_no && (
                            <p className="text-danger text-capitalize">
                              {errors.account_no.message}
                            </p>
                          )}
                        </div>

                        <div>
                          <input
                            type="text"
                            className="form-control mb-2 p-2"
                            placeholder="Account Name"
                            name="account_name"
                            disabled
                            value={accountName}
                          />
                          {fetchingAccountName && (
                            <Spinner animation="border" variant="primary" />
                          )}
                        </div>
                      </form>
                    </>
                  )}
                </>
              )}
            </div>
          ) : showWallet ? (
            <form onSubmit={onSubmitTransfer}>
              <span>
                <strong>Transfer to Wallet</strong>
              </span>
              <br />
              <small className="mt-3">
                Winning Wallet Balance -{" "}
                <strong>₦{userProfileResponse?.wwallet}</strong>
              </small>
              <hr />
              <p>
                Please click the button below to transfer funds back to your
                deposit wallet
              </p>

              <div>
                <input
                  type="tel"
                  className="form-control  mb-2 p-2"
                  placeholder="₦0.00"
                  id="amountTransfer"
                  name="amountTransfer"
                  min="1"
                />
              </div>

              {/* <button
                type="submit"
                className="btn btn-trans2_border btn-block btn-lg text-white border-0"
                style={{ background: "#27AAE1" }}
              >
                Submit
              </button> */}
              <Button
                type="submit"
                className="w-100 p-3"
                style={{ background: "#27AAE1" }}
                disabled={loading}
              >
                {loading ? (
                  <Spinner
                    as="span"
                    animation="border"
                    size="sm"
                    role="status"
                    aria-hidden="true"
                  />
                ) : (
                  " Submit"
                )}
              </Button>
            </form>
          ) : (
            <>
              <span>
                <strong>Withdraw Funds</strong>
              </span>
              <br />
              <small className="mt-3">
                Winning Wallet Balance -{" "}
                <strong>₦{userProfileResponse?.wwallet}</strong>
              </small>
              <hr />
              <p>
                Please click the button below to either withdraw funds to your
                bank account or transfer back to your lotto wallet.
              </p>
              <br />
              <p>
                <a
                  onClick={() => setShowForm(true)}
                  className="btn btn-blue2 btn-block btn-lg"
                >
                  Cash Out to Bank
                </a>
              </p>

              <p>
                <a
                  onClick={() => setShowWallet(true)}
                  className="btn btn-trans2_border btn-block btn-lg"
                >
                  Transfer to wallet
                </a>
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default WithdrawModal;
