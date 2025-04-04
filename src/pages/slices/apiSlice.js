import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
// import HTTP from "../../utils/httpClient"

const baseQuery = fetchBaseQuery({
  baseUrl: "https://api.mylottohub.com/v1",
//  baseURL: "https://sandbox.mylottohub.com/v1"
});

export const apiSlice = createApi({
  baseQuery,
  tagTypes: ["Users"],
  endpoints: (builder) => ({}),
});
