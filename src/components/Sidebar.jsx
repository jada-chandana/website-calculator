import React from "react";
import "./Sidebar.css";

const Sidebar = ({ selectedItems = {} }) => {
  // ✅ Helper to safely calculate total for arrays (domain, requirements, integrations)
  const getTotal = (arr) =>
    Array.isArray(arr)
      ? arr.reduce((sum, item) => sum + (Number(item.price) || 0), 0)
      : 0;

  const domainTotal = getTotal(selectedItems.domain);
  const requirementsTotal = getTotal(selectedItems.requirements);
  const integrationsTotal = getTotal(selectedItems.integrations);

  // ✅ Calculate grand total
  const totalPrice =
    (Number(selectedItems.type?.price) || 0) +
    (Number(selectedItems.pages?.price) || 0) +
    domainTotal +
    requirementsTotal +
    integrationsTotal;

  // ✅ Common list renderer for multiple sections
  const renderList = (title, items) => (
    Array.isArray(items) && items.length > 0 && (
      <div className="sidebar-section">
        <p><strong>{title}</strong></p>
        <ul>
          {items.map((item, i) => (
            <li key={i}>
              {item.name} — ₹{item.price}
            </li>
          ))}
        </ul>
      </div>
    )
  );

  return (
    <div className="sidebar">
      <h3 className="sidebar-title">🧾 Your Selection Summary</h3>

      {/* Website Type */}
      {selectedItems.type && (
        <div className="sidebar-section">
          <p>
            <strong>Website Type:</strong> {selectedItems.type.name}
          </p>
          <p>₹{selectedItems.type.price}</p>
        </div>
      )}

      {/* Domain Selections */}
      {renderList("Selected Domains:", selectedItems.domain)}

      {/* Pages */}
      {selectedItems.pages && (
        <div className="sidebar-section">
          <p>
            <strong>Pages:</strong> {selectedItems.pages.name}
          </p>
          <p>₹{selectedItems.pages.price}</p>
        </div>
      )}

      {/* Special Requirements */}
      {renderList("Special Requirements:", selectedItems.requirements)}

      {/* Selected Menu Items */}
      {Array.isArray(selectedItems.chips) && selectedItems.chips.length > 0 && (
        <div className="sidebar-section">
          <p><strong>Selected Menu Items:</strong></p>
          <ul className="chip-list">
            {selectedItems.chips.map((chip, index) => (
              <li key={index} className="chip-item-sidebar">
                {chip}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Integrations */}
      {renderList("Selected Integrations:", selectedItems.integrations)}

      {/* Total */}
      <div className="total-section">
        <h4>💰 Total Price: ₹{totalPrice}</h4>
      </div>
    </div>
  );
};

export default Sidebar;
