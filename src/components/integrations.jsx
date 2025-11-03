import React from "react";
import { NavLink } from "react-router-dom";
import { motion } from "framer-motion"; // ✅ Animation library
import chatbot from "../assets/chatbot.png";
import Banner from "../assets/banner.png";
import chat from "../assets/whatsapp.png";
import payment from "../assets/payments.png";
import sms from "../assets/smsApi.png";

const integrationsList = [
  { name: "Live Chatbot", price: 0, image: chatbot },
  { name: "Google My Business Page", price: 500, image: Banner },
  { name: "WhatsApp Chat", price: 500, image: chat },
  { name: "Payment Integration", price: 1200, image: payment },

];

const Integrations = ({ selectedItems = {}, setSelectedItems = () => {} }) => {
  const handleSelect = (item) => {
    const currentSelections = selectedItems.integrations || [];
    const alreadySelected = currentSelections.some((int) => int.name === item.name);

    const updatedSelections = alreadySelected
      ? currentSelections.filter((int) => int.name !== item.name)
      : [...currentSelections, item];

    setSelectedItems({ ...selectedItems, integrations: updatedSelections });
  };

  const isIntegrationSelected = (selectedItems.integrations || []).length > 0;

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        {/* ✨ Animated Heading */}
        <motion.h3
          className="sub"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.7, type: "spring" }}
          style={{ textAlign: "center", marginBottom: "20px" }}
        >
          Integrations
        </motion.h3>

        <ul className="item" style={{ listStyle: "none", padding: 0 }}>
          {integrationsList.map((int, index) => {
            const isSelected = (selectedItems.integrations || []).some(
              (i) => i.name === int.name
            );

            return (
              <motion.li
                key={index}
                className="type-card"
                onClick={() => handleSelect(int)}
                whileHover={{
                  scale: 1.05,
                  backgroundColor: "#007bff", // ✅ Correct syntax
                  color: "#fff",
                  boxShadow: "0 4px 10px rgba(0,0,0,0.15)",
                  transition: { duration: 0.3 },
                }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                style={{
                  cursor: "pointer",
                  border: isSelected ? "2px solid blue" : "1px solid #ccc",
                  borderRadius: "8px",
                  padding: "10px",
                  marginBottom: "10px",
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                  transition: "0.3s ease",
                }}
              >
                <img
                  src={int.image}
                  alt={int.name}
                  style={{
                    width: "40px",
                    height: "40px",
                    objectFit: "contain",
                  }}
                />
                <p style={{ margin: 0, fontWeight: "500" }}>{int.name}</p>
              </motion.li>
            );
          })}
        </ul>

        <div className="btn" style={{ textAlign: "center", marginTop: "20px" }}>
          <NavLink className="next" to="/pages">
            Previous
          </NavLink>

          <NavLink
            to={isIntegrationSelected ? "/summary" : "#"}
            className={`next ${!isIntegrationSelected ? "disabled" : ""}`}
            onClick={(e) => {
              if (!isIntegrationSelected) e.preventDefault();
            }}
            style={{ marginLeft: "10px" }}
          >
            Next
          </NavLink>
        </div>
      </motion.div>
    </>
  );
};

export default Integrations;
