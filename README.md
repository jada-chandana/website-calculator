# Website Cost Calculator

A **Website Cost Calculator** is a full-stack web application that helps users estimate the cost of building a website based on selected features, platforms, and requirements. It provides instant pricing insights for clients, developers, and businesses.

---

## 🚀 Features

* 📱 Platform selection (Web, Mobile, Both)
* 🎨 UI complexity options (Basic, Standard, Advanced)
* 👥 User roles and admin panels
* 🔐 Security and authentication options
* 🔌 API and third-party integrations
* 📊 Dynamic cost calculation
* 📄 Download or email cost summary (PDF / Excel)
* ⚡ Real-time updates

---

## 🛠️ Tech Stack

### Frontend

* React.js
* CSS
* Axios
* jsPDF / html2canvas (for PDF generation)
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

| Dependency | Purpose                                     |
| ---------- | ------------------------------------------- |
| express    | Backend framework to build REST APIs        |
| mysql2     | Database connection in Node.js              |
| cors       | Allows frontend to communicate with backend |
| dotenv     | Manages environment variables securely      |
| nodemailer | Sends emails with PDF summaries             |

#### Frontend Dependencies

| Dependency       | Purpose                                       |
| ---------------- | --------------------------------------------- |
| axios            | Sends HTTP requests and handles API responses |
| react-router-dom | Frontend routing and navigation               |
| jsPDF            | Generates PDF files in the browser            |
| jspdf-autotable  | Creates tables inside PDFs                    |

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

Create a `.env` file inside the **server** folder:

```env
PORT=port_number
DB_HOST=host_name
DB_USER=user_name
DB_PASSWORD=your_password
DB_NAME=db_name
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_email_password
```

---

## 📊 How It Works

1. User selects website requirements and features
2. Application calculates the cost dynamically
3. Final cost breakdown is displayed instantly
4. User receives the detailed cost summary via email in PDF format

---

## 📁 Project Structure

```bash
website-cost-calculator/
│
├── client/        # React frontend
├── server/        # Node.js + Express backend
├── README.md
└── package.json
```

---

## 🌐 Live Demo

🔗 [https://website-calculator-gold.vercel.app/](https://website-calculator-gold.vercel.app/)

---

## 🤝 Contributing

Contributions are welcome!

1. Fork the repository
2. Create a new branch (`feature/new-feature`)
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

---

## 📄 License

This project is licensed under the **MIT License**.

---

## 👨‍💻 Author

Developed by **Chandana Jada**
📧 Email: [chandanaj405@gmail.com](mailto:chandanaj405@gmail.com)
🌐 GitHub: [https://github.com/jada-chandana/](https://github.com/jada-chandana/)
