import React, { useState, useEffect, useRef } from "react";
import desertCity from "../../../assets/img/desertcity.jpg";
import like from "../../../assets/img/like.svg";

const Interest: React.FC = () => {
  const [availableInterests] = useState([
    "explore",
    "adventure",
    "travel",
    "sports",
    "fashion",
    "fitness",
    "photography",
    "reading",
    "movies",
    "gaming",
  ]);
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState<string>("");
  const inputRef = useRef<HTMLInputElement>(null);
  const inputContainerRef = useRef<HTMLDivElement>(null);

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
        {availableInterests.map((interest, index) => (
          <div
            onClick={() => onInterestImageClick(interest)}
            key={index}
            className="selectInterest_likes_input"
          >
            <p>{interest}</p>
            <img
              className={`selectInterest_likes_input_img ${
                isInterestSelected(interest) ? "like_opacity" : ""
              }`}
              src={desertCity}
              alt={interest}
            />
            <img
              className={`selectInterest_likes_input_thumb ${
                isInterestSelected(interest) ? "like_active" : ""
              }`}
              src={like}
              alt="like icon"
            />
          </div>
        ))}
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
