import React from "react";
import anger from "../../../assets/img/anger.svg";
import appreciation from "../../../assets/img/appreciation.svg";
import boredom from "../../../assets/img/boredom.svg";
import joy from "../../../assets/img/joy.svg";
import overwhelm from "../../../assets/img/overwhelmed.svg";
import disappointment from "../../../assets/img/disappointed.svg";

type EmotionRatingProps = {
  rating: number;
};

const EmotionRating: React.FC<EmotionRatingProps> = ({ rating }) => {
  // Map of emotions with their associated number and image
  const emotions = [
    { id: 1, name: "Joy", image: joy },
    { id: 2, name: "Appreciation", image: appreciation },
    { id: 3, name: "Boredom", image: boredom },
    { id: 4, name: "Overwhelm", image: overwhelm },
    { id: 5, name: "Disappointment", image: disappointment },
    { id: 6, name: "Anger", image: anger },
  ];

  return (
    <div className="emotion-rating">
      {emotions.map((emotion) => (
        <div
          key={emotion.id}
          className={`emotion-icon `}
          title={emotion.name}
        >
          <img
            src={emotion.image}
            alt={emotion.name}
            className={rating === emotion.id ? "blinking" : "grayscale"}
          />
        </div>
      ))}
    </div>
  );
};

export default EmotionRating;
