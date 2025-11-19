
import React, { useState, useRef, useEffect } from "react";
import { useLocation } from "react-router-dom";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
// import logo from "../assets/image.png"; // ✅ Not needed; use /public/logo.png instead

const RequirementsSummaryWithContact = ({ selectedItems: propSelectedItems }) => {
  const location = useLocation();
  const [selectedItems, setSelectedItems] = useState(
    location.state?.selectedItems || propSelectedItems || {}
  );

  const tableRef = useRef();

  // ✅ Sync sidebar updates
  useEffect(() => {
    if (propSelectedItems) setSelectedItems(propSelectedItems);
  }, [propSelectedItems]);

  // --------------------------
  // 🔹 Helpers
  // --------------------------
  const getTotal = (array) =>
    !array || array.length === 0
      ? 0
      : array.reduce((acc, item) => acc + Number(item.price || 0), 0);

  const formatItemName = (item) => {
    if (typeof item === "string") return item;
    if (typeof item === "object") {
      return (
        item.name ||
        item.title ||
        item.label ||
        (item.limit ? `Limit: ${item.limit}` : "") ||
        ""
      );
    }
    return String(item);
  };

  const formatPrice = (num) =>
    "Rs." + num.toLocaleString("en-IN", { minimumFractionDigits: 2 });

  // --------------------------
  // 🔹 Prepare Data
  // --------------------------
  const { type, domain, requirements, integrations, pages, chips } = selectedItems;

  let adjustedChips = Array.isArray(chips) ? [...chips] : [];
  let extraCharge = 0;

  if (pages && Array.isArray(chips) && pages.limit !== Infinity) {
    const chipsCount = chips.length;
    const limit = pages.limit;
    if (chipsCount > limit) {
      const extraItems = chipsCount - limit;
      extraCharge = extraItems * 2000;
    }
  }

  const chipsTotal = getTotal(adjustedChips) + extraCharge;

  const data = [
    { title: "Website Type", items: type ? [type] : [] },
    { title: "Domain & Hosting", items: domain || [] },
    { title: "Number of Pages", items: pages ? [pages] : [] },
    { title: "Special Requirements", items: requirements || [] },
    { title: "Integrations", items: integrations || [] },
    { title: "Chips Input", items: adjustedChips || [] },
  ];

  const grandTotal = data.reduce((acc, section) => {
    if (section.title === "Chips Input") return acc + chipsTotal;
    return acc + getTotal(section.items);
  }, 0);

  // --------------------------
  // 🔹 PDF Generator
  // --------------------------
  const generatePdfBlob = () => {
    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();

    // Header
    doc.setFillColor(0, 74, 173);
    doc.rect(0, 0, pageWidth, 20, "F");
    doc.addImage("/AspireLogo.png", "PNG", 10, 0, 20, 20);
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(16);
    doc.text("ASPIRE TEKHUB SOLUTIONS", pageWidth / 2, 13, { align: "center" });

    const dateStr = new Date().toLocaleDateString();
    doc.setFontSize(10);
    doc.text(dateStr, pageWidth - 25, 13);

    // Title
    doc.setFontSize(14);
    doc.setTextColor(0, 74, 173);
    doc.text("REQUIREMENTS SUMMARY", pageWidth / 2, 45, { align: "center" });

    const tableBody = data.map((section) => {
      const sectionTotal =
        section.title === "Chips Input" ? chipsTotal : getTotal(section.items);
      return [
        section.title,
        section.items.length > 0
          ? section.items.map((item) => formatItemName(item)).join(", ")
          : "None selected",
        formatPrice(sectionTotal),
      ];
    });

    tableBody.push([
      {
        content: "Grand Total",
        colSpan: 2,
        styles: { halign: "right", fontStyle: "bold", textColor: [0, 74, 173] },
      },
      {
        content: formatPrice(grandTotal),
        styles: { halign: "right", fontStyle: "bold", textColor: [0, 74, 173] },
      },
    ]);

    autoTable(doc, {
      startY: 55,
      head: [["Category", "Selected Items", "Price (Rs.)"]],
      body: tableBody,
      theme: "grid",
      styles: { fontSize: 10, cellPadding: 5 },
      headStyles: { fillColor: [0, 74, 173], textColor: 255, halign: "center" },
      columnStyles: {
        0: { cellWidth: 50 },
        1: { cellWidth: 90 },
        2: { cellWidth: 40, halign: "right" },
      },
    });

    // Footer
    doc.setFillColor(0, 74, 173);
    doc.rect(0, pageHeight - 25, pageWidth, 25, "F");
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(9);
    doc.text(
      "Corporate Office: 1-8-303, 3rd Floor, VK Towers, SP Road, Rasoolpura, Secunderabad - 500003",
      pageWidth / 2,
      pageHeight - 15,
      { align: "center" }
    );
    doc.text(
      "040 4519 5642  |  info@aspireths.com  |  www.aspireths.com",
      pageWidth / 2,
      pageHeight - 8,
      { align: "center" }
    );

    return doc.output("blob");
  };

  // --------------------------
  // 🔹 Contact Form
  // --------------------------
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    additionalRequirements: "",
  });
  const [loading, setLoading] = useState(false);
