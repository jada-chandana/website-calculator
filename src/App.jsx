
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
import Contact from "./components/contact"; // ✅ Import the utility

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
           
            {/* <Route
              path="/summary"
              element={
                <RequirementsTable
                  selectedItems={selectedItems}
                  setSelectedItems={setSelectedItems}
                  handleDownload={handleDownload}
                />
                
              }
            />
             <Route
              path="/contact"
              element={<Contact selectedItems={selectedItems} handleDownload={handleDownload} />}
            /> */}
         

<Route path="/summary" element={< Contact  selectedItems={selectedItems}
                  setSelectedItems={setSelectedItems}/>} />

          </Routes>
        </div>
        <Sidebar selectedItems={selectedItems} />
      </div>
    </Router>
  );
}

export default App;
