import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useGetProfileUser } from "../../react-query";
import { useState } from "react";

const WithdrawModal = () => {
  const [showForm, setShowForm] = useState(false);
  const [showWallet, setShowWallet] = useState(false);

  // Define the validation schema using yup
  const schema = yup.object().shape({
    // firstName: yup.string().required("First Name is required"),
    // lastName: yup.string().required("Last Name is required"),
    accountNo: yup.string().required("Account Number is required"),
    wallet: yup
      .number()
      .typeError("Wallet Field must be a number")
      .positive("Wallet Field must be a positive number")
      .required("Wallet is required"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data) => {
    // Handle form submission logic (e.g., send data to the server)
    console.log(data);
    // Add your logic to send data to the server for withdrawal
  };
  const { userProfileResponse } = useGetProfileUser([]);

  return (
    <div>
      <div style={{ marginTop: "-30px" }}>
        <div className="container">
          {showForm ? (
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
                To Withdraw, kindly ensure that bank name matches your register
                name
              </p>
              <div>
                {/* <label htmlFor="firstName">First Name</label> */}
                <input
                  type="text"
                  className="form-control mb-2 p-2"
                  // placeholder="First Name"
                  name="firstName"
                  disabled
                  value={userProfileResponse?.first_name}
                  // {...register("firstName", {
                  //   required: "Required",
                  // })}
                />
                {/* {errors.firstName && (
                  <p className="text-danger text-capitalize">
                    {errors.firstName.message}
                  </p>
                )} */}
              </div>
              <div>
                <input
                  type="text"
                  className="form-control  mb-2 p-2"
                  value={userProfileResponse?.last_name}
                  name="lastName"
                  disabled
                  // {...register("lastName", {
                  //   required: "Required",
                  // })}
                />
                {/* {errors.lastName && (
                  <p className="text-danger text-capitalize">
                    {errors.lastName.message}
                  </p>
                )} */}
              </div>
              <div>
                <input
                  type="tel"
                  className="form-control  mb-2 p-2"
                  placeholder="Account Number"
                  id="accountNo"
                  name="accountNo"
                  {...register("accountNo", {
                    required: "Required",
                  })}
                />
                {errors.accountNo && (
                  <p className="text-danger text-capitalize">
                    {errors.accountNo.message}
                  </p>
                )}
              </div>
              <div>
                <select className="form-control mb-2 p-2">
                  <option selected value="">
                    Select Bank
                  </option>
                  <option value="Zenith Bank">Zenith Bank</option>
                  <option value="UBA">UBA</option>
                </select>
              </div>
              <button
                type="submit"
                className="btn btn-trans2_border btn-block btn-lg text-white border-0"
                style={{ background: "#27AAE1" }}
              >
                Submit
              </button>
            </form>
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
