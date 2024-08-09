import React, { useState, useEffect } from "react";
import CardContent from "../CardMaking/CardContent";

export default function LandingPage() {
  const [cards, setCards] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPages] = useState(0);
  let pagesArr = [];
  for (let i = 0; i < totalPage; i++) {
    pagesArr.push(i + 1);
  }

  const fetchdata = async () => {
    let a = await fetch(`http://127.0.0.1:8000/api/properties/?page=${page}`);
    let data = await a.json();
    setTotalPages(data.last_page);
    setCards(data.data);
  };

  useEffect(() => {
    fetchdata();
  }, [page]);

  useEffect(() => {
    document.title = "Property Listing";
  }, []);

  return (
    <div
      style={{
        padding: "2rem 0rem",
      }}
    >
      <h1>Property Lists</h1>
      <div className="cards-container">
        {cards.map((ele) => {
          return (
            <CardContent
              id={ele.id}
              img={ele.banner_image_url}
              title={ele.title}
              price={ele.price}
            />
          );
        })}
      </div>
      <div className="page-container">
        {pagesArr.map((ele) => {
          return (
            <button
              onClick={() => {
                setPage(ele);
              }}
              style={{
                backgroundColor: page === ele ? "#000000" : "#ffffff",
                color: page === ele ? "#ffffff" : "#000000",
              }}
            >
              {ele}
            </button>
          );
        })}
      </div>
    </div>
  );
}
