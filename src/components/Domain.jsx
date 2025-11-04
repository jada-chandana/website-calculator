import React from "react";
import { NavLink } from "react-router-dom";
import { motion } from "framer-motion";
import DomainImg from "../assets/domain.png";
import Hostinger from "../assets/hostinger.png";
import Email from "../assets/official_email.png";

const domainOptions = [
  { name: "Domain", price: "2000", image: DomainImg },
  { name: "Hostinger", price: "8000", image: Hostinger },
  { name: "Official Email ID", price: "0", image: Email },
];



const Domain = ({ selectedItems = {}, setSelectedItems = () => {} }) => {
  const handleSelect = (item) => {
    const currentSelections = selectedItems.domain || [];
    const alreadySelected = currentSelections.some(
      (domain) => domain.name === item.name
    );

    // ✅ If user tries to select Email ID without Hostinger
    if (
      item.name === "Official Email ID" &&
      !currentSelections.some((d) => d.name === "Hostinger")
    ) {
      alert("⚠️ Please select Hostinger before choosing Official Email ID.");
      return;
    }

    const updatedSelections = alreadySelected
      ? currentSelections.filter((domain) => domain.name !== item.name)
      : [...currentSelections, item];

    setSelectedItems({ ...selectedItems, domain: updatedSelections });
  };

  const isTypeSelected = !!selectedItems.type;

  const isHostingerSelected = (selectedItems.domain || []).some(
    (d) => d.name === "Hostinger"
  );
  
  return (
    <div style={{ marginTop: "30px" }}>
      {/* Animated heading */}
      <motion.h3
        className="sub"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        Domain
      </motion.h3>

      {/* Domain options with animated cards */}
      <ul className="item" style={{ listStyle: "none", padding: 0 }}>
        {domainOptions.map((item, index) => {
          const isSelected = (selectedItems.domain || []).some(
            (domain) => domain.name === item.name
          );

          return (
            <motion.li
              key={index}
              className="type-card"
              onClick={() => handleSelect(item)}
              style={{
                cursor: "pointer",
                border: isSelected ? "2px solid blue" : "1px solid #ccc",
                borderRadius: "8px",
                padding: "10px",
                marginBottom: "10px",
                display: "flex",
                alignItems: "center",
                gap: "10px",
                backgroundColor: isSelected ? "#f0f8ff" : "white",
                transition: "0.3s ease",
              }}
              initial={{ opacity: 0, scale: 0.8, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              whileHover={{
                scale: 1.05, backgroundColor: "#007bff", // 🔵 blue background on hover
                color: "#fff",


                boxShadow: "0 4px 15px rgba(0,0,255,0.3)",
              }}
              whileTap={{ scale: 0.95   }}
            >
              {item.image && (
                <img
                  src={item.image}
                  alt={item.name}
                  style={{ width: "60px", height: "60px" }}
                />
              )}
              <div>
                <p style={{  fontWeight: "bold", color: "#333" }}>
                  {item.name}
                </p>
                <p  style={{ fontWeight: "bold", color: "#333" }}>12 Months</p>
              </div>
            </motion.li>
          );
        })}
      </ul>

      {/* ✅ Next Button — enabled only when Type is selected */}
      <div className="btn" style={{ marginTop: "30px" }}>
        <NavLink
          to={isTypeSelected ? "/pages" : "#"}
          className={`next ${!isTypeSelected ? "disabled" : ""}`}
          onClick={(e) => {
            if (!isTypeSelected) e.preventDefault();
          }}
        >
          Next
        </NavLink>
      </div>
    </div>
  );
};

export default Domain;
