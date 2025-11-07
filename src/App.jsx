// import React, { useState } from "react";
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import "./App.css";

// import Type from "./components/Type";
// import Domain from "./components/Domain";
// import Sidebar from "./components/Sidebar";
// import Pages from "./components/NumberOfPages";
// import SpecialRequirements from "./components/SpecialRequirements";
// import Integration from "./components/integrations";
// import RequirementsTable from "./components/Requirement";
// import Contact from "./components/contact";

// import jsPDF from "jspdf";
// import "jspdf-autotable";

// function App() {
//   const [selectedItems, setSelectedItems] = useState({
//     type: null,
//     domain: [],
//     pages: null,
//     requirements: [],
//     integrations: [],
//     chips: [],
//   });

//   const handleDownload = (selectedItems) => {
//     const { type, domain, requirements, integrations, chips } = selectedItems;

//     // ✅ Helper — calculate total
//     const getTotal = (array) =>
//       !array || array.length === 0
//         ? 0
//         : array.reduce((acc, item) => acc + Number(item.price || 0), 0);

//     // ✅ Data for table
//     const data = [
//       { title: "Website Type", items: type ? [type] : [] },
//       { title: "Domain & Hosting", items: domain || [] },
//       { title: "Special Requirements", items: requirements || [] },
//       { title: "Integrations", items: integrations || [] },
//     { title: "Number of Pages", items: pages ? [pages] : [] },
// { title: "Chips Input", items: chips || [] },

//     ];

//     const grandTotal = data.reduce(
//       (acc, section) => acc + getTotal(section.items),
//       0
//     );

//     const doc = new jsPDF();

//     // 🟦 Header
//     doc.setFontSize(18);
//     doc.setTextColor(0, 74, 173);
//     doc.text("ASPIRE TEKHUB SOLUTIONS", 105, 20, { align: "center" });

//     doc.setFontSize(10);
//     doc.setTextColor(100);
//     // doc.text(
//     //   "Corporate Office: 1-8-303, 3rd Floor, VK Towers, SP Road, Rasoolpura, Secunderabad - 500003",
//     //   105,
//     //   30,
//     //   { align: "center" }
//     // );
//     // doc.text("040 4519 5642 | info@aspireths.com | www.aspireths.com", 105, 37, {
//     //   align: "center",
//     // });

//     // 🗓️ Date & Title
//     doc.setFontSize(12);
//     doc.setTextColor(0);
//     doc.text(`Date: ${new Date().toLocaleDateString()}`, 14, 48);

//     doc.setFontSize(14);
//     doc.setTextColor(0, 74, 173);
//     doc.text("REQUIREMENTS SUMMARY", 105, 60, { align: "center" });

//     // ✅ Safe formatter (no ₹ issues)
//     const formatPrice = (num) =>
//       "Rs. " + num.toLocaleString("en-IN", { minimumFractionDigits: 2 });

//     // ✅ Build table body
//     const tableBody = data.map((section) => [
//       section.title,
//       section.items.length > 0
//         ? section.items.map((i) => i.name).join(", ")
//         : "None selected",
//       formatPrice(getTotal(section.items)),
//     ]);

//     // ✅ Grand total row INSIDE table
//     tableBody.push([
//       {
//         content: "Grand Total",
//         colSpan: 2,
//         styles: {
//           halign: "right",
//           fontStyle: "bold",
//           textColor: [0, 74, 173],
//         },
//       },
//       {
//         content: formatPrice(grandTotal),
//         styles: {
//           halign: "right",
//           fontStyle: "bold",
//           textColor: [0, 74, 173],
//         },
//       },
//     ]);

//     // 🧱 Generate table
//     doc.autoTable({
//       startY: 75,
//       head: [["Category", "Selected Items", "Price (Rs.)"]],
//       body: tableBody,
//       theme: "grid",
//       styles: {
//         fontSize: 10,
//         cellPadding: 5,
//         font: "helvetica",
//       },
//       headStyles: {
//         fillColor: [0, 74, 173],
//         textColor: 255,
//         halign: "center",
//       },
//       columnStyles: {
//         0: { cellWidth: 55 },
//         1: { cellWidth: 100 },
//         2: { halign: "right" },
//       },
//     });

//     // ✅ Add Total below table (for clarity)
//     const finalY = doc.lastAutoTable.finalY + 10;
//     doc.setFontSize(12);
//     doc.setTextColor(0, 74, 173);
//     doc.text(`Total Price: ${formatPrice(grandTotal)}`, 14, finalY);

