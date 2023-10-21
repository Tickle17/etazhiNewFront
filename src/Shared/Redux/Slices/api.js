import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Определите URL вашего сервера
const baseUrl = "http://localhost:5001/";

const api = createApi({
  baseQuery: fetchBaseQuery({ baseUrl }),
  endpoints: (builder) => ({
    getItems: builder.query({
      query: () => "menu/menuItems",
    }),
    login: builder.mutation({
      query: ({ loginData }) => ({
        url: "auth/login",
        method: "POST",
        body: loginData,
      }),
    }),
  }),
});

export const { useLoginMutation } = api;
export default api;
