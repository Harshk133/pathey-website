const express = require('express');
const router = express.Router();
const Appointment = require('../models/Appointment.model');
const ClosedSlot = require('../models/ClosedSlot.model');
const authMiddleware = require('../middleware/authMiddleware.middleware');

// Fetch all closed slots (specific route first)
router.get("/closed-slots", async (req, res) => {
  console.log("Fetching closed slots");
  try {
    const closedSlots = await ClosedSlot.find();
    console.log("Closed slots fetched:", closedSlots);
    res.status(200).json(closedSlots);
  } catch (error) {
    console.error("Error fetching closed slots:", error);
    res.status(500).json({ error: error.message });
  }
});

// Reopen a date or time slot
router.delete("/reopen", async (req, res) => {
  const { date, timeSlot } = req.body;
  console.log("Reopening request:", { date, timeSlot });
  try {
    const closedSlot = await ClosedSlot.findOne({ date });
    if (!closedSlot) {
      return res.status(404).json({ message: "No closed slots found for this date." });
    }

    if (timeSlot) {
      closedSlot.timeSlots = closedSlot.timeSlots.filter((slot) => slot !== timeSlot);
      if (closedSlot.timeSlots.length === 0) {
        await ClosedSlot.deleteOne({ date });
        console.log("Deleted closed slot document for:", date);
      } else {
        await closedSlot.save();
        console.log("Updated closed slot:", closedSlot);
      }
    } else {
      await ClosedSlot.deleteOne({ date });
      console.log("Deleted closed slot document for entire day:", date);
    }

    res.status(200).json({ message: "Date/time slot reopened successfully!" });
  } catch (error) {
    console.error("Error reopening slot:", error);
    res.status(500).json({ error: error.message });
  }
});

router.get("/analysis", async (req, res) => {
  try {
    // Fetch all appointments
    const appointments = await Appointment.find();

    // Count appointments based on their statuses
    const statusCounts = appointments.reduce((acc, appointment) => {
      const status = appointment.status || "Unknown"; // Handle missing status
      acc[status] = (acc[status] || 0) + 1;
      return acc;
    }, {});

    // Prepare labels and data for the chart
    const chartData = {
      labels: Object.keys(statusCounts), // ["Completed", "Pending", "Rescheduled", "Canceled", ...]
      datasets: [
        {
          label: "Appointment Status",
          data: Object.values(statusCounts), // [count of Completed, Pending, Rescheduled, ...]
          backgroundColor: [
            "#4caf50", // Green for Completed
            "#ff9800", // Orange for Pending
            "#2196f3", // Blue for Rescheduled
            "#f44336", // Red for Canceled
            "#9e9e9e" // Gray for Unknown or additional statuses
          ].slice(0, Object.keys(statusCounts).length), // Slice to match the number of labels
        },
      ],
    };

    // Calculate total appointments
    const total = appointments.length;

    res.json({
      total,
      statusCounts, // Include raw counts of each status
      chartData,
    });
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch appointment metrics" });
  }
});


// // Create Appointment ✅
// router.post('/', async (req, res) => {
//   // const { name, email, phone, date, timeSlot, notes } = req.body;
//   const { name, email, date, timeSlot, notes } = req.body;

//   try {
//     const newAppointment = new Appointment({
//       name,
//       email,
//       // phone,
//       date,
//       timeSlot,
//       notes,
//     });

//     await newAppointment.save();
//     res.status(201).json({ message: "Appointment booked successfully!" });
//   } catch (error) {
//     res.status(400).json({
//       message: error.message || "Failed to book appointment",
//     });
//   }
// });

// Create Appointment (Booking) ✅
// router.post("/", async (req, res) => {
//   const { name, email, date, timeSlot, notes } = req.body;

//   try {
//     // Check if the date or time slot is closed
//     const closedSlot = await ClosedSlot.findOne({ date });
//     console.log("the closed slots are", closedSlot);

//     if (closedSlot) {
//       if (closedSlot.timeSlots.length === 0) {
//         return res.status(400).json({ message: "Booking is not allowed on this date." });
//       }

//       if (closedSlot.timeSlots.includes(timeSlot)) {
//         return res.status(400).json({ message: `Time slot ${timeSlot} is not available for booking.` });
//       }
//     }

//     // Proceed with booking if the date and time slot are available
//     const newAppointment = new Appointment({
//       name,
//       email,
//       date,
//       timeSlot,
//       notes,
//     });

