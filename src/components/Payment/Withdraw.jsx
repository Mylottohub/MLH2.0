import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useGetAllBank, useGetProfileUser } from "../../react-query";
import { useState, useEffect } from "react";
import { HTTP } from "../../utils";
import { useSelector } from "react-redux";
import { Spinner } from "react-bootstrap";
import { toast } from "react-toastify";

const WithdrawModal = () => {
  const [showForm, setShowForm] = useState(false);
  const [showWallet, setShowWallet] = useState(false);
  const [accountName, setAccountName] = useState(""); // State to store account name
  const [typingTimeout, setTypingTimeout] = useState(null);
  const [fetchingAccountName, setFetchingAccountName] = useState(false);

  const { allBanks, isLoadingBank } = useGetAllBank();
  const { userProfileResponse } = useGetProfileUser([]);

  // Define the validation schema using yup
  const schema = yup.object().shape({
    account_no: yup
      .string()
      .min(10)
      .max(10)
      .required("Account Number is required"),
    bank_name: yup.string().required("Account Name is required"),
    email: userProfileResponse?.email,
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data) => {
    // Handle form submission logic (e.g., send data to the server)
    console.log(data);
    // Add your logic to send data to the server for withdrawal
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
        console.log(response.data.data.data.account_name);
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
    // if (bankName && accountNo) {
    //   if (typingTimeout) {
    //     clearTimeout(typingTimeout);
    //   }
    //   setTypingTimeout(setTimeout(fetchAccountName, 5000));
    // }
    if (!accountNo) {
      // If account number is empty, clear account name
      setAccountName("");
      setValue("account_name", ""); // Optionally clear the form field
    } else {
      // If account number is not empty, fetch account name
      if (bankName) {
        if (typingTimeout) {
          clearTimeout(typingTimeout);
        }
        setTypingTimeout(setTimeout(fetchAccountName, 5000));
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
                <form onSubmit={handleSubmit(onSubmit)}>
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
                    To Withdraw, Select Your Bank and Enter your Account Number
                    to Auto Populate Your Account Name
                  </p>
                  <div>
                    {allBanks && Array.isArray(allBanks) && (
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
                    )}
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
                      {...register("account_no", { required: "Required" })}
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
                  <button
                    type="submit"
                    className="btn btn-trans2_border btn-block btn-lg text-white border-0 mt-3"
                    style={{ background: "#27AAE1" }}
                  >
                    Submit
                  </button>
                </form>
              )}
            </div>
          ) : showWallet ? (
            <form onSubmit={handleSubmit(onSubmit)}>
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
                Please click the buttons below to transfer funds back to your
                deposit wallet
              </p>

              <div>
                <input
                  type="tel"
                  className="form-control  mb-2 p-2"
                  placeholder="₦0.00"
                  id="wallet"
                  name="wallet"
                  {...register("wallet", {
                    required: "Required",
                  })}
                />
                {errors.wallet && (
                  <p className="text-danger text-capitalize">
                    {errors.wallet.message}
                  </p>
                )}
              </div>

              <button
                type="submit"
                className="btn btn-trans2_border btn-block btn-lg text-white border-0"
                style={{ background: "#27AAE1" }}
              >
                Submit
              </button>
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
                Please click the buttons below to either withdraw funds to your
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
