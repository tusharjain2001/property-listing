import React from "react";

import { Link } from "react-router-dom";

export default function CardContent(props) {
  const link = "/properties/" + props.id;
  return (
    <div className="container">
      <img src={props.img} className="card-image" />
      <div className="card-details-container">
        <div>
          <div className="card-title">{props.title}</div>
          <div className="card-price">₹{props.price}</div>
        </div>
        <Link to={link}>
          <div className="card-button">View Details</div>
        </Link>
      </div>
    </div>
  );
}
