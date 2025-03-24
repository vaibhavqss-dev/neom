import React, { useState, useEffect, useRef } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import Neom from "../../assets/img/logo.jpg";
import bell from "../../assets/img/bell.svg";
import web from "../../assets/img/web.svg";
import bellnofiy from "../../assets/img/bell-notify.svg";
import CancelConfirmationPopup from "./models/cancelEventPopup/cancelConfirmation";
import ConfirmReSchedule from "./models/confirmReschedulePopup/confirmReSchedule";
import NotificationItem from "./models/NotificationItem";
import { useNotifications } from "../../hooks/useNotifications";
import "../../assets/css/notification.css";

type interfaceProps = {
  isModelOpen?: (isOpen: boolean) => void;
};

const Navbar: React.FC<interfaceProps> = ({ isModelOpen }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isRescheduleOpen, setIsRescheduleOpen] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState("English");
  const [activePopup, setActivePopup] = useState<string | null>(null);
  const [currentEventId, setCurrentEventId] = useState<string>("");
  const [currentEventName, setCurrentEventName] = useState<string>("");

  const {
    notifications,
    hasNewNotifications,
    markAsRead,
    clearNotifications,
    clearANotification,
  } = useNotifications();

  const closeAllPopupsExcept = (keepOpen: string | null) => {
    if (keepOpen !== "notification_model") {
      const notificationElement = document.querySelector(".notification_model");
      if (!notificationElement?.classList.contains("NotificationNOTActive")) {
        notificationElement?.classList.add("NotificationNOTActive");
      }
    }

    if (keepOpen !== "hamburger_model") {
      const hamburgerElement = document.querySelector(".hamburger_model");
      if (!hamburgerElement?.classList.contains("active")) {
        hamburgerElement?.classList.add("active");
      }
    }

    if (keepOpen !== "language_model") {
      const languageElement = document.querySelector(".language_model");
      if (!languageElement?.classList.contains("active")) {
        languageElement?.classList.add("active");
      }
    }

    if (keepOpen !== "cancel_popup") {
      setIsOpen(false);
    }

    if (keepOpen !== "reschedule_popup") {
      setIsRescheduleOpen(false);
    }
  };

  const toggleMenu = (selector: string): void => {
    if (activePopup === selector) {
      closeAllPopupsExcept(null);
      setActivePopup(null);
      isModelOpen?.(false);
      // clearNotifications();
      return;
    }

    closeAllPopupsExcept(selector);
    setActivePopup(selector);

    const element = document.querySelector(`.${selector}`);
    element?.classList.toggle(
      selector === "notification_model" ? "NotificationNOTActive" : "active"
    );

    const isHidden =
      selector === "notification_model"
        ? element?.classList.contains("NotificationNOTActive")
        : element?.classList.contains("active");

    isModelOpen?.(!isHidden);

    // Mark notifications as read when opening notification panel
    if (selector === "notification_model" && !activePopup) {
      notifications.forEach((notification) => markAsRead(notification.id));
    }
  };

  const handleLanguageSelect = (language: string) => {
    setSelectedLanguage(language);
    toggleMenu("language_model");
  };

  const handleClosePopup = (): void => {
    setIsOpen(false);
    setActivePopup(null);
    isModelOpen?.(false);
  };

  const handleCloseReschedulePopup = (): void => {
    setIsRescheduleOpen(false);
    setActivePopup(null);
    isModelOpen?.(false);
  };

  const navigate = useNavigate();

  const openCancelPopup = (eventId: string, name: string) => {
    closeAllPopupsExcept("cancel_popup");
    setCurrentEventId(eventId);
    setCurrentEventName(name);
    setIsOpen(true);
    setActivePopup("cancel_popup");
    isModelOpen?.(true);
  };

  const openReschedulePopup = (eventId: string, name: string) => {
    closeAllPopupsExcept("reschedule_popup");
    setCurrentEventId(eventId);
    setCurrentEventName(name);
    setIsRescheduleOpen(true);
    setActivePopup("reschedule_popup");
    isModelOpen?.(true);
  };

  return (
    <div
      className={`navbar ${isOpen || isRescheduleOpen ? "popup-active" : ""}`}
    >
      <CancelConfirmationPopup
        eventId={currentEventId}
        open={isOpen}
        name={currentEventName}
        onClose={handleClosePopup}
        clearANotification={clearANotification}

      />

      <ConfirmReSchedule
        eventId={currentEventId}
        open={isRescheduleOpen}
        name={currentEventName}
        onClose={handleCloseReschedulePopup}
      />

      <div className="neom">
        <img
          onClick={() => navigate("/")}
          id="neom_logo"
          src={Neom}
          alt="neomlogo"
        />
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
          {hasNewNotifications && <span className="notification-badge"></span>}
        </div>

        <div className="notification_model NotificationNOTActive">
          <div className="notification_model_cancel">
            <button
              className="notification_model_cancelBtn"
              onClick={() => clearNotifications()}
            >
              X
            </button>
          </div>

          {notifications.length > 0 ? (
            notifications.map((notification) => (
              <NotificationItem
                key={notification.id}
                notification={notification}
                onReschedule={openReschedulePopup}
                onCancel={openCancelPopup}
              />
            ))
          ) : (
            <div className="no-notifications">
              <p>No notifications</p>
            </div>
          )}
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
