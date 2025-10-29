import React from "react";
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
  { name: "SEO Friendly", price: 1200, image: seo },
  { name: "On Page SEO", price: 1200, image: OnPage },
  { name: "Social Media Linking", price: 1200, image: Social },
  { name: "Popup Enquiry", price: 1200, image: popup },
  { name: "Banner Dynamic", price: 1200, image: Banner },
  { name: "Admin Panel", price: 1200, image: Admin },
  { name: "Edit Pages", price: 1200, image: Edit },
  { name: "Content Writing Per Page", price: 1200, image: Content },
];

const SpecialRequirements = ({ selectedItems = {}, setSelectedItems = () => {} }) => {
  const handleSelect = (item) => {
    const currentSelections = selectedItems.requirements || [];
    const alreadySelected = currentSelections.some((req) => req.name === item.name);

    const updatedSelections = alreadySelected
      ? currentSelections.filter((req) => req.name !== item.name)
      : [...currentSelections, item]; // ✅ add full object (name + price)

    setSelectedItems({ ...selectedItems, requirements: updatedSelections });
  };

  return (
    <div>
      <h3 className="head">How much to make website</h3>
      <h3 className="sub">Special Requirements</h3>

      <ul className="item">
        {requirements.map((req, index) => {
          const isSelected = (selectedItems.requirements || []).some(
            (r) => r.name === req.name
          );

          return (
                 <li
        key={index}
        className="type-card"
        onClick={() => handleSelect(req)}
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
              <img src={req.image} alt={req.name} className="type-image" />
              <div className="card-content">
                <span>{req.name}</span>
               
              </div>
            </li>
          );
        })}
      </ul>

      {/* Optional navigation */}
     
    </div>
  );
};

export default SpecialRequirements;
