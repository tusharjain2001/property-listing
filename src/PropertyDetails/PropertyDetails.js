import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./styles.css";

export default function PropertyDetails() {
  const { id } = useParams();
  const [property, setProperty] = useState(null);

  const fetchdata = async () => {
    let a = await fetch("http://127.0.0.1:8000/api/properties/" + id);
    let data = await a.json();
    setProperty(data);
  };
  useEffect(() => {
    document.title = "Property Details";
  }, []);

  useEffect(() => {
    fetchdata();
  }, []);

  const onInquirySubmit = async (event) => {
    event.preventDefault();

    const form = event.target;
    const inquiryData = {
      name: form.name.value,
      email: form.email.value,
      phone: form.phone_number.value,
      message: form.message.value,
      property_id: id,
    };

    await fetch("http://127.0.0.1:8000/api/inquiries", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(inquiryData),
    })
      .then((response) => response.json())
      .then((data) => {
        alert("Inquiry Successfully Submitted");
        console.log(data);
        form.reset();
      })
      .catch((error) => {
        alert("Error Submitting Inquiry" + error);
        console.error("Error:", error);
      });
  };

  return property === null ? (
    <div>Fetching....</div>
  ) : (
    <div className="property-container">
      <div className="left-container">
        <div className="images-container">
          {JSON.parse(property.images_url).map((image_url) => {
            return <img src={image_url} className="property-image" />;
          })}
        </div>
        <div className="properties-details-container">
          <div className="title">{property.title}</div>
          <div className="price">₹{property.price}</div>
          <div className="description">{property.description}</div>
          <div className="rating">Rated {property.rating}/5</div>
        </div>
      </div>
      <form className="right-container" onSubmit={onInquirySubmit}>
        <h1> Property Inquiry Form</h1>
        <div className="form-container">
          <div className="form-row">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              autoComplete="name"
              placeholder="Enter your Name"
              required
            ></input>
          </div>
          <div className="form-row">
            <label htmlFor="email">Email</label>
            <input
              type="text"
              id="email"
              autoComplete="email"
              placeholder="Enter your Email"
              required
            ></input>
          </div>
          <div className="form-row">
            <label htmlFor="phone_number">Phone Number</label>
            <input
              type="text"
              id="phone_number"
              required
              autoComplete="tel"
              placeholder="Enter your Phone Number"
            ></input>
          </div>
          <div className="form-row">
            <label htmlFor="message">Message</label>
            <textarea
              type="text"
              id="message"
              required
              placeholder="Enter your message/inquiry"
            ></textarea>
          </div>
          <input
            type="submit"
            className="submit-button"
            value={"Submit Inquiry"}
          ></input>
        </div>
      </form>
    </div>
  );
}
