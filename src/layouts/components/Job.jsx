import React from "react";

function ellipsify(str) {
  if (str.length > 10) {
    return str.substring(0, 200) + "...";
  } else {
    return str;
  }
}

const Job = ({ title, description, companyName, companyAddress, location }) => {
  return (
    <div className="card" style={{ width: "30rem" }}>
      <div className="card-body">
        <h5 className="card-title">{title}</h5>
        <h6 className="card-subtitle mb-2 ">{companyName}</h6>
        <h6 className="card-subtitle mb-2 ">{companyAddress}</h6>
        <h6 className="card-subtitle mb-2 text-muted">{location}</h6>

        <p className="card-text">{ellipsify(description)}</p>
        <ul style={{ listStyleType: "circle" }}>
          <li>first role to perform</li>
          <li>second role to perform</li>
          <li>third role to perform</li>
        </ul>
        <a href="#" className="card-link">
          Job Link
        </a>
      </div>
    </div>
  );
};

export default Job;
