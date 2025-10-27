import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Type from "./components/Type";
import Domain from "./components/Domain";
import Sidebar from "./components/Sidebar";
import Pages from "./components/NumberOfPages";
import Special from "./components/SpecialRequirements";

function App() {
  const [selectedItems, setSelectedItems] = useState({
    type: null,
    domain: null,
  });

  return (
    <Router>
      <div style={{ display: "flex", alignItems: "flex-start" }}>
        {/* Routes section */}
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
         <Route
  path="/nextPages"
  element={<Special />}
/>
  
          </Routes>

        </div>

        {/* Sidebar visible on all pages */}
        <Sidebar selectedItems={selectedItems} />
      </div>
    </Router>
  );
}

export default App;
