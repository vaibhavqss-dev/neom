import React, { useState, useEffect, useRef } from "react";
import desertCity from "../../../assets/img/desertcity.jpg";
import music from "../../../assets/img/music.jpg";
import music1 from "../../../assets/img/music.png";
import golf from "../../../assets/img/golf.png";
import plays from "../../../assets/img/plays.png";
import child from "../../../assets/img/child.png";
import social from "../../../assets/img/social.png";
import exploring from "../../../assets/img/exploring.png";
import walking from "../../../assets/img/walking.png";
import waterSports from "../../../assets/img/waterSports.png";

import like from "../../../assets/img/like.svg";

interface InterestProps {
  initialInterests?: string[];
  onInterestsChange?: (interests: string[]) => void;
}

const Interest: React.FC<InterestProps> = ({
  initialInterests = [],
  onInterestsChange,
}) => {
  const availableInterests: any[] = [
    "adventure",
    "travel",
    "sports",
    "fashion",
    "fitness",
    "photography",
    "reading",
    "explore",
    "gaming",
  ];
  const [selectedInterests, setSelectedInterests] =
    useState<string[]>(initialInterests);
  const [inputValue, setInputValue] = useState<string>("");
  const inputRef = useRef<HTMLInputElement>(null);
  const inputContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (onInterestsChange) {
      onInterestsChange(selectedInterests);
    }
  }, [selectedInterests, onInterestsChange]);

  const onInterestImageClick = (interest: string) => {
    let newSelectedInterests;

    if (selectedInterests.includes(interest)) {
      newSelectedInterests = selectedInterests.filter(
        (item) => item !== interest
      );
    } else {
      newSelectedInterests = [...selectedInterests, interest];
    }

    setSelectedInterests(newSelectedInterests);
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  const removeInterest = (interest: string) => {
    const newSelectedInterests = selectedInterests.filter(
      (item) => item !== interest
    );
    setSelectedInterests(newSelectedInterests);
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  const clearInput = () => {
    setInputValue("");
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "," && inputValue.trim()) {
      e.preventDefault();
      const newInterest = inputValue.trim();
      if (newInterest && !selectedInterests.includes(newInterest)) {
        setSelectedInterests([...selectedInterests, newInterest]);
        setInputValue("");
      }
    }

    if (e.key === "Backspace" && !inputValue && selectedInterests.length > 0) {
      const newInterests = [...selectedInterests];
      newInterests.pop();
      setSelectedInterests(newInterests);
    }
  };

  const handleFocusClick = () => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  const isInterestSelected = (interest: string) => {
    return selectedInterests.includes(interest);
  };

  return (
    <div className="selectInterest">
      <div className="selectInterest_likes">
        <div
          onClick={() => onInterestImageClick("plays")}
          className="selectInterest_likes_input"
        >
          <p>adventure</p>
          <img
            className={`selectInterest_likes_input_img ${
              isInterestSelected("plays") ? "like_opacity" : ""
            }`}
            src={plays}
            alt={"plays"}
          />
          <img
            className={`selectInterest_likes_input_thumb ${
              isInterestSelected("plays") ? "like_active" : ""
            }`}
            src={like}
            alt="like icon"
          />
        </div>
        <div
          onClick={() => onInterestImageClick("golf")}
          className="selectInterest_likes_input"
        >
          <p>golf</p>
          <img
            className={`selectInterest_likes_input_img ${
              isInterestSelected("golf") ? "like_opacity" : ""
            }`}
            src={golf}
            alt={"golf"}
          />
          <img
            className={`selectInterest_likes_input_thumb ${
              isInterestSelected("golf") ? "like_active" : ""
            }`}
            src={like}
            alt="like icon"
          />
        </div>
        <div
          onClick={() => onInterestImageClick("child-screaming")}
          className="selectInterest_likes_input"
        >
          <p>child-screaming</p>
          <img
            className={`selectInterest_likes_input_img ${
              isInterestSelected("child-screaming") ? "like_opacity" : ""
            }`}
            src={child}
            alt={"child-screaming"}
          />
          <img
            className={`selectInterest_likes_input_thumb ${
              isInterestSelected("child-screaming") ? "like_active" : ""
            }`}
            src={like}
            alt="like icon"
          />
        </div>
        <div
          onClick={() => onInterestImageClick("walking")}
          className="selectInterest_likes_input"
        >
          <p>walking</p>
          <img
            className={`selectInterest_likes_input_img ${
              isInterestSelected("walking") ? "like_opacity" : ""
            }`}
            src={walking}
            alt={"walking"}
          />
          <img
            className={`selectInterest_likes_input_thumb ${
              isInterestSelected("walking") ? "like_active" : ""
            }`}
            src={like}
            alt="like icon"
          />
        </div>
        <div
          onClick={() => onInterestImageClick("water-sports")}
          className="selectInterest_likes_input"
        >
          <p>water-sports</p>
          <img
            className={`selectInterest_likes_input_img ${
              isInterestSelected("water-sports") ? "like_opacity" : ""
            }`}
            src={waterSports}
            alt={"water-sports"}
          />
          <img
            className={`selectInterest_likes_input_thumb ${
              isInterestSelected("water-sports") ? "like_active" : ""
            }`}
            src={like}
            alt="like icon"
          />
        </div>
        <div
          onClick={() => onInterestImageClick("social")}
          className="selectInterest_likes_input"
        >
          <p>social</p>
          <img
            className={`selectInterest_likes_input_img ${
              isInterestSelected("social") ? "like_opacity" : ""
            }`}
            src={social}
            alt={"social"}
          />
          <img
            className={`selectInterest_likes_input_thumb ${
              isInterestSelected("social") ? "like_active" : ""
            }`}
            src={like}
            alt="like icon"
          />
        </div>
        <div
          onClick={() => onInterestImageClick("music")}
          className="selectInterest_likes_input"
        >
          <p>music</p>
          <img
            className={`selectInterest_likes_input_img ${
              isInterestSelected("music") ? "like_opacity" : ""
            }`}
            src={music}
            alt={"music"}
          />
          <img
            className={`selectInterest_likes_input_thumb ${
              isInterestSelected("music") ? "like_active" : ""
            }`}
            src={like}
            alt="like icon"
          />
        </div>
        <div
          onClick={() => onInterestImageClick("explore")}
          className="selectInterest_likes_input"
        >
          <p>explore</p>
          <img
            className={`selectInterest_likes_input_img ${
              isInterestSelected("explore") ? "like_opacity" : ""
            }`}
            src={exploring}
            alt={"explore"}
          />
          <img
            className={`selectInterest_likes_input_thumb ${
              isInterestSelected("explore") ? "like_active" : ""
            }`}
            src={like}
            alt="like icon"
          />
        </div>
        <div
          onClick={() => onInterestImageClick("rock")}
          className="selectInterest_likes_input"
        >
          <p>rock</p>
          <img
            className={`selectInterest_likes_input_img ${
              isInterestSelected("rock") ? "like_opacity" : ""
            }`}
            src={music1}
            alt={"rock"}
          />
          <img
            className={`selectInterest_likes_input_thumb ${
              isInterestSelected("rock") ? "like_active" : ""
            }`}
            src={like}
            alt="like icon"
          />
        </div>
      </div>

      <div className="selectInterest_input_container">
        <label htmlFor="interest">
          Please let us know if you have some interests
        </label>

        <div
          className="selectInterest_input_wrapper"
          onClick={handleFocusClick}
          ref={inputContainerRef}
        >
          <div className="selectInterest_input_tags">
            {selectedInterests.map((interest, index) => (
              <div className="selectInterest_tag" key={index}>
                <span className="selectInterest_tag_text">{interest}</span>
                <span
                  className="selectInterest_tag_close"
                  onClick={(e) => {
                    e.stopPropagation();
                    removeInterest(interest);
                  }}
                >
                  &times;
                </span>
              </div>
            ))}
            <input
              type="text"
              id="interest"
              ref={inputRef}
              value={inputValue}
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
              className="selectInterest_input_field"
              placeholder={
                selectedInterests.length
                  ? "place (,) to add more interests"
                  : "Add multiple interests comma ( , ) separated"
              }
            />
          </div>
          {inputValue && (
            <span
              className="selectInterest_input_clear"
              onClick={(e) => {
                e.stopPropagation();
                clearInput();
              }}
            >
              &times;
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default Interest;
