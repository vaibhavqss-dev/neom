import React, { useRef, useState, useEffect } from "react";
import golfcourt from "../../assets/img/golfcourt.jpg";
import star from "../../assets/img/star.svg";
import Buttons from "../LeftandRightButtons/buttons";
import category_Img from "../../assets/img/category.svg";
import location_Img from "../../assets/img/location.svg";
import smileGreenFace from "../../assets/img/smileGreenFace.svg";
import RecommendationCardContainer from "../base/recommendationCards/RecommendationCardContainer";
import ReviewCardContainer from "./reviewCard/ReviewCardContainer";
import neom from "../../assets/img/neom.png";
import ImageGallery from "./ImageGallery";
import { NavLink, useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";

interface User {
  name: string;
  email: string;
}

interface Review {
  comment: string;
  user_id: number;
  avg_rating: number;
  createdAt: string;
  User: User;
}

interface EventData {
  event_id: number;
  title: string;
  description: string;
  subtext: string;
  date: string[];
  time: string[];
  latitude: string;
  longitude: string;
  category: string;
  location: string;
  image_urls: string[];
  overall_rating: number;
  min_temprature: string;
  max_temprature: string;
  avg_rating: string;
  no_reviews: string;
  createdAt: string;
  updatedAt: string;
  reviews: Review[];
  operator_name: string;
  available_seats: number;
}

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
  // timeRange = "10:30 AM - 7:30 PM",
  eventDescription1 = "This is one of the many events come under golf category",
  eventDescription2 = "This is one of the many events come under golf category",
  operatorName = "Operator River Stone",
  operatorDescription = "This is one of the many events come under golf category",
  operatorRating = 4.9,
}) => {
  const query = new URLSearchParams(window.location.search);
  const isScheduled = query.get("isScheduled");
  const event_id = query.get("eventId") || 2;
  if (isScheduled === "1") eventCompleted = true;

  const navigate = useNavigate();
  const sliderRef = useRef<HTMLDivElement>(null);
  const [isGalleryOpen, setIsGalleryOpen] = useState(false);
  const [eventData, setEventData] = useState<EventData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [guestCount, setGuestCount] = useState(1);

  useEffect(() => {
    const fetchEventData = async () => {
      try {
        setLoading(true);
        // Check if token exists
        const token = localStorage.getItem("token");
        if (!token) {
          console.warn("No authentication token found in localStorage");
          // You might want to redirect to login here
          // navigate('/login');
        }

        console.log(
          "Using token:",
          token ? token.substring(0, 10) + "..." : "none"
        );

        const response = await fetch(
          `http://localhost:3001/api/events?event_id=${event_id}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: token ? `Bearer ${token}` : "",
            },
          }
        );

        if (response.status === 401) {
          console.error("Authentication failed: Unauthorized");
          setError("Authentication failed. Please log in again.");
          // Optionally clear the invalid token
          // localStorage.removeItem("token");
          return;
        }

        const data = await response.json();

        if (data.success && data.event) {
          setEventData(data.event);
        } else {
          setError("Failed to fetch event data");
        }
      } catch (err) {
        setError("An error occurred while fetching event data");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    if (event_id) {
      fetchEventData();
    } else {
      setError("Event ID not provided");
      setLoading(false);
    }
  }, [event_id, navigate]);

  useEffect(() => {
    const loadRazorpayScript = () => {
      return new Promise((resolve, reject) => {
        if (window.Razorpay) {
          resolve(true);
          return;
        }

        // Check if script already exists to avoid duplicates
        const existingScript = document.querySelector(
          'script[src="https://checkout.razorpay.com/v1/checkout.js"]'
        );

        if (existingScript) {
          // Script exists but might not be loaded yet, wait for it
          existingScript.addEventListener("load", () => {
            resolve(true);
          });
          existingScript.addEventListener("error", () => {
            reject(new Error("Failed to load Razorpay script"));
          });
          return;
        }

        // Create new script element
        const script = document.createElement("script");
        script.src = "https://checkout.razorpay.com/v1/checkout.js";
        script.async = true;
        script.id = "razorpay-checkout-js";

        script.onload = () => {
          console.log("Razorpay script loaded successfully");
          resolve(true);
        };

        script.onerror = () => {
          console.error("Failed to load Razorpay script");
          reject(new Error("Failed to load Razorpay script"));
        };

        document.body.appendChild(script);
      });
    };

    loadRazorpayScript()
      .then(() => console.log("Razorpay ready to use"))
      .catch((error) =>
        console.error("Razorpay initialization failed:", error)
      );

    return () => {
      const script = document.getElementById("razorpay-checkout-js");
      if (script && script.getAttribute("data-added-by") === "event-details") {
        document.body.removeChild(script);
      }
    };
  }, []);

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

  const handleReservation = async () => {
    if (!eventData) {
      alert("Event data not available. Please try again.");
      return;
    }

    try {
      if (typeof window.Razorpay === "undefined") {
        console.error("Razorpay is not loaded");
        const script = document.createElement("script");
        script.src = "https://checkout.razorpay.com/v1/checkout.js";
        script.async = true;
        document.body.appendChild(script);

        await new Promise((resolve, reject) => {
          script.onload = resolve;
          script.onerror = reject;
        });
      }

      const amount = Math.max(100, guestCount * 100);

      const options = {
        key: "rzp_test_1DP5mmOlF5G5ag",
        amount: amount,
        currency: "INR",
        name: "Neom Events",
        description: `Booking for ${eventData.title} - ${guestCount} guests`,
        image: "https://www.neom.com/favicon.ico",
        prefill: {
          name: localStorage.getItem("userName") || "Test User",
          email: localStorage.getItem("userEmail") || "test@example.com",
          contact: localStorage.getItem("userPhone") || "9999999999",
        },
        notes: {
          event_id: eventData.event_id,
          guests: guestCount,
        },
        theme: {
          color: "#28a745",
        },
        handler: async function (response: any) {
          console.log("Payment successful", response);
          try {
            // console.log("Payment ID:", response.razorpay_payment_id);
            const dateFrom =
              eventData.date && eventData.date.length > 0
                ? eventData.date[0]
                : new Date().toISOString();

            const dateTo =
              eventData.date && eventData.date.length > 1
                ? eventData.date[eventData.date.length - 1]
                : dateFrom;

            const reservationData = {
              event_id: eventData.event_id.toString(),
              date_from: dateFrom,
              date_to: dateTo,
              event_name: eventData.title || "Event",
              event_category: eventData.category || "General",
              no_of_guest: guestCount.toString(),
              payment_id: response.razorpay_payment_id,
            };

            // console.log("Sending reservation data:", reservationData);

            const token = localStorage.getItem("token");
            if (!token) {
              alert("You need to be logged in to reserve an event.");
              navigate("/login");
              return;
            }

            const reservationResponse = await fetch(
              "http://localhost:3001/api/user/reserveevent",
              {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                  Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(reservationData),
              }
            );

            if (reservationResponse.status === 401) {
              alert("Your session has expired. Please log in again.");
              navigate("/login");
              return;
            }

            console.log(
              "Reservation response status:",
              reservationResponse.status
            );

            const responseText = await reservationResponse.text();
            console.log("Reservation response text:", responseText);

            let data;
            try {
              data = JSON.parse(responseText);
            } catch (e) {
              console.error("Failed to parse response as JSON:", e);
              alert(
                "Reservation completed but server response was invalid. Please check your bookings."
              );
              navigate(`/upcoming-events`);
              return;
            }

            if (data.success) {
              alert("Event booked successfully!");
              navigate(
                `/event-details?eventId=${eventData.event_id}&isScheduled=1`
              );
            } else {
              console.error("Reservation failed with error:", data.message);
              alert("Reservation failed: " + (data.message || "Unknown error"));
            }
          } catch (error: any) {
            console.error("Error reserving event:", error);
            alert(
              `Reservation error: ${error.message || "Unknown error occurred"}`
            );
          }
        },
        modal: {
          ondismiss: function () {
            console.log("Payment dismissed by user");
          },
          escape: true,
          animation: true,
        },
      };

      console.log("Creating Razorpay instance with options:", options);

      // Initialize Razorpay with better error handling
      const rzp = new window.Razorpay(options);

      // Set up payment failed handler
      rzp.on("payment.failed", function (response: any) {
        console.error("Payment failed:", response.error);
        alert(
          `Payment failed: ${response.error.description}\nCode: ${response.error.code}`
        );
      });

      console.log("Opening Razorpay payment form");
      rzp.open();
    } catch (error: any) {
      console.error("Error initializing payment:", error);
      alert(
        `Payment initialization error: ${
          error.message || "Unknown error occurred"
        }`
      );
    }
  };

  const handleGuestCountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    if (!isNaN(value) && value > 0) {
      setGuestCount(value);
    }
  };

  if (loading) {
    return <div className="loading">Loading event details...</div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  if (!eventData) {
    return <div className="error">Event not found</div>;
  }

  // Fix star rating display - ensure it works with decimal values and doesn't error on 0
  const renderStarRating = (rating: string | number) => {
    const numRating = typeof rating === "string" ? parseFloat(rating) : rating;
    const fullStars = Math.floor(numRating);

    return Array(fullStars)
      .fill(0)
      .map((_, i) => <img src={star} alt="star" key={i} />);
  };

  // Format time range correctly with proper error handling
  const formatTime = (timeString: string) => {
    try {
      const time = new Date(`2000-01-01T${timeString}`);
      return time.toLocaleTimeString([], {
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
      });
    } catch (e) {
      return "Time not available";
    }
  };

  const timeRange =
    eventData.time.length > 0
      ? `${formatTime(eventData.time[0])} - ${formatTime(
          eventData.time[eventData.time.length - 1]
        )}`
      : "Time not specified";

  // Format date for display
  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString);
      // Check if date is valid
      if (isNaN(date.getTime())) {
        return "Date not available";
      }
      return date.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      });
    } catch (e) {
      return "Date not available";
    }
  };

  const formattedDate =
    eventData.date.length > 0
      ? formatDate(eventData.date[0])
      : "Date not specified";

  // Fix image handling to prevent errors
  const getDisplayImages = () => {
    if (!eventData)
      return [golfcourt, golfcourt, golfcourt, golfcourt, golfcourt];

    let images = eventData.image_urls || [];
    // Filter out any invalid URLs
    images = images.filter(
      (url) => url && typeof url === "string" && url.trim() !== ""
    );

    // If no valid images, use default
    if (images.length === 0) {
      images = [golfcourt, golfcourt, golfcourt, golfcourt, golfcourt];
    }

    // Ensure we have 5 images for display by duplicating the first valid image
    while (images.length < 5) {
      images.push(images[0] || golfcourt);
    }

    return images;
  };

  console.log("Event data", eventData);
  return (
    <div className="eventDetailsPg">
      <p className="eventDetailsPg_heading">
        {eventData.title || "Event Title"}
      </p>

      <div className="eventDetailsPg_details">
        <div className="eventDetailsPg_details_stars">
          {renderStarRating(eventData.avg_rating)}
        </div>
        <p className="eventDetailsPg_details_stars_text">
          {eventData.avg_rating || "0.0"}
        </p>
        <div className="eventDetailsPg_details_reviews">
          <p>{eventData.no_reviews || "0"} Reviews</p>
        </div>

        <p className="eventDetailsPg_details_location">
          {eventData.location || "Location not specified"}
        </p>
      </div>

      <div className="eventDetailsPg_images">
        <div className="eventDetailsPg_images_left">
          {getDisplayImages()
            .slice(0, 4)
            .map((img, index) => (
              <div className="eventDetailsPg_images_left_img" key={index}>
                <img src={img} alt={`event-${index}`} />
              </div>
            ))}
        </div>

        <div className="eventDetailsPg_images_right">
          <div className="eventDetailsPg_images_right_img">
            <img src={getDisplayImages()[4]} alt="event" />
          </div>
        </div>

        <button className="eventDetailsPg_images_btn" onClick={openGallery}>
          Show all
        </button>
      </div>

      <ImageGallery
        images={getDisplayImages()}
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
                <p>{eventData.category}</p>
                <p>{eventData.subtext}</p>
              </div>
            </div>
            <div className="eventDetailsPg_description_left_details_2">
              <img src={locationImg} alt="location" />
              <div className="eventDetailsPg_description_left_details_2_heading">
                <p>Great Location</p>
                <p>Located at: {eventData.location}</p>
              </div>
            </div>
            <div className="eventDetailsPg_description_left_details_3">
              <img src={smileGreenFace} alt="smileGreenFace" />
              <div className="eventDetailsPg_description_left_details_3_heading">
                <p>
                  Temperature: {eventData.min_temprature}°C -{" "}
                  {eventData.max_temprature}°C
                </p>
                <p>
                  This event has a rating of {eventData.avg_rating} with{" "}
                  {eventData.no_reviews} reviews
                </p>
              </div>
            </div>
          </div>
          <div className="eventDetailsPg_description_left_text">
            <p className="eventDetailsPg_description_left_text_1">
              {eventData.description}
            </p>
            <p className="eventDetailsPg_description_left_text_2">
              {eventData.subtext}
            </p>
          </div>
          <hr />
          <div className="eventDetailsPg_description_left_eventName">
            <p className="eventDetailsPg_description_left_eventName_heading">
              Event Organizer
            </p>
            <p>
              <span className="eventDetailsPg_description_left_eventName_text">
                {eventData.operator_name}
              </span>
            </p>
            <div className="eventDetailsPg_description_left_eventName_stars">
              {renderStarRating(eventData.avg_rating)}
              <span className="eventDetailsPg_description_left_eventName_stars_text">
                {eventData.avg_rating || "0.0"}
              </span>
            </div>
            <p className="eventDetailsPg_description_left_eventName_text_1">
              {eventData.description}
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
                    {formatDate(eventData.date[0]) || "Date not specified"}
                  </p>
                </div>
                <div className="eventDetailsPg_description_right_form_formGroup1_1">
                  <label>To</label>
                  <p className="eventDetailsPg_description_right_form_formGroup1_date">
                    {formatDate(eventData.date[eventData.date.length - 1]) ||
                      "Date not specified"}
                  </p>
                </div>
              </div>
              <hr />
              <div className="eventDetailsPg_description_right_form_formGroup2">
                <div className="eventDetailsPg_description_right_form_formGroup2_2">
                  <label>Guests</label>
                  <input
                    type="number"
                    placeholder="1"
                    value={guestCount}
                    onChange={handleGuestCountChange}
                    min="1"
                  />
                </div>
              </div>
            </div>
            <div className="eventDetailsPg_description_right_form_availability">
              {eventData.available_seats || 6} Seats still available
            </div>
            {eventCompleted ? null : (
              <button
                className="eventDetailsPg_description_right_form_btn"
                onClick={handleReservation}
              >
                Reserve Event
              </button>
            )}
          </div>
        </div>
      </div>

      <div ref={sliderRef} className="eventDetailsPg_reviews">
        <ReviewCardContainer
          id={eventData.event_id}
          reviewsContent={
            Array.isArray(eventData.reviews) ? eventData.reviews : []
          }
        />
      </div>
      {eventData.reviews.length > 0 ? (
        <Buttons scrollLeft={scrollLeft} scrollRight={scrollRight} />
      ) : (
        ""
      )}

      <div className="eventDetailsPg_recommendations">
        <p className="eventDetailsPg_recommendations_heading">
          Some more recommendations for you!
        </p>

        <div className="eventDetailsPg_recommendations_cards">
          <RecommendationCardContainer number={10} />
        </div>
      </div>
    </div>
  );
};

export default EventDetails;
