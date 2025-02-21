import React from "react";
import "./FavoritesImg.css";

export default function FavoritesImg({
  imgURL,
  name,
  category,
  date,
  time,
  face,
}: {
  imgURL: string;
  name: string;
  category: string;
  date: string;
  time: string;
  face: string;
}) {
  return (
    <div className="favorites_img_container">
      <div className="favorites_img_container">
        <button className="favorites_img_remove_btn">Remove</button>
        <img id="favorites_img" src={imgURL} alt="underwater" />
      </div>

      <p className="favorites_img_type">
        <p className="favorites_img_type_text">
          <img id="smileface" src={face} alt="smile" />
          {category}
        </p>
        <p className="favorites_img_type_date">{date}</p>
      </p>

      <p className="favorites_img_title">{name}</p>
      <p className="favorites_img_time">{time}</p>
    </div>
  );
}
