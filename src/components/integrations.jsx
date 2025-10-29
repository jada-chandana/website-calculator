import React from "react";
import chatbot from "../assets/chatbot.png";
import Banner from "../assets/banner.png";
import chat from "../assets/whatsapp.png";
import payment from "../assets/payments.png";
import sms from "../assets/smsApi.png";
import { NavLink } from "react-router-dom";

const integrationsList = [
  { name: "Live Chatbot", price: 1200, image: chatbot },
  { name: "Google My Business Page", price: 1200, image: Banner },
  { name: "WhatsApp Chat", price: 1200, image: chat },
  { name: "Payment Gateway", price: 1200, image: payment },
  { name: "SMS API", price: 1200, image: sms },
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
    <div>
      <h3 className="sub">Integrations</h3>
      <ul className="item">
        {integrationsList.map((int, index) => {
          const isSelected = (selectedItems.integrations || []).some(
            (i) => i.name === int.name
          );

          return (
            <li
              key={index}
              className="type-card"
              onClick={() => handleSelect(int)}
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
                style={{ width: "40px", height: "40px", objectFit: "contain" }}
              />
              <p style={{ margin: 0, fontWeight: "500" }}>{int.name}</p>
            </li>
          );
        })}
      </ul>

      <div className="btn">
        <NavLink className="next" to="/pages">
          Previous
        </NavLink>

        <NavLink
          to={isIntegrationSelected ? "/summary" : "#"}
          className={`next ${!isIntegrationSelected ? "disabled" : ""}`}
          onClick={(e) => {
            if (!isIntegrationSelected) e.preventDefault();
          }}
        >
          Next
        </NavLink>
      </div>
    </div>
  );
};

export default Integrations;
