import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Определите URL вашего сервера
const baseUrl = "https://dornetshop.ru/";

const api = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl,
    prepareHeaders: (headers, { getState }) => {
      const token = localStorage.getItem("token");
      if (token) {
        headers.set("Authorization", token);
      }
      return headers;
    },
  }),
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
      transformResponse: (response) => response,
    }),
    createTask: builder.mutation({
      query: ({ taskData }) => ({
        url: "tasks/createTask",
        method: "POST",
        body: taskData,
      }),
    }),
    updateTask: builder.mutation({
      query: (editedTask) => ({
        url: `tasks/updateTask/${editedTask.id}`,
        method: "PUT",
        body: editedTask,
      }),
    }),
    authentication: builder.query({
      query: (userId) => `auth/authentication/${userId}`,
    }),
  }),
});

export const {
  useLoginMutation,
  useAuthenticationQuery,
  useCreateTaskMutation,
  useUpdateTaskMutation,
} = api;
export default api;