console.log("Sending to backend...");
console.log({
  name: formData.name,
  email: formData.email,
  phone: formData.phone,
  tableDetails: data,
  grandTotal,
});

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.phone) {
      alert("Please fill all fields!");
      return;
    }

    try {
      setLoading(true);

      const pdfBlob = generatePdfBlob();

      const formDataToSend = new FormData();
      formDataToSend.append("name", formData.name);
      formDataToSend.append("email", formData.email);
      formDataToSend.append("phone", formData.phone);
      formDataToSend.append("message", formData.additionalRequirements || "");
      formDataToSend.append("tableDetails", JSON.stringify(data)); // ✅ JSON string
      formDataToSend.append("grandTotal", grandTotal); // ✅ number or string
      formDataToSend.append("pdf", pdfBlob, "Requirements_Summary.pdf");

      const response = await fetch("http://localhost:5000/send-email", {
        method: "POST",
        body: formDataToSend,
      });

      const result = await response.json();

      if (response.ok) {
        alert("✅ Quotation saved & email sent successfully!");
        setFormData({ name: "", email: "", phone: "", additionalRequirements: "" });
      } else {
        alert("❌ Failed: " + result.message);
      }
    } catch (error) {
      console.error("Error:", error);
      alert("❌ Something went wrong while sending email. Check backend & CORS.");
    } finally {
      setLoading(false);
    }
  };


  // --------------------------
  // 🔹 UI
  // --------------------------
  return (
    <div style={{ padding: "20px", maxWidth: "900px", margin: "auto" }}>
      <h2 style={{ color: "#004aad", textAlign: "center" }}>Requirements Summary</h2>

      {/* Table */}
      <div ref={tableRef}>
        <table
          style={{
            width: "70%",
            borderCollapse: "collapse",
            marginTop: "15px",
          }}
        >
          <thead>
            <tr style={{ backgroundColor: "#004aad", color: "#fff" }}>
              <th style={{ padding: "8px", border: "1px solid #ddd" }}>Category</th>
              <th style={{ padding: "8px", border: "1px solid #ddd" }}>Selected Items</th>
              <th style={{ padding: "8px", border: "1px solid #ddd" }}>Price (Rs.)</th>
            </tr>
          </thead>
          <tbody>
            {data.map((section, index) => {
              const sectionTotal =
                section.title === "Chips Input" ? chipsTotal : getTotal(section.items);
              return (
                <tr key={index}>
                  <td style={{ padding: "8px", border: "1px solid #ddd" }}>{section.title}</td>
                  <td style={{ padding: "8px", border: "1px solid #ddd" }}>
                    {section.items.length > 0
                      ? section.items.map((item) => formatItemName(item)).join(", ")
                      : "None selected"}
                  </td>
                  <td style={{ padding: "8px", border: "1px solid #ddd" }}>
                    {formatPrice(sectionTotal)}
                  </td>
                </tr>
              );
            })}
            <tr
              style={{
                backgroundColor: "#004aad",
                color: "#fff",
                fontWeight: "bold",
              }}
            >
              <td colSpan="2" style={{ padding: "8px", border: "1px solid #ddd" }}>
                Grand Total
              </td>
              <td style={{ padding: "8px", border: "1px solid #ddd" }}>
                {formatPrice(grandTotal)}
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Contact Form */}
      <div
        {/* style={{
          backgroundColor: "white",
          marginTop: "40px",
          padding: "30px",
          borderRadius: "10px",
          boxShadow: "0 4px 15px rgba(0,0,0,0.1)",
          textAlign: "center",
          width: "70%",
          marginLeft: "auto",
          marginRight: "auto", */}
      width: "70%",
            borderCollapse: "collapse",
            marginTop: "15px",
            backgroundColor: "white",
          marginTop: "40px",
          borderRadius: "10px",
          boxShadow: "0 4px 15px rgba(0,0,0,0.1)",
          paddingLeft:"10px",
          paddingRight:"10px",
          paddingTop:"10px",
          paddingBottom:"10px",
        }}
      >
        <h3 style={{ color: "#004aad", marginBottom: "20px" }}>
          Where should we send you the detailed estimate?
        </h3>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            required
            style={{
              width: "100%",
              padding: "10px",
              marginBottom: "15px",
              borderRadius: "5px",
              border: "1px solid #ccc",
            }}
          />
          <input
            type="email"
            placeholder="Email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            required
            style={{
              width: "100%",
              padding: "10px",
              marginBottom: "15px",
              borderRadius: "5px",
              border: "1px solid #ccc",
            }}
          />
          <input
            type="tel"
            placeholder="Phone"
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            required
            style={{
              width: "100%",
              padding: "10px",
              marginBottom: "15px",
              borderRadius: "5px",
              border: "1px solid #ccc",
            }}
          />
          <textarea
            placeholder="Additional Requirements (optional)"
            value={formData.additionalRequirements}
            onChange={(e) =>
              setFormData({ ...formData, additionalRequirements: e.target.value })
            }
            rows={4}
            style={{
              width: "100%",
              padding: "10px",
              marginBottom: "20px",
              borderRadius: "5px",
              border: "1px solid #ccc",
            }}
          />
          <div style={{ textAlign: "center" }}>
            <button
              type="submit"
              disabled={loading}
              style={{
                backgroundColor: "#004aad",
                color: "white",
                padding: "12px 30px",
                border: "none",
                borderRadius: "6px",
                cursor: "pointer",
                fontWeight: "bold",
              }}
            >
              {loading ? "Sending..." : "Send Quotation"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RequirementsSummaryWithContact;
