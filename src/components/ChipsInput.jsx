import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion"; // 🧩 Import animation tools

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

  // ✅ Press Enter → add chip
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
    <motion.div
      className="main-container"
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      {/* Animated heading */}
      <motion.h3
        className="su"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
      >
        Pages
      </motion.h3>

      {/* Input for adding custom chips */}
      <motion.input
        type="text"
        placeholder="Type page name"
        className="search-input"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyDown={handleKeyDown}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        whileFocus={{ scale: 1.02, borderColor: "#0056d2" }}
      />

      {/* Animated Predefined Menu */}
      <div className="menu">
        {menuItems.map((item, index) => (
          <motion.button
            key={index}
            onClick={() => handleButtonClick(item)}
            className={`menu-button ${chips.includes(item) ? "active" : ""}`}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.02 }}
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.95 }}
          >
            {item}
          </motion.button>
        ))}
      </div>

      {/* ✅ Animated Chips Section */}
      <div className="selected-chips">
        <AnimatePresence>
          {chips.map((chip, index) => (
            <motion.div
              key={chip}
              className="chip-item"
              initial={{ opacity: 0, scale: 0.6 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0 }}
              transition={{ duration: 0.3 }}
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
              <motion.button
                className="close-btn"
                onClick={() => removeChip(chip)}
                whileHover={{ scale: 1.3, rotate: 90 }}
                transition={{ duration: 0.2 }}
                style={{
                  border: "none",
                  background: "none",
                  cursor: "pointer",
                  marginLeft: "5px",
                  color: "red",
                  fontWeight: "bold",
                }}
              >
                &times;
              </motion.button>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}

export default ChipsInput;
