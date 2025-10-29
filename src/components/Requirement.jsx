import React from "react";
import { NavLink } from "react-router";
// import "./RequirementsTable.css";

const RequirementsTable = ({ selectedItems = {} }) => {
  const { type, domain, requirements, integrations, chips } = selectedItems;

  const getTotal = (array) => {
    if (!array || array.length === 0) return 0;
    return array.reduce((acc, item) => acc + Number(item.price || 0), 0);
  };

  const data = [
    { title: "Website Type", items: type ? [type] : [] },
    { title: "Domain & Hosting", items: domain || [] },
    { title: "Special Requirements", items: requirements || [] },
    { title: "Integrations", items: integrations || [] },
    { title: "Additional Features", items: chips || [] },
  ];

  const grandTotal = data.reduce((acc, section) => acc + getTotal(section.items), 0);

  return (
    <div className="req-table-container">
      <h2 className="req-title">Requirements Summary</h2>

      <table className="req-table">
        <thead>
          <tr>
            <th>Category</th>
            <th>Selected Items</th>
            <th>Price (₹)</th>
          </tr>
        </thead>
        <tbody>
          {data.map((section, index) => (
            <tr key={index}>
              <td>{section.title}</td>
              <td>
                {section.items.length > 0
                  ? section.items.map((i) => i.name).join(", ")
                  : "None selected"}
              </td>
              <td>{getTotal(section.items)}</td>
            </tr>
          ))}
          <tr className="total-row">
            <td colSpan="2" className="total-label">Grand Total</td>
            <td className="total-value">₹{grandTotal}</td>
          </tr>
        </tbody>
      </table>
      <NavLink to="/contact" className="next">Next</NavLink>
    </div>
  );
};

export default RequirementsTable;
