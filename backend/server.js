require("dotenv").config();

const express = require("express");
const cors = require("cors");
const nodemailer = require("nodemailer");
const multer = require("multer");
const fs = require("fs");
const mysql = require("mysql2");

const app = express();

// ✅ Middleware
app.use(
  cors({
    origin: "http://localhost:5173", // frontend origin
    methods: ["GET", "POST", "OPTIONS"],
    allowedHeaders: ["Content-Type"],
  })
);
app.use(express.json());

// ✅ MySQL Connection
const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

db.connect((err) => {
  if (err) {
    console.error("❌ Database connection failed:", err);
  } else {
    console.log("✅ Connected to MySQL Database");
  }
});

// ✅ Multer for temporary PDF uploads
const upload = multer({ dest: "uploads/" });

// 🔹 Root route
app.get("/", (req, res) => {
  res.send("✅ Email & Database API is running!");
});

// ===========================================================
// 🔹 SEND EMAIL + STORE DATA IN DATABASE
// ===========================================================
app.post("/send-email", upload.single("pdf"), async (req, res) => {
  const { name, email, phone, message, tableDetails, grandTotal } = req.body;
  const pdfFile = req.file;

  if (!name || !email || !phone || !pdfFile) {
    return res
      .status(400)
      .json({ message: "Missing name, email, phone, or PDF file." });
  }

  try {
    // ✅ Convert tableDetails JSON → readable text
    let tableDetailsText = "";
    try {
      const parsed = JSON.parse(tableDetails);
      tableDetailsText = parsed
        .map(
          (section) =>
            `${section.title}: ${section.items
              .map((item) =>
                typeof item === "object"
                  ? item.name || item.title || item.label || ""
                  : item
              )
              .join(", ")}`
        )
        .join("\n");
    } catch (err) {
      console.log("⚠️ Table details parsing failed. Saving raw string.");
      tableDetailsText = tableDetails || "";
    }

    const total = parseFloat(grandTotal) || 0;

    // ✅ Insert into MySQL
 // ✅ Insert into MySQL
const insertQuery = `
  INSERT INTO quotations 
  (name, email, phone, message, table_details, grand_total)
  VALUES (?, ?, ?, ?, ?, ?)
`;

const values = [
  name,
  email,
  phone,
  message || "",
  tableDetailsText,   // plain text version for readability
  total
];

db.query(insertQuery, values, (err) => {
  if (err) console.error("❌ DB insert error:", err);
  else console.log("✅ Quotation saved in MySQL with table details");
});

    // ✅ Configure Email
    const transporter = nodemailer.createTransport({
      host: "smtp.hostinger.com",
      port: 465,
      secure: true,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // 🔸 Send to Admin
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: "chandanaj405@gmail.com", // admin email
      subject: "New Quotation Request",
      html: `
        <h3>Client Details</h3>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone}</p>
        <p><strong>Message:</strong> ${message || "N/A"}</p>
        <p><strong>Grand Total:</strong> ₹${total.toFixed(2)}</p>
        <p><strong>Table Details:</strong><br><pre>${tableDetailsText}</pre></p>
        <p>Attached is the quotation PDF.</p>
      `,
      attachments: [{ filename: "Requirements_Summary.pdf", path: pdfFile.path }],
    });

    // 🔸 Send confirmation to User
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Your Quotation Summary",
      html: `
        <h3>Hello ${name},</h3>
        <p>Thank you for your interest in Aspire Tekhub Solutions!</p>
        <p>We’ve attached your quotation summary below.</p>
        <p>Our team will reach out to you shortly.</p>
        <p>— Aspire Tekhub Solutions</p>
      `,
      attachments: [{ filename: "Your_Quotation_Summary.pdf", path: pdfFile.path }],
    });

    // ✅ Delete temp PDF
    fs.unlinkSync(pdfFile.path);

    res
      .status(200)
      .json({ message: "✅ Email sent & quotation saved successfully!" });
  } catch (error) {
    console.error("❌ Error:", error);
    res
      .status(500)
      .json({ message: "Failed to send email", error: error.message });
  }
});

// ===========================================================
// 🔹 Start Server
// ===========================================================
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT} — http://localhost:${PORT}/`);
});
