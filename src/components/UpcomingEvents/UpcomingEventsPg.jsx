import React from "react";
import desertcity from "../../assets/desertcity.jpg";

export default function UpcomingEventsPg() {
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

          <div className="upcomingEventsPg_date_location_btns">
            <button className="upcomingEventsPg_date_btn">Pick a date</button>
            <button className="upcomingEventsPg_location_btn">
              Pick a location
            </button>
          </div>
        </div>

        <div className="upcomingEventsPg_distance">
          <p className="upcomingEventsPg_distance_text">
            How far are you willing to go?
          </p>

          <div className="upcomingEventsPg_distance_btns">
            <div className="upcomingEventsPg_distance_btns_walking">
              <button className="upcomingEventsPg_distance_btn">
                10 mins Walking
              </button>
              <button className="upcomingEventsPg_distance_btn">
                20 mins Walking
              </button>
              <button className="upcomingEventsPg_distance_btn">
                30 mins Walking
              </button>
            </div>

            <div className="upcomingEventsPg_distance_btns_driving">
              <button className="upcomingEventsPg_distance_btn">
                10 mins Driving
              </button>
              <button className="upcomingEventsPg_distance_btn">
                20 mins Driving
              </button>
              <button className="upcomingEventsPg_distance_btn">
                30 mins Driving
              </button>
            </div>

            <div className="upcomingEventsPg_distance_btns_no_limit">
              <button className="upcomingEventsPg_distance_btn">
                No limit
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="upcomingEventsPg_eventsType">
        <p className="upcomingEventsPg_eventsType_text">
          You can always filter out the events by category wise.
        </p>

        <div className="upcomingEventsPg_eventsType_btns">
          <button className="upcomingEventsPg_eventsType_btn">
            Stand Up Comedy
          </button>
          <button className="upcomingEventsPg_eventsType_btn">RAMP Walk</button>
          <button className="upcomingEventsPg_eventsType_btn">
            Box Cricket
          </button>
          <button className="upcomingEventsPg_eventsType_btn">Swimming</button>
          <button className="upcomingEventsPg_eventsType_btn">
            Golf Tournament
          </button>
          <button className="upcomingEventsPg_eventsType_btn">Singing</button>
          <button className="upcomingEventsPg_eventsType_btn">
            Talks Shows
          </button>
          <button className="upcomingEventsPg_eventsType_btn">
            Kite Surfing
          </button>
          <button className="upcomingEventsPg_eventsType_btn">
            Book Exhibitions
          </button>
        </div>
      </div>

      <div className="upcomingEventsPg_events_img_container">
        {Array.from({ length: 20 }).map((_, index) => (
          <div className="upcomingEventsPg_events_img_container_img">
            <img
              src={desertcity}
              alt="Upcoming Events"
              className="upcomingEventsPg_events_img_container_img"
            />

            <div className="upcomingEventsPg_events_img_container_img_text">
              <div className="upcomingEventsPg_events_img_container_img_text_subtext">
                <p className="upcomingEventsPg_events_img_container_img_text_subtext_name">
                  Vibrant & Social
                </p>
                <p className="upcomingEventsPg_events_img_container_img_text_subtext_date">
                  Nov 10 - 29
                </p>
              </div>

              <p className="upcomingEventsPg_events_img_container_img_text_name">
                Round of Golf
              </p>

              <p className="upcomingEventsPg_events_img_container_img_text_time">
                7:00 AM - 9:00 AM
              </p>
            </div>
          </div>
        ))}
      </div>
      
    </div>
  );
}
