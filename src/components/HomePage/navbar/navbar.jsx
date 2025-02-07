import React from "react";
import { NavLink } from "react-router-dom";
import Neom from "../../../assets/neom.png";
import bell from "../../../assets/bell.svg";
import web from "../../../assets/web.svg";
import bellnofiy from "../../../assets/bell-notify.svg";
import "./navbar.css";

export default function Navbar() {
  function toggleHamburger(e) {
    const hamburger_model = document.querySelector(".hamburger_model");
    hamburger_model.classList.toggle("active");
  }


  function toggleNotificationBtn() {
    const notification_model = document.querySelector(".notification_model");
    notification_model.classList.toggle("active");
  }

  return (
    <div className="navbar">

      <div className="neom">
        <img id="neom_logo" src={Neom} alt="neomlogo" />
      </div>

      <div className="links">
        <div className="links_page">
          <NavLink
            className={({ isActive }) =>
              isActive ? "isActive links_link" : "links_link"
            }
            to="/"
          >
            {" "}
            Dashboard{" "}
          </NavLink>
          <NavLink
            className={({ isActive }) =>
              isActive ? "isActive links_link" : "links_link"
            }
            to="/favorites"
          >
            {" "}
            My favorites{" "}
          </NavLink>
          <NavLink
            className={({ isActive }) =>
              isActive ? "isActive links_link" : "links_link"
            }
            to="/upcomingevents"
          >
            {" "}
            Upcoming events{" "}
          </NavLink>
        </div>

        <div onClick={(e) => toggleNotificationBtn(e)} className="notification">
          <img id="bell-logo" src={bell} alt="notification" />
        </div>

        <div className="notification_model">
          <div className="notification_model_cancel">
            <button
              className="notification_model_cancelBtn"
              onClick={(e) => toggleNotificationBtn(e)}
            >
              X
            </button>
          </div>

          <p className="notification_model_title">
            Hey Vaibhav{" "}
            <img
              id="notification_model_title_bell"
              src={bellnofiy}
              alt="bellnotify"
            />
          </p>

          <p className="notification_model_text">
            "We regret to inform you that the current weather conditions are not
            conductive for a golf session. Would you like to reschedule or
            cancel your golf session for today ?"
          </p>

          <div className="notification_model_btns">
            <button className="notification_model_btns_rescheduleBtn">
              Reschedule
            </button>
            <button className="notification_model_btns_cancelBtn">
              Cancel
            </button>
          </div>
        </div>

        <div className="links_hamburger">
          <button onClick={()=> toggleHamburger()} className="links_hamburger_containerBtn">
            <div></div>
            <div></div>
            <div></div>
          </button>
          <div className="hamburger_name">C</div>
        </div>

        <div className="hamburger_model active">
          <div className="hamburger_model_links">
            <a href="#">Edit Profile </a>
            <a href="#">Feedback</a>
            <a href="#">Settings</a>
          </div>
        </div>

        <div className="links_web">
          <img id="links_web_img" src={web} alt="web" />
        </div>
      </div>
      
    </div>
  );
}
