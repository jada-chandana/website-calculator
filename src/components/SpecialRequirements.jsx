import React from "react";
import { NavLink } from "react-router-dom";
import seo from "../assets/seo.png";

const requirements = [
  { name: "SEO Friendly", price: 1200, image: seo },
  { name: "On Page SEO", price: 1200, image: seo },
  { name: "Social Media Linking?", price: 1200, image: seo },
  { name: "Popup Enquiry", price: 1200, image: seo },
  { name: "Banner Dynamic", price: 1200, image: seo },
  { name: "Admin Panel", price: 1200, image: seo },
  { name: "Edit Pages", price: 1200, image: seo },
  { name: "Content Writing Per Page", price: 1200, image: seo },
];

const SpecialRequirements = ({
  selectedItems = {},
  setSelectedItems = () => {},
}) => {
  const handleSelect = (item) => {
    const currentSelections = selectedItems.requirements || [];
    const alreadySelected = currentSelections.some(
      (req) => req.name === item.name
    );

    let updatedSelections;
    if (alreadySelected) {
      // remove if already selected
      updatedSelections = currentSelections.filter(
        (req) => req.name !== item.name
      );
    } else {
      // add new selection
      updatedSelections = [...currentSelections, item];
    }

    setSelectedItems({ ...selectedItems, requirements: updatedSelections });
  };

  return (
    <div>
      <h3 className="head">How much to make website</h3>
      <h3 className="sub">Special Requirements</h3>

      <ul className="item" style={{ listStyle: "none", padding: 0 }}>
        {requirements.map((requirement, index) => {
          const isSelected = (selectedItems.requirements || []).some(
            (req) => req.name === requirement.name
          );

          return (
            <li
              key={index}
              className="type-card"
              onClick={() => handleSelect(requirement)}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
                border: isSelected ? "2px solid blue" : "1px solid #ccc",
                backgroundColor: isSelected ? "#eef4ff" : "white",
                borderRadius: "8px",
                padding: "10px",
                marginBottom: "10px",
                cursor: "pointer",
                transition: "all 0.3s ease",
              }}
            >
              {requirement.image && (
                <img
                  src={requirement.image}
                  alt={requirement.name}
                  style={{ width: "60px", height: "60px" }}
                />
              )}
              <span>{requirement.name}</span>
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

export default SpecialRequirements;
