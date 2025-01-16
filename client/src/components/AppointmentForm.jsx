import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  FormControl,
  Input,
  InputLabel,
  MenuItem,
  Select,
  Typography,
  FormHelperText,
  Grid,
} from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import { useGetAppointmentsQuery, useAddAppointmentDataMutation } from "../features/apiSlice";
import { format } from "date-fns";

const timeSlots = [
  { value: "09:00-10:00", label: "09:00-10:00" },
  { value: "10:00-11:00", label: "10:00-11:00" },
  { value: "11:00-12:00", label: "11:00-12:00" },
];

const AppointmentForm = ({ theme }) => {
  const [date, setDate] = useState("");
  const [timeSlot, setTimeSlot] = useState("");
  const [userInfo, setUserInfo] = useState({ name: "", email: "" });
  const [appointmentDetails, setAppointmentDetails] = useState(null);

  const { data: appointments = [], isLoading: isFetching, refetch } = useGetAppointmentsQuery();
  const [addAppointmentData, { isLoading: isSubmitting }] = useAddAppointmentDataMutation();

  useEffect(() => {
    const storedUserInfo = JSON.parse(localStorage.getItem("user-info"));
    if (storedUserInfo) {
      setUserInfo(storedUserInfo);
    }

    const userAppointment = appointments.find(
      (appointment) =>
        appointment.email === storedUserInfo?.email && appointment.status !== "Completed"
    );

    if (userAppointment) {
      setAppointmentDetails(userAppointment);
    } else {
      setAppointmentDetails(null);
    }
  }, [appointments]);

  const formik = useFormik({
    initialValues: {
      notes: "",
    },
    validationSchema: Yup.object({
      notes: Yup.string().max(500, "Notes cannot exceed 500 characters"),
    }),
    onSubmit: async (values) => {
      if (!date || !timeSlot) {
        toast.error("Please select a date and time slot", {
          position: "top-center",
          autoClose: 3000,
        });
        return;
      }

      const appointmentData = {
        name: userInfo.name,
        email: userInfo.email,
        date,
        timeSlot,
        notes: values.notes,
      };

      try {
        await addAppointmentData(appointmentData).unwrap();
        toast.success("Appointment booked successfully!", {
          position: "top-center",
          autoClose: 3000,
        });
        formik.resetForm();
        setDate("");
        setTimeSlot("");
        refetch();
      } catch (error) {
        toast.error(
          error?.data?.message || "An error occurred while booking the appointment.",
          {
            position: "top-center",
            autoClose: 3000,
          }
        );
      }
    },
  });

  const isTimeSlotBooked = (date, slot) =>
    appointments.some(
      (appointment) =>
        format(new Date(appointment.date), "yyyy-MM-dd") === date &&
        appointment.timeSlot === slot
    );

  const formatDate = (date) => format(new Date(date), "dd/MM/yyyy");

  return (
    <Box
      sx={{
        backgroundColor: theme.palette.background.default,
        color: theme.palette.text.primary,
        padding: "20px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <form onSubmit={formik.handleSubmit} style={{ width: "100%" }}>
        <Typography variant="h3" align="center" gutterBottom>
          {appointmentDetails
            ? "Your Appointment Details"
            : "Book an Appointment!"}
        </Typography>

        {appointmentDetails ? (
          <Box
            sx={{
              textAlign: "center",
              padding: "20px",
              backgroundColor: theme.palette.background.paper,
              borderRadius: "8px",
              boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
            }}
          >
            <Typography variant="h4">You have already booked an appointment!</Typography>
            <Typography variant="h6">Date: {formatDate(appointmentDetails.date)}</Typography>
            <Typography variant="h6">Time Slot: {appointmentDetails.timeSlot}</Typography>
            <Typography variant="body1">
              Please wait for the admin to update the status.
            </Typography>
          </Box>
        ) : (
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <Typography>Name: {userInfo.name}</Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography>Email: {userInfo.email}</Typography>
            </Grid>

            <Grid item xs={12} md={6}>
              <Typography>Select Date</Typography>
              <Input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                fullWidth
                margin="dense"
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <Typography>Select Time Slot</Typography>
              <Select
                value={timeSlot}
                onChange={(e) => setTimeSlot(e.target.value)}
                fullWidth
                margin="dense"
                disabled={isFetching}
              >
                {timeSlots.map((option) => (
                  <MenuItem
                    key={option.value}
                    value={option.value}
                    disabled={isTimeSlotBooked(date, option.value)}
                  >
                    {option.label} {isTimeSlotBooked(date, option.value) ? "(Booked)" : ""}
                  </MenuItem>
                ))}
              </Select>
            </Grid>

            <Grid item xs={12}>
              <FormControl fullWidth margin="dense">
                <InputLabel htmlFor="notes">Notes</InputLabel>
                <Input id="notes" type="text" {...formik.getFieldProps("notes")} />
                {formik.touched.notes && formik.errors.notes ? (
                  <FormHelperText error>{formik.errors.notes}</FormHelperText>
                ) : null}
              </FormControl>
            </Grid>

            <Grid item xs={12}>
              <Button
                type="submit"
                variant="contained"
                fullWidth
                style={{ marginTop: "16px" }}
                disabled={isFetching || isSubmitting}
              >
                {isSubmitting ? "Booking..." : "Book Appointment"}
              </Button>
            </Grid>
          </Grid>
        )}
      </form>
    </Box>
  );
};

export default AppointmentForm;
