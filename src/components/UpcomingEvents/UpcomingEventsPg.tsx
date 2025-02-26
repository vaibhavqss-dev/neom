import React, { JSX } from "react";
import desertcity from "../../assets/desertcity.jpg";
import RecommendationCard from "../base/recommendationCards/recommendationCard";
import SelectDistance from "../base/selectdistance/selectdistance";

// Added type definition for filter state
type FilterState = {
  date: string;
  location: string;
  distance: { type: string; value: number };
  category: string;
  isDistanceApplied: boolean;
  isCategoryApplied: boolean;
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

  function onFilterChange(e: any, filterType: keyof FilterState) {
    let value = typeof e === "string" ? e : e.target.value;
    setFilter((prev) => {
      let updated: any = { ...prev };
      if (Object.keys(filterType)[0] === "distance") {
        updated.distance = Object.values(filterType)[0];
        updated.isDistanceApplied = true;
      } else if (filterType === "category") {
        updated.category = value as string;
        updated.isCategoryApplied = true;
      } else {
        updated[filterType] = value as string;
      }
      return updated;
    });
  }

  React.useEffect(() => {
    const AllEvents = Array.from({ length: 20 }).map((_, index) => ({
      index: index,
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
      if (Filter.location && Filter.location !== event.location) return false;
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
      filteredEvents.map((event) => (
        <RecommendationCard
          key={event.index} // added key prop to fix list key error
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
  }, [Filter]);

  return (
    <div className="upcomingEventsPg">
      <h1 className="upcomingEventsPg_heading">Hey Vaibhav,</h1>

      <p className="upcomingEventsPg_text">
        Let's find something exciting for you.
      </p>

      <div className="upcomingEventsPg_date_and_distance">
        <div className="upcomingEventsPg_date">
          <p className="upcomingEventsPg_date_text">
            What suits your schedules?
          </p>

          <div className="upcomingEventsPg_dateLocation_btns">
            <input
              type="date"
              onChange={(e) => onFilterChange(e, "date")}
              className="upcomingEventsPg_dateLocation_btns_date"
              placeholder="Pick a date"
            />
            <input
              type="text"
              onChange={(e) => onFilterChange(e, "location")}
              className="upcomingEventsPg_dateLocation_btns_text"
              placeholder="Pick a location"
            />
          </div>
        </div>

        <SelectDistance setDistance={onFilterChange} />
      </div>

      <div className="upcomingEventsPg_eventsType">
        <p className="upcomingEventsPg_eventsType_text">
          You can always filter out the events by category wise.
        </p>

        <div className="upcomingEventsPg_eventsType_btns">
          <button
            onClick={(e) => onFilterChange("Stand Up Comedy", "category")}
            className="upcomingEventsPg_eventsType_btn"
          >
            Stand Up Comedy
          </button>
          <button
            onClick={(e) => onFilterChange("RAMP Walk", "category")}
            className="upcomingEventsPg_eventsType_btn"
          >
            RAMP Walk
          </button>
          <button
            onClick={(e) => onFilterChange("Box Cricket", "category")}
            className="upcomingEventsPg_eventsType_btn"
          >
            Box Cricket
          </button>
          <button
            onClick={(e) => onFilterChange("Swimming", "category")}
            className="upcomingEventsPg_eventsType_btn"
          >
            Swimming
          </button>
          <button
            onClick={(e) => onFilterChange("Golf Tournament", "category")}
            className="upcomingEventsPg_eventsType_btn"
          >
            Golf Tournament
          </button>
          <button
            onClick={(e) => onFilterChange("Singing", "category")}
            className="upcomingEventsPg_eventsType_btn"
          >
            Singing
          </button>
          <button
            onClick={(e) => onFilterChange("Talks Shows", "category")}
            className="upcomingEventsPg_eventsType_btn"
          >
            Talks Shows
          </button>
          <button
            onClick={(e) => onFilterChange("Kite Surfing", "category")}
            className="upcomingEventsPg_eventsType_btn"
          >
            Kite Surfing
          </button>
          <button
            onClick={(e) => onFilterChange("Book Exhibitions", "category")}
            className="upcomingEventsPg_eventsType_btn"
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
