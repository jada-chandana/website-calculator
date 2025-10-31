import React from "react";
import Static from "../assets/static.png";
import Dynamic from "../assets/atom.png";
import Corporate from "../assets/corporation.png";
import Portifolio from "../assets/portifolio.png";
import Ecommerce from "../assets/ecommerce.png";
import Wordpress from "../assets/wordpress.png";

const typeOptions = [
  { name: "Static", price: "1200", image: Static },
  { name: "Dynamic", price: "1500", image: Dynamic },
  { name: "Corporate", price: "1200", image: Corporate },
  { name: "Portfolio", price: "1200", image: Portifolio },
  { name: "Ecommerce", price: "1200", image: Ecommerce },
  { name: "WordPress", price: "1200", image: Wordpress },
];

const Type = ({ selectedItems, setSelectedItems }) => {
  const handleSelect = (item) => {
    setSelectedItems({ ...selectedItems, type: item });
  };

  return (
   <>
   <h3 className="head">How Much  Cost to Make website</h3>
    <div className="section">
       
      <h3 className="sub">Website Type</h3>
      <ul className="item" style={{ listStyle: "none", padding: 0 }}>
        {typeOptions.map((item, index) => (
          <li
            key={index}
            className={`type-card ${
              selectedItems.type?.name === item.name ? "selected" : ""
            }`}
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
            <img
              src={item.image}
              alt={item.name}
              style={{ width: "60px", height: "60px" }}
            />
            <p>{item.name}</p>
          </li>
        ))}
      </ul>
    </div>
    </>
  );
};

export default Type;
