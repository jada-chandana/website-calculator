import React, { useState, useEffect } from "react";

function ChipsInput({ selectedItems = {}, setSelectedItems = () => {} }) {
  const [chips, setChips] = useState([]);
  const [inputValue, setInputValue] = useState("");

  // ✅ Static menu (don’t add new items here)
  const menuItems = [
    "Home",
    "About",
    "Contact us",
    "Services",
    "Gallery",
    "Product",
    "Product Details",
    "Portfolio",
    "Media",
    "Testimonial",
    "Clients",
    "Enquiry",
    "Get a Quote",
    "Blog",
    "vision page",
    "Mission page",
    "Team",
    "Faqs",
    "News",
    "Events",
    "Awards",
    "Achievement",
    "CSR",
    "Terms & Conditions",
    "Privacy Policy",
    "Refund Policy",
    "Cancellation Policy",
    "Studies",
    "Industries",
    "Site Map",
    "Complaint",
  ];

  // ✅ Update parent (Sidebar)
  useEffect(() => {
    setSelectedItems({ ...selectedItems, chips });
  }, [chips]);

  // ✅ Press Enter → add chip only (don’t add to menu)
  const handleKeyDown = (e) => {
    if (e.key === "Enter" && inputValue.trim() !== "") {
      e.preventDefault();
      const newChip = inputValue.trim();
      if (!chips.includes(newChip)) {
        setChips([...chips, newChip]);
      }
      setInputValue("");
    }
  };

  // ✅ Select/deselect from predefined menu
  const handleButtonClick = (item) => {
    if (chips.includes(item)) {
      setChips(chips.filter((chip) => chip !== item));
    } else {
      setChips([...chips, item]);
    }
  };

  // ✅ Remove a chip manually
  const removeChip = (chipToRemove) => {
    setChips(chips.filter((chip) => chip !== chipToRemove));
  };

  return (
    <div className="main-container">
      <h3 className="su">Pages</h3>

      {/* Input for adding custom chips */}
      <input
        type="text"
        placeholder="Type page name"
        className="search-input"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyDown={handleKeyDown}
      />

      {/* ✅ Predefined Menu */}
      <div className="menu">
  {menuItems.map((item, index) => (
    <button
      key={index}
      onClick={() => handleButtonClick(item)}
      className={`menu-button ${chips.includes(item) ? "active" : ""}`}
    >
      {item}
    </button>
  ))}
</div>


      {/* ✅ Chips added by typing (and selected items) */}
      <div className="selected-chips">
        {chips.map((chip, index) => (
          <div
            className="chip-item"
            key={index}
            style={{
              display: "inline-flex",
              alignItems: "center",
              border: "1px solid #ccc",
              borderRadius: "20px",
              padding: "5px 10px",
              margin: "5px",
              backgroundColor: "#f5f5f5",
            }}
          >
            <span>{chip}</span>
            <button
              className="close-btn"
              onClick={() => removeChip(chip)}
              style={{
                border: "none",
                background: "none",
                cursor: "pointer",
                marginLeft: "5px",
                color: "red",
              }}
            >
              &times;
            </button>
            
          </div>
        ))}
      </div>
    </div>
  );
}

export default ChipsInput;
