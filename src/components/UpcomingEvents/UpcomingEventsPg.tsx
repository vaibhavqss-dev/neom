import React, { JSX } from "react";
import desertcity from "../../assets/img/desertcity.jpg";
import Card from "../base/card/card";
import SelectDistance from "../base/selectdistance/selectdistance";
import location from "../../assets/img/location.svg";
import calender from "../../assets/img/calendar.svg";

type FilterState = {
  date: string;
  location: string;
  distance: { type: string; value: number };
  category: string;
  isDistanceApplied: boolean;
  isCategoryApplied: boolean;
};

type likedEvents = {
  id: string;
  name: string;
};

const UpcomingEventsPg: React.FC = () => {
  const [events, setEvents] = React.useState<JSX.Element[]>([]);
  const [Filter, setFilter] = React.useState<FilterState>({
    date: "",
    location: "",
    distance: { type: "", value: 0 },
    category: "",
    isDistanceApplied: false,
    isCategoryApplied: false,
  });

  const [likedEvents, setLikedEvents] = React.useState<likedEvents[]>([]);
  function handleLike(id: string, name: string) {
    console.log("Liked Event: ", id, name);
    setLikedEvents((prev) => {
      if (prev.map((ele) => ele.id).includes(id)) {
        return prev.filter((ele) => ele.id !== id);
      } else {
        return [...prev, { id, name }];
      }
    });
  }

  function onFilterChange(e: any, filterType: string | "distance") {
    if (filterType === "distance" && typeof e === "object") {
      setFilter((prev) => ({
        ...prev,
        distance: e,
        isDistanceApplied: true,
      }));
    } else if (filterType === "category") {
      const categoryValue = e;
      setFilter((prev) => ({
        ...prev,
        category: categoryValue,
        isCategoryApplied: true,
      }));
    } else {
      const value = e.target.value;
      setFilter((prev) => ({
        ...prev,
        [filterType]: value,
      }));
    }
  }

  React.useEffect(() => {
    // API call to get all events list according to POST request
    // like Filter useState
    const AllEvents = Array.from({ length: 10 }).map((_, index) => ({
      index: index,
      eventId: index,
      imgURL: "https://picsum.photos/800/600",
      subtextDate: "Nov 10 - 29",
      subtextName: "Vibrant & Social",
      name: "Round of Golf",
      timeRange: "7:00 AM - 9:00 AM",
      location: "Delhi",
      category: [
        "Singing",
        "Golf Tournament",
        "Box Cricket",
        "Swimming",
        "Stand Up Comedy",
        "RAMP Walk",
        "Talks Shows",
        "Kite Surfing",
        "Book Exhibitions",
      ][index % 4],
      date: "Nov 10 - 29",
      time: "7:00 AM - 9:00 AM",
      distance: { type: "walking", value: 20 },
    }));

    const filteredEvents = AllEvents.filter((event) => {
      if (Filter.date && Filter.date !== event.date) return false;
      if (
        Filter.location &&
        !event.location.toLowerCase().includes(Filter.location.toLowerCase())
      )
        return false;
      if (Filter.category && Filter.category !== event.category) return false;
      if (Filter.isDistanceApplied) {
        if (Filter.distance.type === "walking") {
          if (Filter.distance.value <= event.distance.value) return true;
          return false;
        } else if (Filter.distance.type === "driving") {
          if (Filter.distance.value <= event.distance.value) return true;
          return false;
        }
      }
      return true;
    });

    setEvents(
      filteredEvents.map((event, index) => (
        <Card
          isLiked={likedEvents
            .map((item) => item.id)
            .includes(String(event.eventId))}
          eventId={String(event.eventId)}
          handleLike={handleLike}
          key={event.index}
          index={event.index}
          imgURL={event.imgURL}
          subtextDate={event.subtextDate}
          subtextName={event.subtextName}
          name={event.name}
          timeRange={event.timeRange}
          location={event.location}
          category={event.category}
          date={event.date}
          time={event.time}
        />
      ))
    );
  }, [Filter, likedEvents]);

  return (
    <div className="upcomingEventsPg">
      <h1 className="upcomingEventsPg_heading">Hey Vaibhav,</h1>

      <p className="upcomingEventsPg_subtext">
        Let's find something exciting for you.
      </p>

      <div className="upcomingEventsPg_date_and_distance">
        <div className="upcomingEventsPg_date">
          <p className="upcomingEventsPg_date_text">
            What suits your schedules?
          </p>

          <div className="upcomingEventsPg_dateLocation_btns">
            <div className="upcomingEventsPg_dateLocation_btns_date">
              <img src={calender} alt="calendersvg" />
              <input
                type="date"
                onChange={(e) => onFilterChange(e, "date")}
                className="upcomingEventsPg_dateLocation_btns_dateBtn"
                placeholder="Pick a date"
              />
            </div>

            <div className="upcomingEventsPg_dateLocation_btns_location">
              <img src={location} alt="location" />
              <input
                type="text"
                onChange={(e) => onFilterChange(e, "location")}
                className="upcomingEventsPg_dateLocation_btns_text"
                placeholder="Pick a location"
              />
            </div>
          </div>
        </div>

        <SelectDistance Filter={Filter} setDistance={onFilterChange} />
      </div>

      <div className="upcomingEventsPg_eventsType">
        <p className="upcomingEventsPg_eventsType_text">
          You can always filter out the events by category wise.
        </p>

        <div className="upcomingEventsPg_eventsType_btns">
          <button
            onClick={(e) => onFilterChange("Stand Up Comedy", "category")}
            className={
              Filter.category === "Stand Up Comedy"
                ? "upcomingEventsPg_eventsType_btn_active"
                : "upcomingEventsPg_eventsType_btn"
            }
          >
            Stand Up Comedy
          </button>
          <button
            onClick={(e) => onFilterChange("RAMP Walk", "category")}
            className={
              Filter.category === "RAMP Walk"
                ? "upcomingEventsPg_eventsType_btn_active"
                : "upcomingEventsPg_eventsType_btn"
            }
          >
            RAMP Walk
          </button>
          <button
            onClick={(e) => onFilterChange("Box Cricket", "category")}
            className={
              Filter.category === "Box Cricket"
                ? "upcomingEventsPg_eventsType_btn_active"
                : "upcomingEventsPg_eventsType_btn"
            }
          >
            Box Cricket
          </button>
          <button
            onClick={(e) => onFilterChange("Swimming", "category")}
            className={
              Filter.category === "Swimming"
                ? "upcomingEventsPg_eventsType_btn_active"
                : "upcomingEventsPg_eventsType_btn"
            }
          >
            Swimming
          </button>
          <button
            onClick={(e) => onFilterChange("Golf Tournament", "category")}
            className={
              Filter.category === "Golf Tournament"
                ? "upcomingEventsPg_eventsType_btn_active"
                : "upcomingEventsPg_eventsType_btn"
            }
          >
            Golf Tournament
          </button>
          <button
            onClick={(e) => onFilterChange("Singing", "category")}
            className={
              Filter.category === "Singing"
                ? "upcomingEventsPg_eventsType_btn_active"
                : "upcomingEventsPg_eventsType_btn"
            }
          >
            Singing
          </button>
          <button
            onClick={(e) => onFilterChange("Talks Shows", "category")}
            className={
              Filter.category === "Talks Shows"
                ? "upcomingEventsPg_eventsType_btn_active"
                : "upcomingEventsPg_eventsType_btn"
            }
          >
            Talks Shows
          </button>
          <button
            onClick={(e) => onFilterChange("Kite Surfing", "category")}
            className={
              Filter.category === "Kite Surfing"
                ? "upcomingEventsPg_eventsType_btn_active"
                : "upcomingEventsPg_eventsType_btn"
            }
          >
            Kite Surfing
          </button>
          <button
            onClick={(e) => onFilterChange("Book Exhibitions", "category")}
            className={
              Filter.category === "Book Exhibitions"
                ? "upcomingEventsPg_eventsType_btn_active"
                : "upcomingEventsPg_eventsType_btn"
            }
          >
            Book Exhibitions
          </button>
        </div>
      </div>

      <div className="upcomingEventsPg_recommendation">
        {events.length == 0 ? (
          <div className="ColorRed">Currently out of service :(</div>
        ) : (
          events
        )}
      </div>
    </div>
  );
};

export default UpcomingEventsPg;