//     await newAppointment.save();
//     res.status(201).json({ message: "Appointment booked successfully!" });
//   } catch (error) {
//     res.status(400).json({
//       message: error.message || "Failed to book appointment",
//     });
//   }
// });
router.post("/", async (req, res) => {
  const { name, email, date, timeSlot, notes } = req.body;
  try {
    const closedSlot = await ClosedSlot.findOne({ date });
    if (closedSlot) {
      if (closedSlot.timeSlots.length === 0) {
        return res.status(400).json({ message: "Booking is not allowed on this date." });
      }
      if (closedSlot.timeSlots.includes(timeSlot)) {
        return res.status(400).json({ message: `Time slot ${timeSlot} is not available.` });
      }
    }
    const newAppointment = new Appointment({ name, email, date, timeSlot, notes });
    await newAppointment.save();
    res.status(201).json({ message: "Appointment booked successfully!" });
  } catch (error) {
    res.status(400).json({ message: error.message || "Failed to book appointment" });
  }
});


// Get All Appointments ✅
router.get('/', async (req, res) => {
  try {
    const appointments = await Appointment.find();
    res.status(200).json(appointments);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get Appointment by ID ✅
router.get('/:id', async (req, res) => {
  try {
    const appointment = await Appointment.findById(req.params.id);
    if (!appointment) {
      return res.status(404).json({ error: 'Appointment not found' });
    }
    res.status(200).json(appointment);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update Appointment (e.g., changing status, rescheduling) ✅
router.put('/:id', async (req, res) => {
  try {
    const { status, date, timeSlot, notes } = req.body;
    
    // You can update any fields based on your requirement
    const updatedAppointment = await Appointment.findByIdAndUpdate(
      req.params.id,
      { status, date, timeSlot, notes },
      { new: true }
    );

    if (!updatedAppointment) {
      return res.status(404).json({ error: 'Appointment not found' });
    }

    res.status(200).json({
      message: 'Appointment updated successfully!',
      updatedAppointment,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete Appointment ✅
router.delete('/:id', async (req, res) => {
  try {
    const appointment = await Appointment.findByIdAndDelete(req.params.id);
    if (!appointment) {
      return res.status(404).json({ error: 'Appointment not found' });
    }
    res.status(200).json({ message: 'Appointment deleted successfully!' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});



// Get Appointments by Status (filter by status) ✅
router.get('/status/:status', async (req, res) => {
  const { status } = req.params;
  try {
    const appointments = await Appointment.find({ status });
    res.status(200).json(appointments);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get Appointments by Date Range ✅
router.get('/date/:startDate/:endDate', async (req, res) => {
  const { startDate, endDate } = req.params;
  try {
    const appointments = await Appointment.find({
      date: { $gte: new Date(startDate), $lte: new Date(endDate) },
    });
    res.status(200).json(appointments);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get Appointments by Specific Date
router.get('/date/:date', async (req, res) => {
  try {
    const { date } = req.params;
    
    // Convert the string date to a Date object (assuming date is in 'YYYY-MM-DD' format)
    const startOfDay = new Date(date);
    const endOfDay = new Date(date);
    endOfDay.setHours(23, 59, 59, 999); // End of the day
    
    // Query to find appointments within that specific date range
    const appointments = await Appointment.find({
      date: { $gte: startOfDay, $lte: endOfDay }
    });

    res.status(200).json(appointments);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// // Close a Date or Time Slot ✅
// router.post("/close", async (req, res) => {
//   const { date, timeSlots } = req.body; // timeSlots is optional

//   try {
//     let closedSlot = await ClosedSlot.findOne({ date });

//     if (!closedSlot) {
//       closedSlot = new ClosedSlot({ date, timeSlots: timeSlots || [] });
//     } else {
//       closedSlot.timeSlots = timeSlots || [];
//     }

//     await closedSlot.save();
//     res.status(200).json({ message: "Date and time slots closed successfully!" });
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// });



// router.get("/closed-slots", async (req, res) => {
//   try {
//     const closedSlots = await ClosedSlot.find();
//     res.status(200).json(closedSlots);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// });

// Close a Date or Time Slot (with auth)
router.post("/close", async (req, res) => {
  const { date, timeSlots } = req.body;

  if (!date) return res.status(400).json({ message: "Date is required" });
  if (timeSlots && !Array.isArray(timeSlots)) return res.status(400).json({ message: "timeSlots must be an array" });

  try {
    let closedSlot = await ClosedSlot.findOne({ date });

    if (!closedSlot) {
      closedSlot = new ClosedSlot({ date, timeSlots: timeSlots || [] });
    } else {
      closedSlot.timeSlots = timeSlots || [];
    }

    await closedSlot.save();
    res.status(200).json({ message: "Date and time slots closed successfully!", closedSlot });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// // Fetch all closed slots (for dashboard)
// router.get("/closed-slots", async (req, res) => {
//   try {
//     const closedSlots = await ClosedSlot.find();
//     res.status(200).json(closedSlots);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// });

router.get("/:id", async (req, res) => {
  try {
    const closedSlot = await ClosedSlot.findById(req.params.id);
    if (!closedSlot) {
      return res.status(404).json({ error: "Closed slot not found" });
    }
    res.json(closedSlot);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});



module.exports = router;
