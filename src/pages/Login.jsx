import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
// import { toast } from "react-toastify";
import * as yup from "yup";
import { Button, Spinner } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import {useLoginMutation} from "../pages/slices/userApiSlice"
import {setCredentials} from "../pages/slices/authSlice"
// import HTTP from "../utils/httpClient";
import "../assets/css/register.css";

const schema = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().min(8).max(15).required(),
});

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [login, {isLoading}] = useLoginMutation();

  const {userInfo} = useSelector((state) => state.auth);
  useEffect(()=> {
    if (userInfo) {
        // navigate('/otp')
    }
  },[navigate, userInfo])
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const submitForm  = async (data) => {
    try {
      const res = await login({data}).unwrap() 
      dispatch(setCredentials({...res}))
    //   navigate('/otp')
    } catch (err) {
        console.log(err?.data?.message || err.error);
    }
  };

  return (
    <>
      <Navbar />
      <div className="container">
        <div className="row">
          <div className="col-lg-6 mx-auto app__register">
            <h1 className="mb-4">Login</h1>
            <h6 className="mb-4">
              Play all your favorite Nigerian lotto games from one account on
              mylottohub and get your winnings paid instantly to your bank
              account
            </h6>

            <form onSubmit={handleSubmit(submitForm)}>
              <div className="mb-3">
                <input
                  type="email"
                  className="form-control p-3 mb-2"
                  placeholder=" Email Address"
                  name="email"
                  {...register("email", {
                    required: "Required",
                  })}
                />
                {errors.email && (
                  <p className="text-danger text-capitalize">
                    {errors.email.message}
                  </p>
                )}
              </div>

              <div className="mb-3">
                <input
                  type="password"
                  className="form-control p-3 mb-2"
                  placeholder="Password"
                  name="password"
                  {...register("password", {
                    required: "Required",
                  })}
                />
                {errors.password && (
                  <p className="text-danger text-capitalize">
                    {errors.password.message}
                  </p>
                )}
              </div>
              <p style={{ cursor: "pointer", color: "#128481" }}>
                Don`t have an account?{" "}
                <span onClick={() => navigate("/register")}>Signup</span>
              </p>
            
              <Button
                type="submit"
                className="w-100 p-3"
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
                  " Login"
                )}
              </Button>
            </form>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default Login;
