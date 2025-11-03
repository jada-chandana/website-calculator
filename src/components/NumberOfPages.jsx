import React from "react";
import { NavLink } from "react-router-dom";
import { motion } from "framer-motion";  // 🧩 Add this import
import Chips from "./ChipsInput";

const type = [
  { name: "1-4", price: 0, limit: 4 },
  { name: "5-9", price: 0, limit: 9 },
  { name: "10-14", price: 0, limit: 14 },
  { name: "Unlimited", price: 0, limit: Infinity },
];

const Pages = ({ selectedItems = {}, setSelectedItems = () => {} }) => {
  const handleSelect = (item) => {
    setSelectedItems({ ...selectedItems, pages: item });
  };

  const selectedChips = selectedItems.chips || [];
  const isNextEnabled = !!selectedItems.pages && selectedChips.length > 0;

  return (
    <>
      {/* Animated Heading */}
      <motion.h3
        className="head"
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        How much to make website
      </motion.h3>

      <div style={{ marginTop: "30px" }}>
        <motion.h3
          className="sub"
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          Select Number of Pages
        </motion.h3>

        {/* Animated Page Options */}
        <ul className="item-grid" style={{ listStyle: "none", padding: 0 }}>
          {type.map((item, index) => (
            <motion.li
              key={index}
              onClick={() => handleSelect(item)}
              initial={{ opacity: 0, scale: 0.8, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
                whileHover={{
                scale: 1.05, backgroundColor: "#007bff", // 🔵 blue background on hover
                color: "#fff", // optional – make text white
                boxShadow: "0 4px 15px rgba(0,0,255,0.3)",
              }}
              whileTap={{ scale: 0.95 }}
              style={{
                cursor: "pointer",
                border:
                  selectedItems?.pages?.name === item.name
                    ? "2px solid #0056d2"
                    : "1px solid #ccc",
                borderRadius: "8px",
                padding: "15px",
                marginBottom: "10px",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                gap: "6px",
                backgroundColor:
                  selectedItems?.pages?.name === item.name
                    ? "#eaf0ff"
                    : "white",
                transition: "all 0.3s ease",
                textAlign: "center",
                fontFamily: "sans-serif",
              }}
            >
              <p className="type-name" style={{ fontWeight: "bold" }}>
                {item.name}
              </p>
            </motion.li>
          ))}
        </ul>

        {/* Chips Input Section */}
        <Chips selectedItems={selectedItems} setSelectedItems={setSelectedItems} />

        {/* Navigation Buttons */}
        <div className="btn" style={{ marginTop: "30px" }}>
          <NavLink className="next" to="/">
            Previous
          </NavLink>

          <NavLink
            to={isNextEnabled ? "/nextPages" : "#"}
            className={`next ${!isNextEnabled ? "disabled" : ""}`}
            onClick={(e) => {
              if (!isNextEnabled) e.preventDefault();
            }}
          >
            Next
          </NavLink>
        </div>
      </div>
    </>
  );
};

export default Pages;
