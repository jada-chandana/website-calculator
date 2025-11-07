// import React, { useRef } from "react";
// import { useNavigate } from "react-router-dom";
// import jsPDF from "jspdf";
// import html2canvas from "html2canvas"; // ✅ NEW import
// import "jspdf-autotable";

// const RequirementsTable = ({ selectedItems = {} }) => {
//   const navigate = useNavigate();
//   const tableRef = useRef(); // ✅ reference to the table

//   const { type, domain, requirements, integrations, chips } = selectedItems;

//   // ✅ Calculate total for each section
//   const getTotal = (array) => {
//     if (!array || array.length === 0) return 0;
//     return array.reduce((acc, item) => acc + Number(item.price || 0), 0);
//   };

//   // ✅ Organize data (same as your UI table)
//   const data = [
//     { title: "Website Type", items: type ? [type] : [] },
//     { title: "Domain & Hosting", items: domain || [] },
//     { title: "Special Requirements", items: requirements || [] },
//     { title: "Integrations", items: integrations || [] },
//    { title: "Chips Input", items: chips || [] },
//   ];

//   const grandTotal = data.reduce((acc, section) => acc + getTotal(section.items), 0);

//   // ✅ Navigate to contact
//   const handleNext = () => {
//     navigate("/contact", { state: { selectedItems } });
//   };

//   // ✅ Capture styled table using html2canvas
//   const handleDownload = async () => {
//     const input = tableRef.current;
//     const pdf = new jsPDF("p", "mm", "a4");
//     const pageWidth = pdf.internal.pageSize.getWidth();

//     // Add header
//     pdf.setFontSize(16);
//     pdf.setTextColor(0, 74, 173);
//     pdf.text("ASPIRE TEKHUB SOLUTIONS", pageWidth / 2, 15, { align: "center" });
//     pdf.setFontSize(10);
//     pdf.setTextColor(80);
//     pdf.text(
//       "Corporate Office: 1-8-303, 3rd Floor, VK Towers, SP Road, RasoolPura, Secunderabad - 500003",
//       pageWidth / 2,
//       22,
//       { align: "center" }
//     );
//     pdf.text("040 4519 5642 | info@aspireths.com | www.aspireths.com", pageWidth / 2, 28, {
//       align: "center",
//     });

//     // Add Date & Title
//     pdf.setFontSize(11);
//     pdf.setTextColor(0);
//     pdf.text(`Date: ${new Date().toLocaleDateString()}`, 14, 38);
//     pdf.setFontSize(13);
//     pdf.setTextColor(0, 74, 173);
//     pdf.text("REQUIREMENTS SUMMARY", pageWidth / 2, 45, { align: "center" });

//     // Use html2canvas to capture the table
//     const canvas = await html2canvas(input, { scale: 2 });
//     const imgData = canvas.toDataURL("image/png");
//     const imgWidth = pageWidth - 20;
//     const imgHeight = (canvas.height * imgWidth) / canvas.width;

//     pdf.addImage(imgData, "PNG", 10, 55, imgWidth, imgHeight);

//     // Add footer
//     pdf.setFontSize(9);
//     pdf.setTextColor(100);
//     pdf.text(
//       "Thank you for choosing Aspire Tekhub Solutions.",
//       pageWidth / 2,
//       pdf.internal.pageSize.height - 10,
//       { align: "center" }
//     );

//     // Save PDF
//     pdf.save("Requirements_Summary.pdf");
//   };

//   return (
//     <div className="req-table-container" style={{ padding: "20px" }}>
//       <h2 className="req-title">Requirements Summary</h2>

//       {/* ✅ Table reference for screenshot */}
//       <div ref={tableRef}>
//         <table
//           className="req-table"
//           style={{
//             width: "100%",
//             borderCollapse: "collapse",
//             marginTop: "15px",
//           }}
//         >
//           <thead>
//             <tr style={{ backgroundColor: "#004aad", color: "#fff" }}>
//               <th style={{ padding: "8px", border: "1px solid #ddd" }}>Category</th>
//               <th style={{ padding: "8px", border: "1px solid #ddd" }}>Selected Items</th>
//               <th style={{ padding: "8px", border: "1px solid #ddd" }}>Price (₹)</th>
//             </tr>
//           </thead>
//           <tbody>
//             {data.map((section, index) => (
//               <tr key={index}>
//                 <td style={{ padding: "8px", border: "1px solid #ddd" }}>{section.title}</td>
//                 <td style={{ padding: "8px", border: "1px solid #ddd" }}>
//                   {section.items.length > 0
//                     ? section.items.map((i) => i.name).join(", ")
//                     : "None selected"}
//                 </td>
//                 <td style={{ padding: "8px", border: "1px solid #ddd" }}>
//                   ₹{getTotal(section.items)}
//                 </td>
//               </tr>
//             ))}
//             <tr
//               className="total-row"
//               style={{ backgroundColor: "#004aad", color: "#fff", fontWeight: "bold" }}
//             >
//               <td colSpan="2" style={{ padding: "8px", border: "1px solid #ddd" }}>
//                 Grand Total
//               </td>
//               <td style={{ padding: "8px", border: "1px solid #ddd" }}>₹{grandTotal}</td>
//             </tr>
//           </tbody>
//         </table>
//       </div>

