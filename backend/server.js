// require("dotenv").config();

// const express = require("express");
// const cors = require("cors");
// const nodemailer = require("nodemailer");
// const multer = require("multer");
// const fs = require("fs");
// const mysql = require("mysql2");
// const path = require("path");

// const app = express();

// // =======================
// // ✅ Middleware
// // =======================
// app.use(
//   cors({
//     origin: ["*"],
//     methods: ["GET", "POST"],
//     allowedHeaders: ["Content-Type", "Authorization"],
//   })
// );
// app.use(express.json());

// // =======================
// // ✅ MySQL Connection
// // =======================
// const db = mysql.createConnection({
//   host: process.env.DB_HOST,
//   user: process.env.DB_USER,
//   password: process.env.DB_PASSWORD,
//   database: process.env.DB_NAME,
// });
// db.connect((err) => {
//   if (err) {
//     console.error("❌ Database connection failed:", err);
//   } else {
//     console.log("✅ Connected to MySQL Database");
//   }
// });

// // =======================
// // ✅ Multer Configuration
// // =======================
// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     const uploadDir = path.join(__dirname, "uploads");
//     if (!fs.existsSync(uploadDir)) {
//       fs.mkdirSync(uploadDir);
//     }
//     cb(null, uploadDir);
//   },
//   filename: function (req, file, cb) {
//     const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
//     cb(null, uniqueSuffix + "-" + file.originalname);
//   },
// });

// const fileFilter = (req, file, cb) => {
//   if (file.mimetype === "application/pdf") cb(null, true);
//   else cb(new Error("Only PDF files are allowed!"), false);
// };

// const upload = multer({ storage, fileFilter });

// // =======================
// // 🔹 Root Route
// // =======================
// app.get("/", (req, res) => {
//   res.send("✅ Email & Database API is running!");
// });

// // =======================

// // 🔹 SEND EMAIL + STORE DATA
// // =======================
// app.post("/send-email", upload.single("pdf"), async (req, res) => {
//   const { name, email, phone, message, tableDetails, grandTotal } = req.body;
//   const pdfFile = req.file;

//   if (!name || !email || !phone || !pdfFile) {
//     return res.status(400).json({
//       message: "Missing name, email, phone, or PDF file.",
//     });
//   }

//   try {
//     let tableDetailsText = "";

//     try {
//       const parsed = JSON.parse(tableDetails);
//       tableDetailsText = parsed
//         .map(
//           (section) =>
//             `${section.title}: ${section.items
//               .map((item) =>
//                 typeof item === "object"
//                   ? item.name || item.title || item.label || ""
//                   : item
//               )
//               .join(", ")}`
//         )
//         .join("\n");
//     } catch (err) {
//       console.log("⚠️ Table details parsing failed. Saving raw string.");
//       tableDetailsText = tableDetails || "";
//     }

//     const total = parseFloat(grandTotal) || 0;

//     // Insert into DB
//     const insertQuery = `
//       INSERT INTO quotations 
//       (name, email, phone, message, table_details, grand_total)
//       VALUES (?, ?, ?, ?, ?, ?)
//     `;
//     const values = [name, email, phone, message || "", tableDetailsText, total];

//     db.query(insertQuery, values, (err) => {
//       if (err) console.error("❌ DB insert error:", err);
//       else console.log("✅ Quotation saved successfully");
//     });

//     // Email transporter
//     const transporter = nodemailer.createTransport({
//       host: "smtp.hostinger.com",
//       port: 465,
//       secure: true,
//       auth: {
//         user: process.env.EMAIL_USER,
//         pass: process.env.EMAIL_PASS,
//       },
//     });

//     // Send mail to admin
//     await transporter.sendMail({
//       from: process.env.EMAIL_USER,
//       to: "info@aspireths.com",
//       subject: "New Quotation Request",
//       html: `
//         <h3>Client Details</h3>
//         <p><strong>Name:</strong> ${name}</p>
//         <p><strong>Email:</strong> ${email}</p>
//         <p><strong>Phone:</strong> ${phone}</p>
//         <p><strong>Message:</strong> ${message || "N/A"}</p>
//         <p><strong>Grand Total:</strong> ₹${total.toFixed(2)}</p>
//         <p><pre>${tableDetailsText}</pre></p>
//       `,
//       attachments: [{ filename: "Requirements_Summary.pdf", path: pdfFile.path }],
//     });

//     // Send confirmation to user
//     await transporter.sendMail({
//       from: process.env.EMAIL_USER,
//       to: email,
//       subject: `Your project Summary ${name}`,
//       text: `
// Hello ${name},

// Thank you for using Aspire TekHub's Website Cost Calculator.
// Your project summary PDF is attached.
//       `,
//       attachments: [
//         { filename: "Your_Quotation_Summary.pdf", path: pdfFile.path },
//       ],
//     });

//     fs.unlinkSync(pdfFile.path);

//     res.status(200).json({
//       message: "✅ Email sent & quotation saved successfully!",
//     });
//   } catch (error) {
//     console.error("❌ Error:", error);
//     res.status(500).json({
//       message: "Failed to send email",
//       error: error.message,
//     });
//   }
// });


// // server.js (or wherever your Express app is)
// app.get("/api/quotations", (req, res) => {
//   const query = "SELECT * FROM quotations ORDER BY id DESC";
//   db.query(query, (err, results) => {
//     if (err) {
//       console.error("❌ DB fetch error:", err);
//       return res.status(500).json({ message: "Failed to fetch quotations" });
//     }
//     res.json(results);
//   });
// });

// // =======================
// // 🔹 Start Server
// // =======================
// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => {
//   console.log(`✅ Server running on port ${PORT}`);
// });
