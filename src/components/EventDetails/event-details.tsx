import React, { useRef, useState } from "react";
import golfcourt from "../../assets/img/golfcourt.jpg";
import star from "../../assets/img/star.svg";
import Buttons from "../LeftandRightButtons/buttons";
import category_Img from "../../assets/img/category.svg";
import location_Img from "../../assets/img/location.svg";
import smileGreenFace from "../../assets/img/smileGreenFace.svg";
import RecommendationCardContainer from "../base/recommendationCards/RecommendationCardContainer";
import ReviewCardContainer from "./reviewCard/ReviewCardContainer";
import ImageGallery from "./ImageGallery";
import { NavLink, useNavigate } from "react-router-dom";

interface EventDetailsProps {
  eventCompleted?: boolean;
  name?: string;
  date?: string;
  time?: string;
  location?: string;
  locationImg?: string;
  imgURL1?: [];
  index?: number;
  starRating?: number;
  reviews?: number;
  category?: string;
  categoryImg?: string;
  subtextName?: string;
  subtextDateFrom?: string;
  subtextDateTo?: string;
  timeRange?: string;
  eventDescription1?: string;
  eventDescription2?: string;
  seatsAvailable?: number;
  operatorName?: string;
  operatorRating?: number;
  operatorDescription?: string;
  operatorReviews?: number;
  operatorCategory?: string;
  operatorLocation?: string;
  operatorImgURL?: string;
  operatorIndex?: number;
  operatorStarRating?: number;
}

