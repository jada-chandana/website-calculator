import React from "react";
import { NavLink } from "react-router-dom";
const requirements=[
    {name:"Seo friendly" ,price:1200},
    {name:"On Page Seo", price:1200},
    {name:"Social Media Linking?", price:1200},
    {name:"Popup Enquiry " ,price:1200},
    {name:"Banner Dynamic",price:1200},
    {name:"Admin Panel",price:1200},
    {name:"Edit Pages",price:1200},
    {name:"Content Writing Per Page",price:1200},
]
const SpecialRequirements = () => {
  return (
    <div>
         <h3 className="head">How much to make website</h3>
        <h3 className="sub"> Special Requirements</h3>
      <ul className="item">
        {requirements.map((requirement,index)=><li key={index}  className="type-card">{requirement.name}</li>)}
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
