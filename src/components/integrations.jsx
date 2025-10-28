import React from "react";
import chatbot from "../assets/chatbot.png"; 
import Banner from "../assets/banner.png";
import chat from "../assets/Whatsapp.png";
import payment from "../assets/payments.png";
import sms from "../assets/smsApi.png"; 
import { NavLink } from "react-router";
const integrationsList = [
  { name: "Live Chatbot", price: 1200,image:chatbot },
  { name: "Google My Business Page", price: 1200,image:Banner },
  { name: "WhatsApp Chat", price: 1200,image:chat},
  { name: "Payment Gateway", price: 1200 ,image: payment},
  { name: "SMS API", price: 1200 ,image: sms},
];

const Integrations = ({ selectedItems = {}, setSelectedItems = () => {} }) => {
  const handleSelect = (item) => {
    const currentSelections = selectedItems.integrations || [];
    const alreadySelected = currentSelections.some((int) => int.name === item.name);

    const updatedSelections = alreadySelected
      ? currentSelections.filter((int) => int.name !== item.name)
      : [...currentSelections, item];

    // ✅ Correct way: merge into existing selectedItems object
    setSelectedItems({ ...selectedItems, integrations: updatedSelections });
  };

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
              className={`type-card ${isSelected ? "selected" : ""}`}
              onClick={() => handleSelect(int)}
            >
              <img src={int.image} alt={int.name} className="type-image" />
              <span>{int.name}</span>
            </li>
          );
        })}
      </ul>
     <div className="btn">
        <NavLink className="next" to="/pages">
          Previous
        </NavLink>
        <NavLink className="next" to="/">
          Home
        </NavLink>
      </div>
    </div>
  );
};

export default Integrations;
