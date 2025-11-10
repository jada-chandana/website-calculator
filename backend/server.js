const express = require("express");
const cors = require("cors");
const nodemailer = require("nodemailer");
const multer = require("multer");
const fs = require("fs");

const app = express();
// app.use(cors());
app.use(cors({
  origin: "http://localhost:5173",  // ✅ your React app origin
  methods: ["GET", "POST", "OPTIONS"],
  allowedHeaders: ["Content-Type"],
}));
app.use(express.json());

// 🧩 Multer setup to handle uploaded PDF
const upload = multer({ dest: "uploads/" });

// Test route
app.get("/", (req, res) => {
  res.send("✅ Email API is running!");
});

// ====== SEND EMAIL WITH ATTACHED PDF ======
app.post("/send-email", upload.single("pdf"), async (req, res) => {
  const { name, email, phone, message } = req.body;
  const pdfFile = req.file; // uploaded PDF from frontend

  if (!name || !email || !phone || !pdfFile) {
    return res
      .status(400)
      .json({ message: "Missing name, email, phone, or PDF file." });
  }

  try {
    // ✅ Configure SMTP (Hostinger)
    const transporter = nodemailer.createTransport({
      host: "smtp.hostinger.com",
      port: 465,
      secure: true,
      auth: {
        user: "info@aspireths.com",
        pass: "Aspireths@571@", // use an App Password if on Gmail
      },
    });

    // ===== 1️⃣ Send to Admin =====
    await transporter.sendMail({
      from: "info@aspireths.com",
      to: "chandanaj405@gmail.com",
      subject: "New Website Request with PDF",
      html: `
        <h3>Client Details</h3>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone}</p>
        ${
          message
            ? `<p><strong>Message:</strong> ${message}</p>`
            : "<p>No message provided.</p>"
        }
        <p>Attached is the requirements summary PDF.</p>
      `,
      attachments: [
        {
          filename: "Requirements_Summary.pdf",
          path: pdfFile.path,
        },
      ],
    });

    // ===== 2️⃣ Send confirmation to user =====
    await transporter.sendMail({
      from: "info@aspireths.com",
      to: email,
      subject: "Your Website Request Summary",
      html: `
        <h3>Hello ${name},</h3>
          <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone}</p>
         ${
          message
            ? `<p><strong>Message:</strong> ${message}</p>`
            : "<p>No message provided.</p>"
        }
        <p>Thank you for submitting your website request! We’ve attached your summary below.</p>
        <p>Our team will reach out to you shortly.</p>
        <p>— Aspire Tekhub Solutions</p>
      `,
      attachments: [
        {
          filename: "Your_Requirements_Summary.pdf",
          path: pdfFile.path,
        },
      ],
    });

    // ✅ Delete temp file after sending
    fs.unlinkSync(pdfFile.path);

    res.status(200).json({ message: "✅ Emails with PDF sent successfully!" });
  } catch (error) {
    console.error("❌ Email send error:", error);
    res
      .status(500)
      .json({ message: "Failed to send email", error: error.message });
  }
});

// ===== Start server =====
app.listen(5000, () => {
  console.log("✅ Server running on port 5000 — http://localhost:5000/");
});
