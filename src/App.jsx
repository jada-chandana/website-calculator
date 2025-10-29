import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Type from "./components/Type";
import Domain from "./components/Domain";
import Sidebar from "./components/Sidebar";
import Pages from "./components/NumberOfPages";
import SpecialRequirements from "./components/SpecialRequirements";
import Integration from "./components/integrations";
import  ExtraRequirement from "./components/ExtraRequirements";
function App() {
  const [selectedItems, setSelectedItems] = useState({
    type: null,
    domain: [],         // ✅ supports multiple domain selections
    pages: null,
    requirements: [],   // ✅ for special requirements
    chips: [],          // optional: if you’re using ChipsInput
  });

  return (
    <Router>
      <div style={{ display: "flex", alignItems: "flex-start" }}>
        {/* Main content area */}
        <div style={{ flex: 1, padding: "20px" }}>
          <Routes>
            {/* Home Page — shows Type + Domain */}
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

            {/* Pages Route */}
            <Route
              path="/pages"
              element={
                <Pages
                  selectedItems={selectedItems}
                  setSelectedItems={setSelectedItems}
                />
              }
            />
           

            {/* Special Requirements Route */}
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
            <Route path="/getQuote"
            element={
              <>
              <ExtraRequirement/></>
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
