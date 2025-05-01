const mongoose = require("mongoose");
const moment = require("moment");

const ClosedSlotSchema = new mongoose.Schema({
  date: { type: String, required: true, unique: true }, // Specific date to be closed
  timeSlots: [{ type: String }], // List of closed time slots for that date
});

ClosedSlotSchema.pre("save", function (next) {
  this.date = moment(this.date).format("YYYY-MM-DD"); // Ensure format before saving
  next();
});

module.exports = mongoose.model("ClosedSlot", ClosedSlotSchema);
