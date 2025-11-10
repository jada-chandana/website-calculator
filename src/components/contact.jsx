// import React, { useState } from "react";
// import { useLocation } from "react-router-dom";
// import jsPDF from "jspdf";
// import autoTable from "jspdf-autotable"; // ✅ named import

// const Contact = ({ handleDownload, selectedItems }) => {
//   const location = useLocation();
//   const items = location.state?.selectedItems || selectedItems || {};

//   // ✅ Destructure all fields (including pages & chips)
//   const { type, domain, requirements, integrations, pages, chips } = items;

//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     phone: "",
//     additionalRequirements: "",
//   });

//   const [loading, setLoading] = useState(false);

//   // ✅ Helper function
//   const getTotal = (array) =>
//     !array || array.length === 0
//       ? 0
//       : array.reduce((acc, item) => acc + Number(item.price || 0), 0);

//   // ✅ Data including pages & chips
//   const data = [
//     { title: "Website Type", items: type ? [type] : [] },
//     { title: "Domain & Hosting", items: domain || [] },
//     { title: "Number of Pages", items: pages ? [pages] : [] },
//     { title: "Special Requirements", items: requirements || [] },
//     { title: "Integrations", items: integrations || [] },
//     { title: "Chips Input", items: chips || [] },
//   ];

//   const grandTotal = data.reduce(
//     (acc, section) => acc + getTotal(section.items),
//     0
//   );

//   // ✅ Generate PDF with Grand Total
//   const generatePdfBlob = () => {
//     const doc = new jsPDF();

//     const tableBody = data.map((section) => [
//       section.title,
//       section.items.length > 0
//         ? section.items.map((i) => i.name || i).join(", ")
//         : "None selected",
//       `Rs.${getTotal(section.items).toFixed(2)}`,
//     ]);

//     // ✅ Grand Total row
//     tableBody.push([
//       {
//         content: "Grand Total",
//         colSpan: 2,
//         styles: { halign: "right", fontStyle: "bold", textColor: [0, 74, 173] },
//       },
//       {
//         content: `Rs.${grandTotal.toFixed(2)}`,
//         styles: { halign: "right", fontStyle: "bold", textColor: [0, 74, 173] },
//       },
//     ]);

//     autoTable(doc, {
//       head: [["Category", "Selected Items", "Price (Rs.)"]],
//       body: tableBody,
//       startY: 45,
//       theme: "grid",
//       styles: { fontSize: 10, font: "helvetica" },
//       headStyles: { fillColor: [0, 74, 173] },
//     });

//     return doc.output("blob");
//   };

//   // ✅ Handle form submit + send PDF via email
//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!formData.name || !formData.email || !formData.phone) {
//       alert("Please fill all fields!");
//       return;
//     }

//     try {
//       setLoading(true);
//       const pdfBlob = generatePdfBlob();

//       const formDataToSend = new FormData();
//       formDataToSend.append("name", formData.name);
//       formDataToSend.append("email", formData.email);
//       formDataToSend.append("phone", formData.phone);
//       formDataToSend.append("message", formData.additionalRequirements);
//       formDataToSend.append("pdf", pdfBlob, "Requirements_Summary.pdf");

//       const res = await fetch("http://localhost:5000/send-email", {
//         method: "POST",
//         body: formDataToSend,
//       });

//       const result = await res.json();

//       if (res.ok) {
//         alert("✅ Email sent successfully with attached PDF!");
//         setFormData({
//           name: "",
//           email: "",
//           phone: "",
//           additionalRequirements: "",
//         });
//       } else {
//         alert("❌ Failed to send email: " + result.message);
//       }
//     } catch (error) {
//       console.error("Error:", error);
//       alert("❌ Something went wrong while sending email.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div style={{ padding: "20px", maxWidth: "400px", margin: "auto" }}>
//       <h2>Contact Form</h2>
//       <form onSubmit={handleSubmit}>
//         <input
//           type="text"
//           placeholder="Name"
//           value={formData.name}
//           onChange={(e) => setFormData({ ...formData, name: e.target.value })}
//           required
//         />
//         <br />
//         <br />
//         <input
//           type="email"
//           placeholder="Email"
//           value={formData.email}
//           onChange={(e) => setFormData({ ...formData, email: e.target.value })}
//           required
//         />
//         <br />
//         <br />
//         <input
//           type="tel"
//           placeholder="Phone"
//           value={formData.phone}
//           onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
//           required
//         />
//         <br />
//         <br />
//         <textarea
//           placeholder="Additional Requirements (optional)"
//           value={formData.additionalRequirements}
//           onChange={(e) =>
//             setFormData({
//               ...formData,
//               additionalRequirements: e.target.value,
//             })
//           }
//           rows={4}
//           style={{ width: "100%" }}
//         />
//         <br />
//         <br />
//         <button type="submit" disabled={loading}>
//           {loading ? "Sending..." : "Send Email"}
//         </button>
//       </form>

//       {/* ✅ Show Total Price on UI */}
//       {/* <h3 style={{ marginTop: "20px", color: "#004aad" }}>
//         Total Price: Rs.{grandTotal.toFixed(2)}
//       </h3> */}
//     </div>
//   );
// };

