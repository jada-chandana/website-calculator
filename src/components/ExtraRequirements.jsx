import React, { useState } from "react";
import "./ExtraRequirements.css";
import { NavLink } from "react-router-dom";

function ExtraRequirement() {
  const [comment, setComment] = useState("");
  const [file, setFile] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Quote requested successfully!");
  };

  return (
    <>
      {/* Fixed Header */}
      <h3 className="head">How much to make website</h3>

      {/* Main Content */}
      <div className="extra-container">
        <h3 className="extra-heading">Extra Requirement</h3>

        <form className="extra-form" onSubmit={handleSubmit}>
          <div className="form-row">
            {/* Comment Input */}
            <div className="form-group">
              <label>Comments</label>
              <textarea
                placeholder="Write here..."
                value={comment}
                onChange={(e) => setComment(e.target.value)}
              />
            </div>

            {/* File Upload */}
            <div className="form-group">
              <label>Attachment File</label>
              <input
                type="file"
                onChange={(e) => setFile(e.target.files[0])}
              />
              {file ? (
                <p className="file-name">{file.name}</p>
              ) : (
                <p className="file-placeholder">No file chosen</p>
              )}
            </div>
          </div>

          {/* Buttons */}
          <div className="btn">
            <NavLink to="/pages" className="next">
              Prev
            </NavLink>
            <button type="submit" className="next">
              Get A Quote
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

export default ExtraRequirement;
