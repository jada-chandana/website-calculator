import React from "react";
import "./Sidebar.css";

const Sidebar = ({ selectedItems }) => {
  // ✅ Calculate total price safely (if some are undefined)
  const totalPrice =
    (selectedItems.type?.price ? Number(selectedItems.type.price) : 0) +
    (selectedItems.domain?.price ? Number(selectedItems.domain.price) : 0) +
    (selectedItems.pages?.price ? Number(selectedItems.pages.price) : 0);

  return (
    <div className="sidebar">
      <h3 className="sidebar-title">Your Selection</h3>

      {/* Website Type */}
      {selectedItems.type && (
        <div>
          <p>
            <strong>Website Type:</strong> {selectedItems.type.name}
          </p>
          <p>₹{selectedItems.type.price}</p>
        </div>
      )}

      {/* Domain */}
     {selectedItems.domain && selectedItems.domain.length > 0 && (
  <div>
    <p><strong>Selected Domains:</strong></p>
    <ul>
      {selectedItems.domain.map((d, i) => (
        <li key={i}>
          {d.name} — ₹{d.price}
        </li>
      ))}
    </ul>
  </div>
)}


      {/* Pages */}
      {selectedItems.pages && (
        <div>
          <p>
            <strong>Pages:</strong> {selectedItems.pages.name}</p>
          <p>₹{selectedItems.pages.price}</p>
        </div>
      )}

      {/* Chips / Menu Items */}
      {selectedItems.chips && selectedItems.chips.length > 0 && (
        <div className="sidebar-section">
          <p>
            <strong>Selected Menu Items:</strong>
          </p>
          <ul className="chip-list">
            {selectedItems.chips.map((chip, index) => (
              <li key={index} className="chip-item-sidebar">
                {chip}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* ✅ Total Price Section */}
      {/* <hr style={{ margin: "15px 0" }} /> */}
      <div className="total-section">
        <h4>Total Price: ₹{totalPrice}</h4>
      </div>
    </div>
  );
};

export default Sidebar;