//       {/* Buttons */}
//       <div style={{ marginTop: "20px" }}>
//         <button
//           onClick={handleNext}
//           style={{
//             marginRight: "10px",
//             padding: "8px 14px",
//             backgroundColor: "#004aad",
//             color: "white",
//             border: "none",
//             borderRadius: "5px",
//             cursor: "pointer",
//           }}
//         >
//           Next
//         </button>
//         {/* <button
//           onClick={handleDownload}
//           style={{
//             padding: "8px 14px",
//             backgroundColor: "#28a745",
//             color: "white",
//             border: "none",
//             borderRadius: "5px",
//             cursor: "pointer",
//           }}
//         >
//           Download PDF
//         </button> */}
//       </div>
//     </div>
//   );
// };

// export default RequirementsTable;
import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import "jspdf-autotable";

const RequirementsTable = ({ selectedItems = {} }) => {
  const navigate = useNavigate();
  const tableRef = useRef();

  const { type, domain, requirements, integrations, chips, pages } = selectedItems;

  // ✅ Calculate total for each section
  const getTotal = (array) => {
    if (!array || array.length === 0) return 0;
    return array.reduce((acc, item) => acc + Number(item.price || 0), 0);
  };

  // ✅ Organized data with Chips Input included
  const data = [
    { title: "Website Type", items: type ? [type] : [] },
    { title: "Domain & Hosting", items: domain || [] },
    { title: "Number of Pages", items: pages ? [pages] : [] },
    { title: "Special Requirements", items: requirements || [] },
    { title: "Integrations", items: integrations || [] },
    { title: "Chips Input", items: chips || [] }, // ✅ Added Chips Input row
  ];

  const grandTotal = data.reduce(
    (acc, section) => acc + getTotal(section.items),
    0
  );

  // ✅ Navigate to contact
  const handleNext = () => {
    navigate("/contact", { state: { selectedItems } });
  };

  // ✅ Capture styled table (optional for PDF)
  const handleDownload = async () => {
    const input = tableRef.current;
    const pdf = new jsPDF("p", "mm", "a4");
    const pageWidth = pdf.internal.pageSize.getWidth();

    pdf.setFontSize(16);
    pdf.setTextColor(0, 74, 173);
    pdf.text("ASPIRE TEKHUB SOLUTIONS", pageWidth / 2, 15, { align: "center" });
    pdf.setFontSize(10);
    pdf.setTextColor(80);
    pdf.text(
      "Corporate Office: 1-8-303, 3rd Floor, VK Towers, SP Road, RasoolPura, Secunderabad - 500003",
      pageWidth / 2,
      22,
      { align: "center" }
    );
    pdf.text("040 4519 5642 | info@aspireths.com | www.aspireths.com", pageWidth / 2, 28, {
      align: "center",
    });

    pdf.setFontSize(11);
    pdf.setTextColor(0);
    pdf.text(`Date: ${new Date().toLocaleDateString()}`, 14, 38);
    pdf.setFontSize(13);
    pdf.setTextColor(0, 74, 173);
    pdf.text("REQUIREMENTS SUMMARY", pageWidth / 2, 45, { align: "center" });

    const canvas = await html2canvas(input, { scale: 2 });
    const imgData = canvas.toDataURL("image/png");
    const imgWidth = pageWidth - 20;
    const imgHeight = (canvas.height * imgWidth) / canvas.width;

    pdf.addImage(imgData, "PNG", 10, 55, imgWidth, imgHeight);

    pdf.setFontSize(9);
    pdf.setTextColor(100);
    pdf.text(
      "Thank you for choosing Aspire Tekhub Solutions.",
      pageWidth / 2,
      pdf.internal.pageSize.height - 10,
      { align: "center" }
    );

    pdf.save("Requirements_Summary.pdf");
  };

  return (
    <div className="req-table-container" style={{ padding: "20px" }}>
      <h2 className="req-title">Requirements Summary</h2>

      {/* ✅ Table reference for screenshot */}
      <div ref={tableRef}>
        <table
          className="req-table"
          style={{
            width: "100%",
            borderCollapse: "collapse",
            marginTop: "15px",
          }}
        >
          <thead>
            <tr style={{ backgroundColor: "#004aad", color: "#fff" }}>
              <th style={{ padding: "8px", border: "1px solid #ddd" }}>Category</th>
              <th style={{ padding: "8px", border: "1px solid #ddd" }}>Selected Items</th>
              <th style={{ padding: "8px", border: "1px solid #ddd" }}>Price (₹)</th>
            </tr>
          </thead>
          <tbody>
            {data.map((section, index) => (
              <tr key={index}>
                <td style={{ padding: "8px", border: "1px solid #ddd" }}>
                  {section.title}
                </td>
                <td style={{ padding: "8px", border: "1px solid #ddd" }}>
                  {section.items.length > 0
                    ? section.items.map((i) => i.name || i).join(", ")
                    : "None selected"}
                </td>
                <td style={{ padding: "8px", border: "1px solid #ddd" }}>
                  ₹{getTotal(section.items)}
                </td>
              </tr>
            ))}

            {/* ✅ Grand Total Row */}
            <tr
              className="total-row"
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
                ₹{grandTotal}
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Buttons */}
      <div style={{ marginTop: "20px" }}>
        <button
          onClick={handleNext}
          style={{
            marginRight: "10px",
            padding: "8px 14px",
            backgroundColor: "#004aad",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          Next
        </button>

        {/* Optional: enable download if needed */}
        {/* <button
          onClick={handleDownload}
          style={{
            padding: "8px 14px",
            backgroundColor: "#28a745",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          Download PDF
        </button> */}
      </div>
    </div>
  );
};

export default RequirementsTable;