const EventDetails: React.FC<EventDetailsProps> = ({
  eventCompleted = false,
  name = "Round of Golf",
  time = "10:30 AM - 7:30 PM",
  locationImg = location_Img,
  location = "Sindalah City, Dubai",
  imgURL1 = [golfcourt, golfcourt, golfcourt, golfcourt, golfcourt],
  starRating = 5.0,
  reviews = 23,
  category = "Invigorating & uplifting experience",
  categoryImg = category_Img,
  subtextName = "Golf",
  subtextDateFrom = "Nov 22, 2025",
  subtextDateTo = "Nov 22, 2025",
  seatsAvailable = 120,
  timeRange = "10:30 AM - 7:30 PM",
  eventDescription1 = "This is one of the many events come under golf category",
  eventDescription2 = "This is one of the many events come under golf category",
  operatorName = "Operator River Stone",
  operatorDescription = "This is one of the many events come under golf category",
  operatorRating = 4.9,
}) => {
  const navigate = useNavigate();
  const sliderRef = useRef<HTMLDivElement>(null);
  const [isGalleryOpen, setIsGalleryOpen] = useState(false);

  const scrollLeft = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollLeft -= 300;
    }
  };

  const scrollRight = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollLeft += 300;
    }
  };

  const openGallery = () => {
    setIsGalleryOpen(true);
  };

  const closeGallery = () => {
    setIsGalleryOpen(false);
  };

  return (
    <div className="eventDetailsPg">
      <p className="eventDetailsPg_heading">{name}</p>

      <div className="eventDetailsPg_details">
        <div className="eventDetailsPg_details_stars">
          {Array(starRating)
            .fill(5)
            .map((_, i) => (
              <img src={star} alt="star" key={i} />
            ))}
        </div>
        <p className="eventDetailsPg_details_stars_text">{starRating}</p>
        <div className="eventDetailsPg_details_reviews">
          <p>{reviews} Reviews</p>
        </div>

        <p className="eventDetailsPg_details_location">{location}</p>
      </div>

      <div className="eventDetailsPg_images">
        <div className="eventDetailsPg_images_left">
          <div className="eventDetailsPg_images_left_img">
            <img src={imgURL1[0]} alt="golf" />
          </div>
          <div className="eventDetailsPg_images_left_img">
            <img src={imgURL1[1]} alt="golf" />
          </div>
          <div className="eventDetailsPg_images_left_img">
            <img src={imgURL1[2]} alt="golf" />
          </div>
          <div className="eventDetailsPg_images_left_img">
            <img src={imgURL1[3]} alt="golf" />
          </div>
        </div>

        <div className="eventDetailsPg_images_right">
          <div className="eventDetailsPg_images_right_img">
            <img src={imgURL1[4]} alt="golf" />
          </div>
        </div>

        <button className="eventDetailsPg_images_btn" onClick={openGallery}>
          Show all
        </button>
      </div>

      <ImageGallery
        images={imgURL1 as string[]}
        isOpen={isGalleryOpen}
        onClose={closeGallery}
      />

      <div className="eventDetailsPg_description">
        <div className="eventDetailsPg_description_left">
          <p className="eventDetailsPg_description_left_heading">
            About the Event
          </p>
          <div className="eventDetailsPg_description_left_details">
            <div className="eventDetailsPg_description_left_details_1">
              <img src={categoryImg} alt="category" />
              <div className="eventDetailsPg_description_left_details_1_text">
                <p>{subtextName}</p>
                <p>This is one of the many events come under golf category</p>
              </div>
            </div>
            <div className="eventDetailsPg_description_left_details_2">
              <img src={locationImg} alt="location" />
              <div className="eventDetailsPg_description_left_details_2_heading">
                <p>Great Location</p>
                <p>Every guest has given a five star rating to this location</p>
              </div>
            </div>
            <div className="eventDetailsPg_description_left_details_3">
              <img src={smileGreenFace} alt="smileGreenFace" />
              <div className="eventDetailsPg_description_left_details_3_heading">
                <p>{category}</p>
                <p>
                  This event has a rating of 5.0 that make this event
                  overwhelmed
                </p>
              </div>
            </div>
          </div>
          <div className="eventDetailsPg_description_left_text">
            <p className="eventDetailsPg_description_left_text_1">
              {eventDescription1}
            </p>
            <p className="eventDetailsPg_description_left_text_2">
              {eventDescription2}
            </p>
          </div>
          <hr />
          <div className="eventDetailsPg_description_left_eventName">
            <p className="eventDetailsPg_description_left_eventName_heading">
              {operatorName}
            </p>
            <div className="eventDetailsPg_description_left_eventName_stars">
              {Array(Math.floor(operatorRating)).fill(
                <img src={star} alt="star" />
              )}
              <span className="eventDetailsPg_description_left_eventName_stars_text">
                {operatorRating}
              </span>
            </div>
            <p className="eventDetailsPg_description_left_eventName_text_1">
              {operatorDescription}
            </p>
          </div>
        </div>

        <div className="eventDetailsPg_description_right">
          <div className="eventDetailsPg_description_right_form">
            <div className="eventDetailsPg_description_right_form_time">
              {timeRange}
            </div>
            <div className="eventDetailsPg_description_right_form_formGroup">
              <div className="eventDetailsPg_description_right_form_formGroup1">
                <div className="eventDetailsPg_description_right_form_formGroup1_1">
                  <label>From</label>
                  <p className="eventDetailsPg_description_right_form_formGroup1_date">
                    {subtextDateFrom}
                  </p>
                </div>
                <div className="eventDetailsPg_description_right_form_formGroup1_1">
                  <label>To</label>
                  <p className="eventDetailsPg_description_right_form_formGroup1_date">
                    {subtextDateTo}
                  </p>
                </div>
              </div>
              <hr />
              <div className="eventDetailsPg_description_right_form_formGroup2">
                <div className="eventDetailsPg_description_right_form_formGroup2_2">
                  <label>Guests</label>
                  <input type="number" placeholder="1" />
                </div>
              </div>
            </div>
            <div className="eventDetailsPg_description_right_form_availability">
              {seatsAvailable} Seats still available
            </div>
            {eventCompleted ? null : (
              <NavLink
                to="/checkout"
                className="eventDetailsPg_description_right_form_btn"
              >
                <button className="eventDetailsPg_description_right_form_btn">
                  Reserve Event
                </button>
              </NavLink>
            )}
          </div>
        </div>
      </div>

      <div ref={sliderRef} className="eventDetailsPg_reviews">
        <ReviewCardContainer id={1} />
      </div>
      <Buttons scrollLeft={scrollLeft} scrollRight={scrollRight} />

      <div className="eventDetailsPg_recommendations">
        <p className="eventDetailsPg_recommendations_heading">
          Some more recommendations for you, Vaibhav!
        </p>

        <div className="eventDetailsPg_recommendations_cards">
          <RecommendationCardContainer number={10} />
        </div>
      </div>
    </div>
  );
};

export default EventDetails;
