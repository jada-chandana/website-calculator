import React, { useState } from "react";
import "./Sidebar.css";

const Sidebar = ({ selectedItems = {} }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => setIsOpen(!isOpen);

  const getTotal = (arr) =>
    Array.isArray(arr)
      ? arr.reduce((sum, item) => sum + (Number(item.price) || 0), 0)
      : 0;

  const domainTotal = getTotal(selectedItems.domain);
  const requirementsTotal = getTotal(selectedItems.requirements);
  const integrationsTotal = getTotal(selectedItems.integrations);

  let extraCharge = 0;
  if (
    selectedItems.pages &&
    Array.isArray(selectedItems.chips) &&
    selectedItems.pages.limit !== Infinity
  ) {
    const chipsCount = selectedItems.chips.length;
    const limit = selectedItems.pages.limit;
    if (chipsCount > limit) {
      const extraItems = chipsCount - limit;
      extraCharge = extraItems * 2000;
    }
  }

  const totalPrice =
    (Number(selectedItems.type?.price) || 0) +
    (Number(selectedItems.pages?.price) || 0) +
    domainTotal +
    requirementsTotal +
    integrationsTotal +
    extraCharge;

  const renderList = (title, items) =>
    Array.isArray(items) &&
    items.length > 0 && (
      <div className="sidebar-section">
        <p>
          <strong>{title}</strong>
        </p>
        <ul>
          {items.map((item, i) => (
            <li key={i}>
              {item.name} — ₹{item.price}
            </li>
          ))}
        </ul>
      </div>
    );

  return (
    <>
      {/* Hamburger button for mobile */}
      <button className="hamburger" onClick={toggleSidebar}>
        ☰
      </button>

      {/* Sidebar */}
      <div className={`sidebar ${isOpen ? "open" : ""}`}>
        <h3 className="sidebar-title">🧾 Your Selection Summary</h3>

        {selectedItems.type && (
          <div className="sidebar-section">
            <p>
              <strong>Website Type:</strong> {selectedItems.type.name}
            </p>
            <p>₹{selectedItems.type.price}</p>
          </div>
        )}

        {renderList("Selected Domains:", selectedItems.domain)}

        {selectedItems.pages && (
          <div className="sidebar-section">
            <p>
              <strong>Pages:</strong> {selectedItems.pages.name}</p>
            {extraCharge > 0 && <p>₹{extraCharge}</p>}
          </div>
        )}

        {renderList("Special Requirements:", selectedItems.requirements)}

        {Array.isArray(selectedItems.chips) && selectedItems.chips.length > 0 && (
          <div className="sidebar-section">
            <p><strong>Selected Menu Items:</strong></p>
            <ul className="chip-list">
              {selectedItems.chips.map((chip, index) => (
                <li key={index} className="chip-item-sidebar">{chip}</li>
              ))}
            </ul>
          </div>
        )}

        {renderList("Selected Integrations:", selectedItems.integrations)}

        <div className="total-section">
          <h4>💰 Total Price: ₹{totalPrice}</h4>
        </div>
      </div>

      {/* Overlay when open on mobile */}
      {isOpen && <div className="overlay" onClick={toggleSidebar}></div>}
    </>
  );
};

export default Sidebar;
