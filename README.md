
Website Cost Calculator

A Website Cost Calculator is a web application that helps users estimate the cost of building a website based on selected features, platforms, and requirements. It provides instant pricing insights for clients, developers, and businesses.
 🚀 Features
* 📱 Platform selection (Web, Mobile, Both)
* 🎨 UI complexity options (Basic, Standard, Advanced)
* 👥 User roles & admin panels
* 🔐 Security & authentication options
* 🔌 API & third‑party integrations
* 📊 Dynamic cost calculation
* 📄 Download or email cost summary (PDF/Excel)
* ⚡ Real‑time updates
 🛠️ Tech Stack

 Frontend
* React.js
* CSS 
* Axios
* jsPDF / html2canvas (for PDF generation)
Backend
* Node.js
* Express.js
* MySQL
* Nodemailer (email service)

 📦 Installation

 1️⃣ Clone the repository
bash
git clone https://github.com/your-username/website-cost-calculator.git
cd website-cost-calculator

 2️⃣ Install dependencies
Dependency	Purpose
express	Backend framework to build REST APIs
Mysql2    	Database connection in node.js
cors	Allows frontend to communicate with backend
dotenv	Manages environment variables securely
nodemailer    nodemailer for sending mails
axios               axios is a JavaScript dependency used to send HTTP requests from the frontend to the                               backend and handle API responses efficiently.
React-roter-dom      it is a frontend library for page navigation
•  jsPDF                  generates PDF files in the browser.
•  autoTable         plugin for creating tables inside PDFs.

Frontend

bash
cd client
npm install
npm start

Backend
bash
cd server
npm install
npm run dev

 ⚙️ Environment Variables

Create a `.env` file in the backend folder:

```env
PORT=port_number
DB_HOST=Host_name
DB_USER=user_name
DB_PASSWORD=your_password
DB_NAME=DB_name
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_email_password


 📊 How It Works

1. User selects website requirements
2. Application calculates cost dynamically
3. Final cost breakdown is displayed
4. User will receive the mail with pdf

 📁 Project Structure

website-cost-calculator/
│
├── client/        # React frontend
├── server/        # Node + Express backend
├── README.md
└── package.json
```


 🌐 Live Demo

🔗 https://website-calculator-gold.vercel.app/

🤝 Contributing

Contributions are welcome!

1. Fork the repository
2. Create a new branch (`feature/new-feature`)
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

---

 📄 License

This project is licensed under the **MIT License**.


 👨‍💻 Author

Developed by **Chandana jada **
📧 Email: chandanaj405@gmal.com
🌐 GitHub: https://github.com/jada-chandana/