// export default Contact;
import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import logo from "../assets/image.png";
// ✅ Utility function to generate PDF blob
export const generatePdfBlob = (selectedItems) => {
  const { type, domain, pages, requirements, integrations, chips } = selectedItems;
    let extraCharge = 0;
  if (pages && Array.isArray(chips) && pages.limit !== Infinity) {
    const chipsCount = chips.length;
    const limit = pages.limit;
    if (chipsCount > limit) {
      const extraItems = chipsCount - limit;
      extraCharge = extraItems * 2000;
    }
  }

  const data = [
    { title: "Website Type", items: type ? [type] : [] },
    { title: "Domain & Hosting", items: domain || [] },
    { title: "Number of Pages", items: pages ? [pages] : [] },
    { title: "Special Requirements", items: requirements || [] },
    { title: "Integrations", items: integrations || [] },
    { title: "Chips Input", items: chips || [] },
  ];
  if (extraCharge > 0) {
  data.push({
    title: "Extra Charges",
    items: [{ name: "Additional Chips beyond page limit", price: extraCharge }],
  });
}

  const getTotal = (array) =>
    !array || array.length === 0
      ? 0
      : array.reduce((acc, item) => acc + Number(item.price || 0), 0);

const grandTotal =
  data.reduce((acc, section) => acc + getTotal(section.items), 0) + extraCharge;


  const doc = new jsPDF();
  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
 

  // 🟦 Header
  doc.setFillColor(0, 74, 173);
  doc.rect(0, 0, pageWidth, 20, "F");
   doc.addImage(logo, "PNG", 10, 0, 20, 20);
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(16);
  doc.setFont("helvetica", "bold");
  doc.text("ASPIRE TEKHUB SOLUTIONS", pageWidth / 2, 13, { align: "center" });

  // 🗓️ Date + Title
 const dateStr = new Date().toLocaleDateString();
  doc.setFontSize(10);
  doc.setFont("helvetica", "normal");
  const dateWidth = doc.getTextWidth(dateStr);
  doc.text(dateStr, pageWidth - dateWidth - 10, 13);

  doc.setFontSize(14);
  doc.setTextColor(0, 74, 173);
  doc.text("REQUIREMENTS SUMMARY", pageWidth / 2, 45, { align: "center" });

  // Format price
  const formatPrice = (num) =>
    "Rs." + num.toLocaleString("en-IN", { minimumFractionDigits: 2 });

  // Build table
  const tableBody = data.map((section) => [
    section.title,
    section.items.length > 0
      ? section.items.map((i) => i?.name ?? i).join(", ")
      : "None selected",
    formatPrice(getTotal(section.items)),
  ]);

  // Add Grand Total row
  tableBody.push([
    {
      content: "Grand Total",
      colSpan: 2,
      styles: { halign: "right", fontStyle: "bold", textColor: [0, 74, 173] },
    },
    { content: formatPrice(grandTotal), styles: { halign: "right", fontStyle: "bold", textColor: [0, 74, 173] } },
  ]);

  autoTable(doc, {
    startY: 55,
    head: [["Category", "Selected Items", "Price (Rs.)"]],
    body: tableBody,
    theme: "grid",
    styles: { fontSize: 10, cellPadding: 5, font: "helvetica" },
    headStyles: { fillColor: [0, 74, 173], textColor: 255, halign: "center" },
    columnStyles: {
  0: { cellWidth: 50 },   // Category
  1: { cellWidth: 90 },   // Selected Items
  2: { cellWidth: 40, halign: "right" }, // Price column wider
},

  });

  // Total below table
  // const finalY = doc.lastAutoTable.finalY + 10;
  // doc.setFontSize(12);
  // doc.setTextColor(0, 74, 173);
  // doc.text(`Total Price: ${formatPrice(grandTotal)}`, 14, finalY);

  // 🩵 Footer
  const footerHeight = 25;
  doc.setFillColor(0, 74, 173);
  doc.rect(0, pageHeight - footerHeight, pageWidth, footerHeight, "F");
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(9);
  doc.text(
    "Corporate Office: 1-8-303, 3rd Floor, VK Towers, SP Road, Rasoolpura, Secunderabad - 500003",
    pageWidth / 2,
    pageHeight - 15,
    { align: "center" }
  );
  doc.text(
    " 040 4519 5642  |   info@aspireths.com  |  www.aspireths.com",
    pageWidth / 2,
    pageHeight - 8,
    { align: "center" }
  );

  return doc.output("blob");
};

const Contact = ({ selectedItems, handleDownload }) => {
  const location = useLocation();
  const items = location.state?.selectedItems || selectedItems || {};

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    additionalRequirements: "",
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.phone) {
      alert("Please fill all fields!");
      return;
    }

    try {
      setLoading(true);
      const pdfBlob = generatePdfBlob(items);

      const formDataToSend = new FormData();
      formDataToSend.append("name", formData.name);
      formDataToSend.append("email", formData.email);
      formDataToSend.append("phone", formData.phone);
      formDataToSend.append("message", formData.additionalRequirements);
      formDataToSend.append("pdf", pdfBlob, "Requirements_Summary.pdf");

      const res = await fetch("http://localhost:5000/send-email", {
        method: "POST",
        body: formDataToSend,
      });

      const result = await res.json();
      if (res.ok) {
        alert("✅ Email sent successfully with attached PDF!");
        setFormData({ name: "", email: "", phone: "", additionalRequirements: "" });
      } else {
        alert("❌ Failed to send email: " + result.message);
      }
    } catch (err) {
      console.error(err);
      alert("❌ Something went wrong while sending email.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: "20px", maxWidth: "400px", margin: "auto" }}>
      <h2>Contact Form</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          required
        />
        <br /><br />
        <input
          type="email"
          placeholder="Email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          required
        />
        <br /><br />
        <input
          type="tel"
          placeholder="Phone"
          value={formData.phone}
          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
          required
        />
        <br /><br />
        <textarea
          placeholder="Additional Requirements (optional)"
          value={formData.additionalRequirements}
          onChange={(e) => setFormData({ ...formData, additionalRequirements: e.target.value })}
          rows={4}
          style={{ width: "100%" }}
        />
        <br /><br />
        <button type="submit" disabled={loading}>
          {loading ? "Sending..." : "Send Email"}
        </button>
      </form>
    </div>
  );
};

export default Contact;
