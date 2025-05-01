import React, { useState } from "react";
import axios from "axios";
import { Box, TextField, Button, Typography, Container } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";

const ContactForm = ({ theme }) => {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    subject: "",
  });

  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState("");

  const validateForm = () => {
    let newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.phone.trim()) newErrors.phone = "Phone number is required";
    else if (!/^\d{10}$/.test(formData.phone))
      newErrors.phone = "Enter a valid 10-digit phone number";

    if (!formData.email.trim()) newErrors.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email))
      newErrors.email = "Enter a valid email address";

    if (!formData.subject.trim()) newErrors.subject = "Subject is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        const response = await axios.post("http://localhost:5000/api/contacts", formData);
        setMessage("Message Sent Successfully!");
        setFormData({ name: "", phone: "", email: "", subject: "" });
      } catch (error) {
        console.error("Error sending contact data:", error);
        setMessage("Failed to send message. Try again later.");
      }
    }
  };

  return (
    <Container sx={{ backgroundColor: theme.palette.background.default }}>
      <br />
      <Box
        sx={{
          maxWidth: 500,
          margin: "auto",
          padding: 3,
          display: "flex",
          flexDirection: "column",
          gap: 2,
          boxShadow: 3,
          borderRadius: 2,
          backgroundColor: theme.palette.background.default,
          color: theme.palette.text.primary,
        }}
      >
        <Typography variant="h4" textAlign="center" gutterBottom>
          Contact Us
        </Typography>

        <TextField label="Name" name="name" variant="outlined" fullWidth value={formData.name} onChange={handleChange} error={!!errors.name} helperText={errors.name} />
        <TextField label="Phone No." name="phone" variant="outlined" fullWidth value={formData.phone} onChange={handleChange} error={!!errors.phone} helperText={errors.phone} />
        <TextField label="Email" name="email" type="email" variant="outlined" fullWidth value={formData.email} onChange={handleChange} error={!!errors.email} helperText={errors.email} />
        <TextField label="Subject" name="subject" variant="outlined" multiline rows={4} fullWidth value={formData.subject} onChange={handleChange} error={!!errors.subject} helperText={errors.subject} />

        <Button variant="contained" color="primary" fullWidth onClick={handleSubmit}>
          Send Message &nbsp; <SendIcon />
        </Button>

        {message && <Typography textAlign="center" color="green">{message}</Typography>}
      </Box>
      <br />
    </Container>
  );
};

export default ContactForm;
