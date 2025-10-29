import React from "react";
import { NavLink } from "react-router-dom";
import DomainImg from "../assets/domain.png";
import Hostinger from "../assets/hostinger.png";
import Email from "../assets/official_email.png";

const domainOptions = [
  { name: "Domain", price: "1200", image: DomainImg },
  { name: "Hostinger", price: "1500", image: Hostinger },
  { name: "Official Email ID", price: "1200", image: Email },
];

const Domain = ({ selectedItems = {}, setSelectedItems = () => {} }) => {
  // ✅ Toggle multi-select domains
  const handleSelect = (item) => {
    const currentSelections = selectedItems.domain || [];
    const alreadySelected = currentSelections.some(
      (domain) => domain.name === item.name
    );

    let updatedSelections;
    if (alreadySelected) {
      // Deselect if clicked again
      updatedSelections = currentSelections.filter(
        (domain) => domain.name !== item.name
      );
    } else {
      // Add to selections
      updatedSelections = [...currentSelections, item];
    }

    setSelectedItems({ ...selectedItems, domain: updatedSelections });
  };

  // ✅ Handle input fields for domain details
  const handleInputChange = (index, value) => {
    const updatedInputs = [...(selectedItems.domainInputs || [])];
    updatedInputs[index] = value;
    setSelectedItems({ ...selectedItems, domainInputs: updatedInputs });
  };

  const placeholders = [
    "Enter main domain name",
    "space",
    "official email-id",
  ];

  // ✅ Enable next only if a website type is selected
  const isTypeSelected = !!selectedItems.type;

  return (
    <div style={{ marginTop: "30px" }}>
      <h3 className="sub">Domain</h3>

      {/* Domain options with multi-select */}
      <ul className="item" style={{ listStyle: "none", padding: 0 }}>
        {domainOptions.map((item, index) => {
          const isSelected = (selectedItems.domain || []).some(
            (domain) => domain.name === item.name
          );
          return (
            <li
              key={index}
              className="type-card"
              onClick={() => handleSelect(item)}
             style={{
              cursor: "pointer",
              border:
                selectedItems.type?.name === item.name
                  ? "2px solid blue"
                  : "1px solid #ccc",
              borderRadius: "8px",
              padding: "10px",
              marginBottom: "10px",
              display: "flex",
              alignItems: "center",
              gap: "10px",
            }}
            >
              {item.image && (
                <img
                  src={item.image}
                  alt={item.name}
                  style={{ width: "60px", height: "60px" }}
                />
              )}
              <div>
                <p className="type-name">{item.name}</p>
              </div>
            </li>
          );
        })}
      </ul>

      {/* Input fields */}
      <div style={{ display: "flex", gap: "15px", marginTop: "20px" }}>
        {placeholders.map((placeholder, index) => (
          <input
            key={index}
            className="input"
            type="text"
            placeholder={placeholder}
            value={selectedItems.domainInputs?.[index] || ""}
            onChange={(e) => handleInputChange(index, e.target.value)}
            style={{
              flex: 1,
              padding: "10px",
              borderRadius: "8px",
              border: "1px solid #ccc",
            }}
          />
        ))}
      </div>

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
