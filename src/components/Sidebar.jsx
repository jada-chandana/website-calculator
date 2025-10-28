import React from "react";
import "./Sidebar.css";

const Sidebar = ({ selectedItems = {} }) => {
  // ✅ Safely calculate totals for arrays (domain, requirements, integrations)
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
    domainTotal +
    (Number(selectedItems.pages?.price) || 0) +
    requirementsTotal +
    integrationsTotal;

  return (
    <div className="sidebar">
      <h3 className="sidebar-title">Your Selection</h3>

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
      {Array.isArray(selectedItems.domain) && selectedItems.domain.length > 0 && (
        <div className="sidebar-section">
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
        <div className="sidebar-section">
          <p>
            <strong>Pages:</strong> {selectedItems.pages.name}
          </p>
          <p>₹{selectedItems.pages.price}</p>
        </div>
      )}

      {/* Special Requirements */}
      {Array.isArray(selectedItems.requirements) &&
        selectedItems.requirements.length > 0 && (
          <div className="sidebar-section">
            <p><strong>Special Requirements:</strong></p>
            <ul>
              {selectedItems.requirements.map((req, i) => (
                <li key={i}>
                  {req.name} — ₹{req.price}
                </li>
              ))}
            </ul>
          </div>
        )}

      {/* Chips (menu items) */}
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
      {Array.isArray(selectedItems.integrations) &&
        selectedItems.integrations.length > 0 && (
          <div className="sidebar-section">
            <p><strong>Selected Integrations:</strong></p>
            <ul>
              {selectedItems.integrations.map((integration, index) => (
                <li key={index}>
                  {integration.name} — ₹{integration.price}
                </li>
              ))}
            </ul>
          </div>
        )}

      {/* Total */}
      <div className="total-section">
        <h4>Total Price: ₹{totalPrice}</h4>
      </div>
    </div>
  );
};

export default Sidebar;
