import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
// import { useGetAppointmentsQuery } from "../../../dashboard/src/features/apiSlice";

export const api = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:5000/api",
    // baseUrl: "https://server-patheya.onrender.com/api",
  }),
  tagTypes: ['Appointments'], // Tags for invalidation
  endpoints: (builder) => ({
    getBlogs: builder.query({
      query: () => "/blogs/",
    }),
    getCards: builder.query({
      query: () => "/cards/",
    }),
    getAppointments: builder.query({
      query: () => '/appointments', // Endpoint for fetching appointments
      providesTags: ['Appointments'], // Cache the results
    }),
    addAppointmentData: builder.mutation({
      query: (appointmentData) => ({
        url: "/appointments",
        method: "POST",
        body: appointmentData,
      }),
      invalidatesTags: ['Appointments'],
    }),
  }),
});

export const {
  useGetBlogsQuery,
  useGetCardsQuery,
  useAddAppointmentDataMutation,
  useGetAppointmentsQuery
} = api;


// import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// // Define the API slice
// export const api = createApi({
//   baseQuery: fetchBaseQuery({
//     baseUrl: 'http://localhost:5000/api', // Base URL for API
//   }),
//   tagTypes: ['Appointments'], // Tags for invalidation
//   endpoints: (builder) => ({
//     getAppointments: builder.query({
//       query: () => '/appointments', // Endpoint for fetching appointments
//       providesTags: ['Appointments'], // Cache the results
//     }),
//     addAppointment: builder.mutation({
//       query: (newAppointment) => ({
//         url: '/appointments',
//         method: 'POST',
//         body: newAppointment,
//       }),
//       invalidatesTags: ['Appointments'], // Invalidate cache after mutation
//     }),
//     updateAppointmentStatus: builder.mutation({
//       query: ({ id, status }) => ({
//         url: `/appointments/${id}`,
//         method: 'PUT',
//         body: { status },
//       }),
//       invalidatesTags: ['Appointments'], // Invalidate cache after mutation
//     }),
//     deleteAppointment: builder.mutation({
//       query: (id) => ({
//         url: `/appointments/${id}`,
//         method: 'DELETE',
//       }),
//       invalidatesTags: ['Appointments'], // Invalidate cache after mutation
//     }),
//   }),
// });

// export const {
//   useGetAppointmentsQuery,
//   useAddAppointmentMutation,
//   useUpdateAppointmentStatusMutation,
//   useDeleteAppointmentMutation,
// } = api;