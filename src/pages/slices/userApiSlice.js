import { store } from "../../react-redux/store";
import { apiSlice } from "./apiSlice";
import { logout, setCredentials } from "./authSlice";

const USER_LOGIN = "/login";
const USER_REGISTER = "/register";
const USER_FORGOTPASSWORD = "/user/forgot";
const USER_RESETPASSWORD = "/user/reset";
const PAY_WITH_PAYSTACK = "/payment-initialize";
const USER_OTP = "/otp";
const RESEND_OTP = "/user/resend-otp";
const OPERATOR_GAMES = "/get-games";

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
    onQueryStarted: async (_, { dispatch, queryFulfilled }) => {
      try {
        const result = await queryFulfilled;
        const expiration = result.data?.expires;
        // console.log("sfsfs", expiration);
        dispatch(setCredentials(result?.data));
        setupLogoutTimer(expiration);
      } catch (error) {
        // Handle login error
      }
    },
    resendotp: builder.mutation({
      query: (data) => ({
        url: `${RESEND_OTP}`,
        method: "POST",
        body: data,
      }),
    }),

    operatorgames: builder.mutation({
      query: (data) => ({
        url: `${OPERATOR_GAMES}`,
        method: "POST",
        body: JSON.stringify(data), // Send data as JSON in the request body
        headers: {
          "Content-Type": "application/json", // Set the content type to JSON
          Accept: "application/json",
        },
      }),
    }),
  }),
});

export const {
  useLoginMutation,
  useRegistersMutation,
  useForgotpaswordMutation,
  useUserotpMutation,
  useResendotpMutation,
  usePaystackpaymentMutation,
  useOperatorgamesMutation,
  useResetpaswordMutation,
  // useTimetableMutation
} = userApiSlice;
const setupLogoutTimer = (expiration) => {
  const now = Date.now();
  const delay = expiration * 1000 - now; // Convert seconds to milliseconds
  if (delay > 0) {
    setTimeout(() => {
      // Trigger logout action after the specified delay
      store.dispatch(logout());
    }, delay);
  }
};
