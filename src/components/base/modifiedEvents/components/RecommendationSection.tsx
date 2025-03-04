import React from "react";
import SelectDistance from "../../selectdistance/selectdistance";
import Card from "../../card/card";

export type FilterState = {
  date: string;
  location: string;
  distance: { type: string; value: number };
  category: string;
  isDistanceApplied: boolean;
  isCategoryApplied: boolean;
};

export type RecommendationLiked = {
  id: number;
  name: string;
};

type RecommendationSectionProps = {
  filter: FilterState;
  onFilterChange: (e: any, filterType: string) => void;
  events: any[];
  liked: RecommendationLiked[];
  handleLike: (id: number, name: string) => void;
};

const RecommendationSection: React.FC<RecommendationSectionProps> = ({
  filter,
  onFilterChange,
  events,
  liked,
  handleLike,
}) => {
  return (
    <div className="events_similarRecommendation">
      <SelectDistance Filter={filter} setDistance={onFilterChange} />
      <div className="events_similarRecommendation_card">
        {events.length ? (
          events.map((ele: any) => (
            <Card
              key={ele.id}
              handleLike={handleLike}
              isLiked={liked.map((item) => item.id).includes(ele.id)}
              id={ele.id}
              index={ele.id}
              imgURL={ele.imgURL}
              subtextDate={ele.subtextDate}
              subtextName={ele.subtextName}
              name={ele.name}
              timeRange={ele.timeRange}
              location={ele.location}
              category={ele.category}
              date={ele.date}
              time={ele.time}
            />
          ))
        ) : (
          <span style={{ color: "red" }}>No events found for your filters</span>
        )}
      </div>
    </div>
  );
};

export default RecommendationSection;
