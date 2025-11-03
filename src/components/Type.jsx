import React from "react";
import { motion } from "framer-motion"; // ✅ Import animation library
import Static from "../assets/static.png";
import Dynamic from "../assets/atom.png";
import Corporate from "../assets/corporation.png";
import Portifolio from "../assets/portifolio.png";
import Ecommerce from "../assets/ecommerce.png";
import Wordpress from "../assets/wordpress.png";

const typeOptions = [
  { name: "Static", price: "1200", image: Static },
  { name: "Dynamic", price: "1500", image: Dynamic },
  { name: "Corporate", price: "1200", image: Corporate },
  { name: "Portfolio", price: "1200", image: Portifolio },
  { name: "Ecommerce", price: "1200", image: Ecommerce },
  { name: "WordPress", price: "1200", image: Wordpress },
];

const Type = ({ selectedItems, setSelectedItems }) => {
  const handleSelect = (item) => {
    setSelectedItems({ ...selectedItems, type: item });
  };

  return (
    
    <div>
      <h3 className="head">How Much Cost to Make Website</h3>
      <div className="section">
      <div style={{ marginTop: "30px" }}>
           {/* Animated heading */}
           <motion.h3
             className="sub"
             initial={{ opacity: 0, y: -30 }}
             animate={{ opacity: 1, y: 0 }}
             transiti
             on={{ duration: 0.6, ease: "easeOut" }}
           >
             Type
           </motion.h3>

        <ul className="item" style={{ listStyle: "none", padding: 0 }}>
          {typeOptions.map((item, index) => {
            const isSelected = selectedItems.type?.name === item.name;

            return (
              <motion.div
                key={index}
                className={`type-card ${isSelected ? "selected" : ""}`}
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
                }}
                initial={{ opacity: 0, scale: 0.8, y: 30 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                  whileHover={{
                scale: 1.05, backgroundColor: "#007bff", // 🔵 blue background on hover
                color: "#fff", // optional – make text white
                boxShadow: "0 4px 15px rgba(0,0,255,0.3)",
              }}
                whileTap={{ scale: 0.95 }}
              >
                <img
                  src={item.image}
                  alt={item.name}
                  style={{ width: "60px", height: "60px" }}
                />
                <p style={{ margin: 0, fontWeight: "bold", color: "#333" }}>
                  {item.name}
                </p>
              </motion.div>
            );
          })}
        </ul>
      </div>
    </div>
    </div>
  );
};

export default Type;
