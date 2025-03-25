import { useEffect, useRef, useState } from "react";
import Visited from "./visited";
import yogaImg from "../../../assets/img/yoga.jpg";
import music from "../../../assets/img/music.jpg";
import Buttons from "../../LeftandRightButtons/buttons";

const VisitedSlider: React.FC = () => {
  const sliderRef = useRef<HTMLDivElement | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [visited, setVisited] = useState<any[]>([]);

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
    async function fetchItineraries() {
      setLoading(true);
      try {
        const apiUrl = "http://localhost:3001";
        const token = localStorage.getItem("token");

        if (!token) {
          setError("Authentication required");
          return;
        }

        const response = await fetch(`${apiUrl}/api/user/visitedevent`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await response.json();

        if (data.error) {
          setError(data.error);
          console.error("API error:", data.error);
          return;
        }
        setVisited(data.events);
      } catch (err) {
        console.error("Fetch error:", err);
        setError("Failed to fetch itineraries");
      } finally {
        setLoading(false);
      }
    }
    fetchItineraries();
  }, []);

  return (
    <div className="visitedSection">
      <div className="visitedSection_title">
        <p>
          {localStorage.getItem("fullname")}, here is your master journey with
          us so far
        </p>
      </div>
      <div
        ref={sliderRef}
        className="visitedSectionSlider"
        style={{ display: "flex", overflowX: "auto", scrollBehavior: "smooth" }}
      >
        {visited.map((ele: any, index) => {
          const isReviews = ele?.reviews[0]?.avg_rating;
          return (
            <Visited
              addReview={isReviews ? false : true}
              imgUrl={ele.event.image_urls[0]}
              title={ele.event.title}
              attented={index + 1}
              dateandTime={ele.event.date[0]}
              rating={isReviews ? ele?.reviews[0].avg_rating : "0"}
              eventId={ele.event_id}
              key={index}
            />
          );
        })}
      </div>
      <Buttons scrollLeft={scrollLeft} scrollRight={scrollRight} />
    </div>
  );
};

export default VisitedSlider;
