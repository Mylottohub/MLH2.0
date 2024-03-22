import { store } from "../../react-redux/store";
import { apiSlice } from "./apiSlice";
import { logout } from "./authSlice";

const USER_LOGIN = "/login";
const USER_REGISTER = "/register";
const USER_FORGOTPASSWORD = "/user/forgot";
const USER_RESETPASSWORD = "/user/reset";
const PAY_WITH_PAYSTACK = "/payment-initialize";
const USER_OTP = "/user-verification";
const OPERATOR_GAMES = "/get-games";
const USER_CONTACT = "/contact";

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
    contact: builder.mutation({
      query: (data) => ({
        url: `${USER_CONTACT}`,
        method: "POST",
        body: data,
      }),
    }),
    onQueryStarted: async (_, { dispatch, queryFulfilled }) => {
      try {
        const result = await queryFulfilled;
        const expiration = result.data[1]?.expires;
        setupLogoutTimer(expiration);
      } catch (error) {
        // Handle login error
      }
    },

    operatorgames: builder.mutation({
      query: (data) => ({
        url: `${OPERATOR_GAMES}`,
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
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
  usePaystackpaymentMutation,
  useOperatorgamesMutation,
  useResetpaswordMutation,
  useContactMutation,
  // useTimetableMutation
} = userApiSlice;
const setupLogoutTimer = (expiration) => {
  const now = Date.now();
  const delay = expiration * 1000 - now;
  if (delay > 0) {
    setTimeout(() => {
      store.dispatch(logout());
    }, delay);
  }
};
