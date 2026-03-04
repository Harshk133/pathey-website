// import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
// // import { useGetAppointmentsQuery } from "../../../dashboard/src/features/apiSlice";

// export const api = createApi({
//   baseQuery: fetchBaseQuery({
//     baseUrl: "http://localhost:5000/api",
//     // baseUrl: import.meta.env.VITE_APP_BACKEND_URL_API,
//   }),
//   tagTypes: ['Appointments', "Courses"], // Tags for invalidation
//   endpoints: (builder) => ({
//     getBlogs: builder.query({
//       query: () => "/blogs/",
//     }),
//     getCourses: builder.query({
//       query: () => "/courses/", // Fetch courses data
//       providesTags: ["Courses"],
//     }),
//     getCards: builder.query({
//       query: () => "/cards/",
//     }),
//     getAppointments: builder.query({
//       query: () => '/appointments', // Endpoint for fetching appointments
//       providesTags: ['Appointments'], // Cache the results
//     }),
//     addAppointmentData: builder.mutation({
//       query: (appointmentData) => ({
//         url: "/appointments",
//         method: "POST",
//         body: appointmentData,
//       }),
//       invalidatesTags: ['Appointments'],
//     }),
//   }),
// });

// export const {
//   useGetBlogsQuery,
//   useGetCardsQuery,
//   useGetCoursesQuery,
//   useAddAppointmentDataMutation,
//   useGetAppointmentsQuery
// } = api;
// ! above code is suspecious varcha code haa actual code ahe adhicha check karaychay addhi close feature 

import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const api = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: "https://patheyedu.com/api", // Matches your latest base URL
    // baseUrl: import.meta.env.VITE_APP_BACKEND_URL_API, // Uncomment for environment variable usage
    prepareHeaders: (headers) => {
      const token = localStorage.getItem("token"); // Optional: Add auth token if needed
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ["Appointments", "Courses", "ClosedSlots"], // Added 'ClosedSlots' for slot management
  endpoints: (builder) => ({
    // Fetch Blogs
    getBlogs: builder.query({
      query: () => "/blogs/",
    }),

    // Fetch Courses
    getCourses: builder.query({
      query: () => "/courses/",
      providesTags: ["Courses"],
    }),

    // Fetch Cards
    getCards: builder.query({
      query: () => "/cards/",
    }),

    // Fetch Appointments
    getAppointments: builder.query({
      query: () => "/appointments",
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ _id }) => ({ type: "Appointments", id: _id })),
              { type: "Appointments", id: "LIST" },
            ]
          : [{ type: "Appointments", id: "LIST" }],
    }),

    // Add Appointment
    addAppointmentData: builder.mutation({
      query: (appointmentData) => ({
        url: "/appointments",
        method: "POST",
        body: appointmentData,
      }),
      invalidatesTags: [{ type: "Appointments", id: "LIST" }],
    }),

    // Update Appointment Status
    updateAppointmentStatus: builder.mutation({
      query: ({ id, status }) => ({
        url: `/appointments/${id}`,
        method: "PUT",
        body: { status },
      }),
      invalidatesTags: (result, error, { id }) => [
        { type: "Appointments", id },
        { type: "Appointments", id: "LIST" },
      ],
    }),

    // Delete Appointment
    deleteAppointment: builder.mutation({
      query: (id) => ({
        url: `/appointments/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error, id) => [
        { type: "Appointments", id },
        { type: "Appointments", id: "LIST" },
      ],
    }),

    // Fetch Closed Slots
    getClosedSlots: builder.query({
      query: () => "/appointments/closed-slots",
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ _id }) => ({ type: "ClosedSlots", id: _id })),
              { type: "ClosedSlots", id: "LIST" },
            ]
          : [{ type: "ClosedSlots", id: "LIST" }],
    }),

    // Close a Date or Time Slot
    closeSlot: builder.mutation({
      query: ({ date, timeSlots }) => ({
        url: "/appointments/close",
        method: "POST",
        body: { date, timeSlots },
      }),
      invalidatesTags: [
        { type: "ClosedSlots", id: "LIST" },
        { type: "Appointments", id: "LIST" },
      ],
    }),

    // Reopen a Date or Time Slot
    reopenSlot: builder.mutation({
      query: ({ date, timeSlot }) => ({
        url: "/appointments/reopen",
        method: "DELETE",
        body: { date, timeSlot },
      }),
      invalidatesTags: [
        { type: "ClosedSlots", id: "LIST" },
        { type: "Appointments", id: "LIST" },
      ],
    }),
  }),
});

export const {
  useGetBlogsQuery,
  useGetCardsQuery,
  useGetCoursesQuery,
  useGetAppointmentsQuery,
  useAddAppointmentDataMutation,
  useUpdateAppointmentStatusMutation,
  useDeleteAppointmentMutation,
  useGetClosedSlotsQuery,
  useCloseSlotMutation,
  useReopenSlotMutation,
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