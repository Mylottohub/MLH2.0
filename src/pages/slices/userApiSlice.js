import { apiSlice } from "./apiSlice";

const USER_LOGIN = "/login";
const USER_REGISTER = "/register";
const USER_FORGOTPASSWORD = "/forgot";
const USER_RESETPASSWORD = "/reset";
const PAY_WITH_PAYSTACK = "/payment-initialize";
const USER_OTP = "/otp";

export const userApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (data) => ({
        url: `${USER_LOGIN}`,
        method: "POST",
        body: data,
      }),
    }),
    registers: builder.mutation({
      query: (data) => ({
        url: `${USER_REGISTER}`,
        method: "POST",
        body: data,
      }),
    }),
    forgotpasword: builder.mutation({
      query: (data) => ({
        url: `${USER_FORGOTPASSWORD}`,
        method: "POST",
        body: data,
      }),
    }),
    resetpasword: builder.mutation({
      query: (data) => ({
        url: `${USER_RESETPASSWORD}`,
        method: "POST",
        body: data,
      }),
    }),
    paystackpayment: builder.mutation({
      query: (data) => ({
        url: `${PAY_WITH_PAYSTACK}`,
        method: "POST",
        body: data,
      }),
    }),
    userotp: builder.mutation({
      query: (data) => ({
        url: `${USER_OTP}`,
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const {
  useLoginMutation,
  useRegistersMutation,
  useForgotpaswordMutation,
  useUserotpMutation,
  usePaystackpaymentMutation
} = userApiSlice;
