const express = require("express");
const ExcelJS = require("exceljs");
const Blog = require("../models/Blog.model");
const Contact = require("../models/Contact.model");
const User = require("../models/User.model");
const Appointment = require("../models/Appointment.model");
const Card = require("../models/Card.model");
const Course = require("../models/Course.model");

const router = express.Router();

// Function to generate and send Excel file
const exportDataToExcel = async (req, res) => {
  try {
    const workbook = new ExcelJS.Workbook();

    // 📌 Fetch data from DB
    const blogs = await Blog.find();
    const contacts = await Contact.find();
    const users = await User.find();
    const appointments = await Appointment.find();
    const cards = await Card.find();
    const courses = await Course.find();

    // 📌 Define table structure
    const sheets = [
      { 
        name: "Blogs", 
        data: blogs, 
        headers: ["Title", "Description", "Content", "Cover Image URL", "Created At", "Updated At"], 
        keys: ["title", "description", "content", "coverImage", "createdAt", "updatedAt"]
      },
      { 
        name: "Contacts", 
        data: contacts, 
        headers: ["Name", "Phone", "Email", "Subject", "Created At", "Updated At"], 
        keys: ["name", "phone", "email", "subject", "createdAt", "updatedAt"]
      },
      { 
        name: "Users", 
        data: users, 
        headers: ["Name", "Email", "Profile Image URL", "Created At", "Updated At"], 
        keys: ["name", "email", "image", "createdAt", "updatedAt"]
      },
      { 
        name: "Appointments", 
        data: appointments, 
        headers: ["Name", "Email", "Date", "Time Slot", "Status", "Notes", "Created At"], 
        keys: ["name", "email", "date", "timeSlot", "status", "notes", "createdAt"]
      },
      { 
        name: "Courses", 
        data: courses, 
        headers: ["Title", "Description", "Image URL", "Category"], 
        keys: ["title", "description", "image", "category"]
      },
      { 
        name: "Cards", 
        data: cards, 
        headers: ["Title", "Description", "Image URL", "Link URL", "Created At", "Updated At"], 
        keys: ["title", "description", "image", "linkUrl", "createdAt", "updatedAt"]
      }
    ];

    // 📌 Generate sheets
    sheets.forEach(({ name, data, headers, keys }) => {
      const sheet = workbook.addWorksheet(name);
      
      // Add headers
      sheet.addRow(headers);

      // Add data rows
      data.forEach((item, rowIndex) => {
        const rowData = keys.map((key) => item[key] || ""); // Handle empty values
        const row = sheet.addRow(rowData);

        // Make Image URLs Clickable
        const imageColumnIndex = keys.indexOf("coverImage") + 1 || 
                                 keys.indexOf("profileImage") + 1 ||
                                 keys.indexOf("image") + 1;
        
        if (imageColumnIndex > 0 && item[keys[imageColumnIndex - 1]]) {
          const cell = sheet.getCell(rowIndex + 2, imageColumnIndex); // +2 because row 1 is headers
          cell.value = {
            text: "View Image",
            hyperlink: item[keys[imageColumnIndex - 1]],
          };
          cell.font = { color: { argb: "FF0000FF" }, underline: true };
        }
      });
    });

    // 📌 Send file
    res.setHeader("Content-Disposition", "attachment; filename=dashboard_data.xlsx");
    res.setHeader("Content-Type", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");

    await workbook.xlsx.write(res);
    res.end();
  } catch (error) {
    console.error("Error exporting data:", error);
    res.status(500).json({ error: "Failed to export data" });
  }
};

// 📌 API Route to download Excel file
router.get("/data", exportDataToExcel);

module.exports = router;
