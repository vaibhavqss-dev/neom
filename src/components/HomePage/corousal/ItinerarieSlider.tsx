import { useEffect, useRef, useState, useCallback } from "react";
import Itinerari from "./Itinerari";
import cardImage from "../../../assets/img/holiday_0.png";
import emojiFaceImg from "../../../assets/img/overwhelmed.svg";
import Buttons from "../../LeftandRightButtons/buttons";

const ItinerarieSlider: React.FC = () => {
  const [itineraries, setItineraries] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const sliderRef = useRef<HTMLDivElement | null>(null);

  // Memoize scroll handlers to prevent unnecessary re-renders
  const scrollLeft = useCallback(() => {
    if (sliderRef.current) {
      sliderRef.current.scrollLeft -= 300;
    }
  }, []);

  const scrollRight = useCallback(() => {
    if (sliderRef.current) {
      sliderRef.current.scrollLeft += 300;
    }
  }, []);

  useEffect(() => {
    let isMounted = true;

    async function fetchItineraries() {
      setLoading(true);
      try {
        const apiUrl = "http://localhost:3001";
        const token = localStorage.getItem("token");

        if (!token) {
          setError("Authentication required");
          return;
        }

        const response = await fetch(`${apiUrl}/api/user/reserveevent`, {
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

        if (!isMounted) return;

        setItineraries(data.data);
      } catch (err) {
        if (isMounted) {
          console.error("Fetch error:", err);
          setError("Failed to fetch itineraries");
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }

    fetchItineraries();

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <div>
      <div
        ref={sliderRef}
        className="CorousalSlider"
        style={{ display: "flex", overflowX: "auto", scrollBehavior: "smooth" }}
      >
        {itineraries.map((ele, index) => (
          <Itinerari
            emojiFaceImg={emojiFaceImg}
            eventId={ele.event_id }
            key={index}
            title={ele.event.title}
            description={ele.event.description}
            dateandTime={new Date().toDateString()}
            locationName={ele.event.location}
            categoryName={ele.event.category}
            ImgUrl={ele.event.image_urls[0] || cardImage}
            stars={ele.event.overall_rating}
            reviews={ele.event.no_reviews}
            subtext={ele.event.subtext}
            Scheduled
            min_temprature={parseInt(ele.event.min_temprature)}
            max_temprature={parseInt(ele.event.max_temprature)}
          />
        ))}
      </div>

      <Buttons scrollLeft={scrollLeft} scrollRight={scrollRight} />
    </div>
  );
};

export default ItinerarieSlider;
