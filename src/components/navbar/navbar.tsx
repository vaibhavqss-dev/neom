import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import Neom from "../../assets/img/logo.jpg";
import bell from "../../assets/img/bell.svg";
import web from "../../assets/img/web.svg";
import bellnofiy from "../../assets/img/bell-notify.svg";
import CancelConfirmationPopup from "./models/cancelEventPopup/cancelConfirmation";
import ConfirmReSchedule from "./models/confirmReschedulePopup/confirmReSchedule";

type interfaceProps = {
  isModelOpen?: (isOpen: boolean) => void;
};

const Navbar: React.FC<interfaceProps> = ({ isModelOpen }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isRescheduleOpen, setIsRescheduleOpen] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState("English");

  const toggleMenu = (selector: string): void => {
    // Don't allow menu toggling when the popup is open
    if (isOpen) return;

    const element = document.querySelector(`.${selector}`);
    element?.classList.toggle(
      selector === "notification_model" ? "NotificationNOTActive" : "active"
    );

    const isHidden =
      selector === "notification_model"
        ? element?.classList.contains("NotificationNOTActive")
        : element?.classList.contains("active");

    isModelOpen?.(!isHidden);
  };

  const handleLanguageSelect = (language: string) => {
    setSelectedLanguage(language);
    toggleMenu("language_model");
  };

  const handleClosePopup = (): void => {
    setIsOpen(false);
    const notificationElement = document.querySelector(".notification_model");
    if (!notificationElement?.classList.contains("NotificationNOTActive")) {
      notificationElement?.classList.add("NotificationNOTActive");
    }
    isModelOpen?.(false);
  };

  const handleCloseReschedulePopup = (): void => {
    setIsRescheduleOpen(false);
    const notificationElement = document.querySelector(".notification_model");
    if (!notificationElement?.classList.contains("NotificationNOTActive")) {
      notificationElement?.classList.add("NotificationNOTActive");
    }
    isModelOpen?.(false);
  };

  return (
    <div
      className={`navbar ${isOpen || isRescheduleOpen ? "popup-active" : ""}`}
    >
      <CancelConfirmationPopup
        eventId="1"
        open={isOpen}
        name="Vaibhav"
        onClose={handleClosePopup}
      />

      <ConfirmReSchedule
        eventId="1"
        open={isRescheduleOpen}
        name="Vaibhav"
        onClose={handleCloseReschedulePopup}
      />

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
            Dashboard
          </NavLink>
          <NavLink
            className={({ isActive }) =>
              isActive ? "isActive links_link" : "links_link"
            }
            to="/favorites"
          >
            My favorites
          </NavLink>
          <NavLink
            className={({ isActive }) =>
              isActive ? "isActive links_link" : "links_link"
            }
            to="/upcoming-events"
          >
            Upcoming events
          </NavLink>
        </div>

        <div
          onClick={() => toggleMenu("notification_model")}
          className="notification"
        >
          <img id="bell-logo" src={bell} alt="notification" />
        </div>

        <div className="notification_model NotificationNOTActive">
          <div className="notification_model_cancel">
            <button
              className="notification_model_cancelBtn"
              onClick={() => toggleMenu("notification_model")}
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
            <button
              className="notification_model_btns_rescheduleBtn"
              onClick={() => {
                setIsRescheduleOpen(true);
                // Close the notification when opening the popup
                document
                  .querySelector(".notification_model")
                  ?.classList.add("NotificationNOTActive");
              }}
            >
              Reschedule
            </button>
            <button
              onClick={() => {
                setIsOpen(true);
                // Close the notification when opening the popup
                document
                  .querySelector(".notification_model")
                  ?.classList.add("NotificationNOTActive");
              }}
              className="notification_model_btns_cancelBtn"
            >
              Cancel
            </button>
          </div>
        </div>

        <div className="links_hamburger">
          <button
            onClick={() => toggleMenu("hamburger_model")}
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
            <NavLink
              onClick={() => toggleMenu("hamburger_model")}
              className={({ isActive }) =>
                isActive ? "isActive links_link" : "links_link"
              }
              to="/edit-profile"
            >
              Edit Profile
            </NavLink>
            <NavLink
              onClick={() => toggleMenu("hamburger_model")}
              className={({ isActive }) =>
                isActive ? "isActive links_link" : "links_link"
              }
              to="/myfeedback"
            >
              Feedback
            </NavLink>

            <NavLink
              onClick={() => toggleMenu("hamburger_model")}
              className={({ isActive }) =>
                isActive ? "isActive links_link" : "links_link"
              }
              to="/edit-setting"
            >
              Settings
            </NavLink>
          </div>
        </div>

        <div className="links_web">
          <img
            onClick={() => toggleMenu("language_model")}
            id="links_web_img"
            src={web}
            alt="web"
          />
        </div>

        <div className="language_model active">
          <div className="language_model_links">
            <a href="#" onClick={() => handleLanguageSelect("English")}>
              English{" "}
              {selectedLanguage === "English" && (
                <span className="language-tick">✓</span>
              )}
            </a>
            <a href="#" onClick={() => handleLanguageSelect("French")}>
              French{" "}
              {selectedLanguage === "French" && (
                <span className="language-tick">✓</span>
              )}
            </a>
            <a href="#" onClick={() => handleLanguageSelect("Arabic")}>
              Arabic{" "}
              {selectedLanguage === "Arabic" && (
                <span className="language-tick">✓</span>
              )}
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
