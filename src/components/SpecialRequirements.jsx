import React from "react";
import { motion } from "framer-motion";
import { NavLink } from "react-router-dom";
import seo from "../assets/seo.png";
import OnPage from "../assets/onpage.png";
import Social from "../assets/socialLinks.png";
import popup from "../assets/popup.png";
import Banner from "../assets/banner.png";
import Admin from "../assets/adminPanel.png";
import Edit from "../assets/editing.png";
import Content from "../assets/content.png";

const requirements = [
  { name: "SEO Friendly", price: 2000, image: seo },
  { name: "On Page SEO", price: 2000, image: OnPage },
  { name: "Social Media Linking", price: 5000, image: Social },
  { name: "Popup Enquiry", price: 1000, image: popup },
  { name: "Banner Dynamic", price: 1000, image: Banner },
  { name: "Admin Panel", price: 1000, image: Admin },
  { name: "Content Writing Per Page", price: 1000, image: Content },
];

const SpecialRequirements = ({ selectedItems = {}, setSelectedItems = () => {} }) => {
  const handleSelect = (item) => {
    const currentSelections = selectedItems.requirements || [];
    const alreadySelected = currentSelections.some((req) => req.name === item.name);

    const updatedSelections = alreadySelected
      ? currentSelections.filter((req) => req.name !== item.name)
      : [...currentSelections, item];

    setSelectedItems({ ...selectedItems, requirements: updatedSelections });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      {/* Animated Headings */}
      <motion.h3
        className="head"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        How much to make website
      </motion.h3>

      <motion.h3
        className="sub"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.3, duration: 0.5 }}
      >
        Special Requirements
      </motion.h3>

      {/* Requirements List with Animation */}
      <motion.ul
        className="item"
        initial="hidden"
        animate="visible"
        variants={{
          hidden: { opacity: 0 },
          visible: {
            opacity: 1,
            transition: { staggerChildren: 0.1 },
          },
        }}
      >
        {requirements.map((req, index) => {
          const isSelected = (selectedItems.requirements || []).some(
            (r) => r.name === req.name
          );

          return (
            <motion.li
              key={index}
              className="type-card"
              onClick={() => handleSelect(req)}
              variants={{
                hidden: { opacity: 0, y: 20, scale: 0.9 },
                visible: { opacity: 1, y: 0, scale: 1 },
              }}
               whileHover={{
                scale: 1.05, backgroundColor: "#007bff", // 🔵 blue background on hover
                color: "#fff", // optional – make text white
                boxShadow: "0 4px 15px rgba(0,0,255,0.3)",
              }}
              whileTap={{ scale: 0.95 }}
              transition={{ duration: 0.3 }}
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
            >
              <motion.img
                src={req.image}
                alt={req.name}
                className="type-image"
                style={{ width: "60px", height: "60px" }}
                whileHover={{ rotate: 5 }}
              />
              <div className="card-content">
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2 }}
                >
                  {req.name}
                </motion.span>
              </div>
            </motion.li>
          );
        })}
      </motion.ul>
    </motion.div>
  );
};

export default SpecialRequirements;
