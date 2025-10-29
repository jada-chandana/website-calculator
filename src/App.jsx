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
import Contact from "./components/contact";

function App() {
  const [selectedItems, setSelectedItems] = useState({
    type: null,
    domain: [],         // multiple selections supported
    pages: null,
    requirements: [],
    integrations: [],
    chips: [],
  });

  return (
    <Router>
      <div style={{ display: "flex", alignItems: "flex-start" }}>
        {/* Main content area */}
        <div style={{ flex: 1, padding: "20px" }}>
          <Routes>
            {/* Home Page — Type + Domain */}
            <Route
              path="/"
              element={
                <>
                  <Type
                    selectedItems={selectedItems}
                    setSelectedItems={setSelectedItems}
                  />
                  <Domain
                    selectedItems={selectedItems}
                    setSelectedItems={setSelectedItems}
                  />
                </>
              }
            />

            {/* Number of Pages */}
            <Route
              path="/pages"
              element={
                <Pages
                  selectedItems={selectedItems}
                  setSelectedItems={setSelectedItems}
                />
              }
            />

            {/* Special Requirements + Integrations */}
            <Route
              path="/nextPages"
              element={
                <>
                  <SpecialRequirements
                    selectedItems={selectedItems}
                    setSelectedItems={setSelectedItems}
                  />
                  <Integration
                    selectedItems={selectedItems}
                    setSelectedItems={setSelectedItems}
                  />
                </>
              }
            />

            {/* Contact Page */}
            <Route path="/contact" element={<Contact />} />

            {/* ✅ Requirements Summary Page */}
            <Route
              path="/summary"
              element={
                <RequirementsTable
                  selectedItems={selectedItems}
                  setSelectedItems={setSelectedItems}
                />
              }
            />
          </Routes>
        </div>

        {/* Sidebar — visible on all pages */}
        <Sidebar selectedItems={selectedItems} />
      </div>
    </Router>
  );
}

export default App;
