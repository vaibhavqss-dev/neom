import React from "react";
import golfcourt from "../../assets/golfcourt.jpg";
import star from "../../assets/star.svg";
import ReviewCard from "./reviewCard/reviewCard";
import { useEffect, useRef } from "react";
import Buttons from "../LeftandRightButtons/buttons";
import RecommendationCard from "../base/recommendationCards/recommendationCard";
import category from "../../assets/category.svg";
import location from "../../assets/location.svg";
import smileGreenFace from "../../assets/smileGreenFace.svg";

export default function EventDetails({ starLen, eventCompleted }) {
  const sliderRef = useRef(null);

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

  useEffect(() => {
    let direction = 1;
    const interval = setInterval(() => {
      if (direction === 1) {
        scrollRight();
        if (
          sliderRef.current.scrollLeft + sliderRef.current.clientWidth >=
          sliderRef.current.scrollWidth
        ) {
          direction = 0;
        }
      } else {
        scrollLeft();
        if (sliderRef.current.scrollLeft <= 0) {
          direction = 1;
        }
      }
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="eventDetailsPg">
      <p className="eventDetailsPg_heading">Round of Golf</p>

      <div className="eventDetailsPg_details">
        <div className="eventDetailsPg_details_stars">
          {Array(5)
            .fill()
            .map((_, i) => (
              <img src={star} alt="star" key={i} />
            ))}
        </div>
        <p className="eventDetailsPg_details_stars_text">5.0</p>
        <div className="eventDetailsPg_details_reviews">
          <p>23 Reviews</p>
        </div>

        <p className="eventDetailsPg_details_location">Sindalah City, Dubai</p>
      </div>

      <div className="eventDetailsPg_images">
        <div className="eventDetailsPg_images_left">
          {Array(4)
            .fill()
            .map((_, i) => (
              <div className="eventDetailsPg_images_left_img">
                <img src={golfcourt} alt="golf" />
              </div>
            ))}
        </div>

        <div className="eventDetailsPg_images_right">
          <div className="eventDetailsPg_images_right_img">
            <img src={golfcourt} alt="golf" />
          </div>
        </div>

        <button className="eventDetailsPg_images_btn">Show all</button>
      </div>

      <div className="eventDetailsPg_description">
        <div className="eventDetailsPg_description_left">
          <p className="eventDetailsPg_description_left_heading">
            About the Event
          </p>
          <div className="eventDetailsPg_description_left_details">
            <div className="eventDetailsPg_description_left_details_1">
              <img src={category} alt="category" />
              <div className="eventDetailsPg_description_left_details_1_text">
                <p>Golf</p>
                <p>This is one of the many events come under golf category</p>
              </div>
            </div>
            <div className="eventDetailsPg_description_left_details_2">
              <img src={location} alt="location" />
              <div className="eventDetailsPg_description_left_details_2_heading">
                <p>Great Location</p>
                <p>Every guest has given a five star rating to this location</p>
              </div>
            </div>
            <div className="eventDetailsPg_description_left_details_3">
              <img src={smileGreenFace} alt="smileGreenFace" />
              <div className="eventDetailsPg_description_left_details_3_heading">
                <p>Invigorating & uplifting experience</p>
                <p>
                  This event has a rating of 5.0 that make this event
                  overwhelmed
                </p>
              </div>
            </div>
          </div>
          <hr />
          <div className="eventDetailsPg_description_left_text">
            <p className="eventDetailsPg_description_left_text_1">
              tempora unde? Sapiente voluptate neque rerum est adipisci, saepe
              quisquam quae? Placeat deserunt possimus in. Eligendi, ad deserunt
              in tenetur impedit alias nesciunt magni, optio totam aspernatur
              provident iste ipsam vel voluptate neque, consequuntur magnam odit
              assumenda esse. Nam illo dolorum dolore animi.
            </p>
            <p className="eventDetailsPg_description_left_text_2">
              tempora unde? Sapiente voluptate neque rerum est adipisci, saepe
              quisquam quae? Placeat deserunt possimus in. Eligendi, ad deserunt
              in tenetur impedit alias nesciunt magni, optio totam aspernatur
              provident iste ipsam vel voluptate neque, consequuntur magnam odit
              assumenda esse. Nam illo dolorum dolore animi.
            </p>
          </div>
          <hr />
          <div className="eventDetailsPg_description_left_eventName">
            <p className="eventDetailsPg_description_left_eventName_heading">
              Operator River Stone
            </p>
            <div className="eventDetailsPg_description_left_eventName_stars">
              {Array(parseInt(4.9))
                .fill()
                .map((_, i) => (
                  <img src={star} alt="star" key={i} />
                ))}
              <span className="eventDetailsPg_description_left_eventName_stars_text">
                4.9
              </span>
            </div>
            <p className="eventDetailsPg_description_left_eventName_text_1">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla
              tincidunt, erat eget tincidunt varius, ex ex bibendum elit, nec
              ultricies tortor odio eget nunc. Nulla tincidunt, erat eget
              tincidunt varius, ex ex bibendum elit, nec ultricies tortor odio
              eget nunc.
            </p>
          </div>
        </div>

        <div className="eventDetailsPg_description_right">
          <div class="eventDetailsPg_description_right_form">
            <div class="eventDetailsPg_description_right_form_time">
              10:30 AM - 7:30 PM
            </div>
            <div class="eventDetailsPg_description_right_form_formGroup">
              <div class="eventDetailsPg_description_right_form_formGroup1">
                <div class="eventDetailsPg_description_right_form_formGroup1_1">
                  <label>From</label>
                  <p className="eventDetailsPg_description_right_form_formGroup1_date">
                    Nov 22, 2025
                  </p>
                </div>
                <div class="eventDetailsPg_description_right_form_formGroup1_1">
                  <label>To</label>
                  <p className="eventDetailsPg_description_right_form_formGroup1_date">
                    Nov 29, 2025
                  </p>
                </div>
              </div>
              <div class="eventDetailsPg_description_right_form_formGroup2">
                <div class="eventDetailsPg_description_right_form_formGroup2_2">
                  <label>Guests</label>
                  <input type="number" value="1" class="dropdown" />
                </div>
              </div>
            </div>
            <div class="eventDetailsPg_description_right_form_availability">
              172 Seats still available
            </div>
            {/* Reserve Events */}
            {eventCompleted ? null : (
              <button class="eventDetailsPg_description_right_form_btn">
                Reserve Event
              </button>
            )}
          </div>
        </div>
      </div>

      <div ref={sliderRef} className="eventDetailsPg_reviews">
        {Array(10)
          .fill()
          .map((_, i) => (
            <div className="eventDetailsPg_reviewsCard" key={i}>
              <ReviewCard key={i} />
            </div>
          ))}
      </div>
      <Buttons scrollLeft={scrollLeft} scrollRight={scrollRight} />

      <div className="eventDetailsPg_recommendations">
        <p className="eventDetailsPg_recommendations_heading">
          Some more recommendations for you, Vaibhav!
        </p>

        <RecommendationCard length={10} />
      </div>
    </div>
  );
}
