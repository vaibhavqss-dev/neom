import React from "react";
import { NavLink } from "react-router-dom";
import Neom from "../../assets/neom.png";
import bell from "../../assets/bell.svg";
import web from "../../assets/web.svg";
import bellnofiy from "../../assets/bell-notify.svg";

type interfaceProps = {
  isModelOpen?: (isOpen: boolean) => void;
};

const Navbar: React.FC<interfaceProps> = ({ isModelOpen }) => {
  function toggleHamburger() {
    const hamburger_model = document.querySelector(".hamburger_model");
    hamburger_model?.classList.toggle("active");
  }

  function toggleNotificationBtn() {
    const notification_model = document.querySelector(".notification_model");
    notification_model?.classList.toggle("NotificationNOTActive");

    if (!notification_model?.classList.contains("NotificationNOTActive")) {
      isModelOpen?.(true);
    } else {
      isModelOpen?.(false);
    }
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
            to="/upcoming-events"
          >
            {" "}
            Upcoming events{" "}
          </NavLink>
        </div>

        <div onClick={toggleNotificationBtn} className="notification">
          <img id="bell-logo" src={bell} alt="notification" />
        </div>

        <div className="notification_model NotificationNOTActive">
          <div className="notification_model_cancel">
            <button
              className="notification_model_cancelBtn"
              onClick={toggleNotificationBtn}
            >
              X
            </button>
          </div>

          <p className="notification_model_title">
            Hey Vaibhav <img src={bellnofiy} alt="bellImg" />
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
          <button
            onClick={toggleHamburger}
            className="links_hamburger_containerBtn"
          >
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
};

export default Navbar;