//     // 🩵 Footer
//     doc.setFontSize(10);
//     doc.setTextColor(100);
//     doc.text(
//       "Thank you for choosing Aspire Tekhub Solutions.",
//       105,
//       doc.internal.pageSize.height - 10,
//       { align: "center" }
//     );
//      doc.text(
//       "Corporate Office: 1-8-303, 3rd Floor, VK Towers, SP Road, Rasoolpura, Secunderabad - 500003",
//       105,
//       30,
//       { align: "center" }
//     );
//     doc.text("040 4519 5642 | info@aspireths.com | www.aspireths.com", 105, 37, {
//       align: "center",
//     });

//     // ✅ Save PDF
//     doc.save("Requirements_Summary.pdf");
//   };

//   return (
//     <Router>
//       <div style={{ display: "flex", alignItems: "flex-start" }}>
//         <div style={{ flex: 1, padding: "20px" }}>
//           <Routes>
//             <Route
//               path="/"
//               element={
//                 <>
//                   <Type
//                     selectedItems={selectedItems}
//                     setSelectedItems={setSelectedItems}
//                   />
//                   <Domain
//                     selectedItems={selectedItems}
//                     setSelectedItems={setSelectedItems}
//                   />
//                 </>
//               }
//             />
//             <Route
//               path="/pages"
//               element={
//                 <Pages
//                   selectedItems={selectedItems}
//                   setSelectedItems={setSelectedItems}
//                 />
//               }
//             />
//             <Route
//               path="/nextPages"
//               element={
//                 <>
//                   <SpecialRequirements
//                     selectedItems={selectedItems}
//                     setSelectedItems={setSelectedItems}
//                   />
//                   <Integration
//                     selectedItems={selectedItems}
//                     setSelectedItems={setSelectedItems}
//                   />
//                 </>
//               }
//             />
//             <Route
//               path="/contact"
//               element={
//                 <Contact
//                   selectedItems={selectedItems}
//                   handleDownload={handleDownload}
//                 />
//               }
//             />
//             <Route
//               path="/summary"
//               element={
//                 <RequirementsTable
//                   selectedItems={selectedItems}
//                   setSelectedItems={setSelectedItems}
//                   handleDownload={handleDownload}
//                 />
//               }
//             />
//           </Routes>
//         </div>
//         <Sidebar selectedItems={selectedItems} />
//       </div>
//     </Router>
//   );
// }

// export default App;
import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";

import Type from "./components/Type";
import Domain from "./components/Domain";
import Sidebar from "./components/Sidebar";
import Pages from "./components/NumberOfPages";
import SpecialRequirements from "./components/SpecialRequirements";
import Integration from "./components/integrations";
import RequirementsTable from "./components/Requirement";
import Contact, { generatePdfBlob } from "./components/contact"; // ✅ Import the utility

function App() {
  const [selectedItems, setSelectedItems] = useState({
    type: null,
    domain: [],
    pages: null,
    requirements: [],
    integrations: [],
    chips: [],
  });

  // ✅ Use the same PDF generator as Contact.jsx
  const handleDownload = (items) => {
    const pdfBlob = generatePdfBlob(items);
    const url = URL.createObjectURL(pdfBlob);

    const link = document.createElement("a");
    link.href = url;
    link.download = "Requirements_Summary.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <Router>
      <div style={{ display: "flex", alignItems: "flex-start" }}>
        <div style={{ flex: 1, padding: "20px" }}>
          <Routes>
            <Route
              path="/"
              element={
                <>
                  <Type selectedItems={selectedItems} setSelectedItems={setSelectedItems} />
                  <Domain selectedItems={selectedItems} setSelectedItems={setSelectedItems} />
                </>
              }
            />
            <Route
              path="/pages"
              element={<Pages selectedItems={selectedItems} setSelectedItems={setSelectedItems} />}
            />
            <Route
              path="/nextPages"
              element={
                <>
                  <SpecialRequirements selectedItems={selectedItems} setSelectedItems={setSelectedItems} />
                  <Integration selectedItems={selectedItems} setSelectedItems={setSelectedItems} />
                </>
              }
            />
            <Route
              path="/contact"
              element={<Contact selectedItems={selectedItems} handleDownload={handleDownload} />}
            />
            <Route
              path="/summary"
              element={
                <RequirementsTable
                  selectedItems={selectedItems}
                  setSelectedItems={setSelectedItems}
                  handleDownload={handleDownload}
                />
              }
            />
          </Routes>
        </div>
        <Sidebar selectedItems={selectedItems} />
      </div>
    </Router>
  );
}

export default App;
