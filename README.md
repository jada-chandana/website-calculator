# Website Cost Calculator

A **Website Cost Calculator** is a full‑stack web application that helps users estimate the cost of building a website based on selected features, platforms, and requirements. It provides instant pricing insights for clients, developers, and businesses, making project planning faster and more transparent.

---

## 🚀 Features

* 📱 Platform selection (Web, Mobile, Both)
* 🎨 UI complexity options (Basic, Standard, Advanced)
* 👥 User roles and admin panel support
* 🔐 Security and authentication options
* 🔌 API and third‑party integrations
* 📊 Dynamic, real‑time cost calculation
* 📄 Download or email cost summary (PDF / Excel)
* ⚡ Instant updates based on user selections

---

## 🛠️ Tech Stack

### Frontend

* React.js
* CSS
* Axios
* jsPDF & jsPDF‑AutoTable (PDF generation)
* html2canvas
* react-router-dom

### Backend

* Node.js
* Express.js
* MySQL
* Nodemailer (email service)
* dotenv
* cors

---

## 📦 Installation

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/your-username/website-cost-calculator.git
cd website-cost-calculator
```

---

### 2️⃣ Install Dependencies

#### Backend Dependencies

| Dependency | Purpose                                  |
| ---------- | ---------------------------------------- |
| express    | Backend framework for building REST APIs |
| mysql2     | MySQL database connectivity              |
| cors       | Enables cross‑origin requests            |
| dotenv     | Secure environment variable management   |
| nodemailer | Sends emails with cost summaries         |

#### Frontend Dependencies

| Dependency       | Purpose                                            |
| ---------------- | -------------------------------------------------- |
| axios            | Handles HTTP requests between frontend and backend |
| react-router-dom | Client‑side routing                                |
| jsPDF            | Generates PDF files in the browser                 |
| jspdf-autotable  | Creates tables inside PDFs                         |

---

## ▶️ Run the Application

### Frontend

```bash
cd client
npm install
npm start
```

### Backend

```bash
cd server
npm install
npm run dev
```

---

## ⚙️ Environment Variables

Create a `.env` file inside the **server** folder and configure the following:

```env
PORT=your_port_number
DB_HOST=your_database_host
DB_USER=your_database_user
DB_PASSWORD=your_database_password
DB_NAME=your_database_name
EMAIL_USER=your_email_id
EMAIL_PASS=your_email_password
```

---

## 🌐 GitHub

🔗 **Profile:** [https://github.com/jada-chandana/](https://github.com/jada-chandana/)

---

## 📌 Summary

The Website Cost Calculator simplifies project estimation by allowing users to customize features and instantly view pricing details. Built using the MERN‑style architecture with MySQL, it demonstrates strong frontend‑backend integration, real‑time calculations, and document generation capabilities.

