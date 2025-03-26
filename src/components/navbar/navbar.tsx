import React, { useState, useRef, useCallback, memo } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import Neom from "../../assets/img/logo.jpg";
import bell from "../../assets/img/bell.svg";
import web from "../../assets/img/web.svg";
import CancelConfirmationPopup from "./models/cancelEventPopup/cancelConfirmation";
import ConfirmReSchedule from "./models/confirmReschedulePopup/confirmReSchedule";
import NotificationItem from "./models/NotificationItem";
import { useNotifications } from "./hooks/useNotifications";
import "../../assets/css/notification.css";

type InterfaceProps = {
  isModelOpen?: (isOpen: boolean) => void;
};

const Navbar: React.FC<InterfaceProps> = ({ isModelOpen }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isRescheduleOpen, setIsRescheduleOpen] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState("English");
  const [activePopup, setActivePopup] = useState<string | null>(null);
  const [currentEventId, setCurrentEventId] = useState<string>("");
  const [currentEventName, setCurrentEventName] = useState<string>("");

  const notificationModelRef = useRef<HTMLDivElement>(null);
  const hamburgerModelRef = useRef<HTMLDivElement>(null);
  const languageModelRef = useRef<HTMLDivElement>(null);

  const {
    notifications,
    hasNewNotifications,
    markAsRead,
    clearNotifications,
    clearANotification,
  } = useNotifications();

  const navigate = useNavigate();

  const closeAllPopupsExcept = useCallback((keepOpen: string | null) => {
    // Notification popup
    if (keepOpen !== "notification_model" && notificationModelRef.current) {
      if (
        !notificationModelRef.current.classList.contains(
          "NotificationNOTActive"
        )
      ) {
        notificationModelRef.current.classList.add("NotificationNOTActive");
      }
    }

    // Hamburger popup
    if (keepOpen !== "hamburger_model" && hamburgerModelRef.current) {
      if (!hamburgerModelRef.current.classList.contains("active")) {
        hamburgerModelRef.current.classList.add("active");
      }
    }

    // Language popup
    if (keepOpen !== "language_model" && languageModelRef.current) {
      if (!languageModelRef.current.classList.contains("active")) {
        languageModelRef.current.classList.add("active");
      }
    }

    // Cancel popup
    if (keepOpen !== "cancel_popup") {
      setIsOpen(false);
    }

    // Reschedule popup
    if (keepOpen !== "reschedule_popup") {
      setIsRescheduleOpen(false);
    }
  }, []);

  const toggleMenu = useCallback(
    (selector: string): void => {
      if (activePopup === selector) {
        closeAllPopupsExcept(null);
        setActivePopup(null);
        isModelOpen?.(false);
        return;
      }

      closeAllPopupsExcept(selector);
      setActivePopup(selector);

      // Toggle appropriate class based on the selector
      let element: HTMLElement | null = null;
      let isHidden = false;

      if (selector === "notification_model" && notificationModelRef.current) {
        element = notificationModelRef.current;
        element.classList.toggle("NotificationNOTActive");
        isHidden = element.classList.contains("NotificationNOTActive");

        // Mark notifications as read when opening panel
        if (!isHidden) {
          notifications.forEach((notification) => markAsRead(notification.id));
        }
      } else if (selector === "hamburger_model" && hamburgerModelRef.current) {
        element = hamburgerModelRef.current;
        element.classList.toggle("active");
        isHidden = element.classList.contains("active");
      } else if (selector === "language_model" && languageModelRef.current) {
        element = languageModelRef.current;
        element.classList.toggle("active");
        isHidden = element.classList.contains("active");
      }

      isModelOpen?.(!isHidden);
    },
    [activePopup, closeAllPopupsExcept, isModelOpen, markAsRead, notifications]
  );

  const handleLanguageSelect = useCallback(
    (language: string) => {
      setSelectedLanguage(language);
      toggleMenu("language_model");
    },
    [toggleMenu]
  );

  const handleClosePopup = useCallback((): void => {
    setIsOpen(false);
    setActivePopup(null);
    isModelOpen?.(false);
  }, [isModelOpen]);

  const handleCloseReschedulePopup = useCallback((): void => {
    setIsRescheduleOpen(false);
    setActivePopup(null);
    isModelOpen?.(false);
  }, [isModelOpen]);

  const openCancelPopup = useCallback(
    (eventId: string, name: string) => {
      closeAllPopupsExcept("cancel_popup");
      setCurrentEventId(eventId);
      setCurrentEventName(name);
      setIsOpen(true);
      setActivePopup("cancel_popup");
      isModelOpen?.(true);
    },
    [closeAllPopupsExcept, isModelOpen]
  );

  const openReschedulePopup = useCallback(
    (eventId: string, name: string) => {
      closeAllPopupsExcept("reschedule_popup");
      setCurrentEventId(eventId);
      setCurrentEventName(name);
      setIsRescheduleOpen(true);
      setActivePopup("reschedule_popup");
      isModelOpen?.(true);
    },
    [closeAllPopupsExcept, isModelOpen]
  );

  const handleNeomLogoClick = useCallback(() => navigate("/"), [navigate]);

  return (
    <div
      className={`navbar ${isOpen || isRescheduleOpen ? "popup-active" : ""}`}
    >
      <CancelConfirmationPopup
        eventId={currentEventId}
        open={isOpen}
        eventname={currentEventName}
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
          onClick={handleNeomLogoClick}
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

        <div
          ref={notificationModelRef}
          className="notification_model NotificationNOTActive"
        >
          <div className="notification_model_cancel">
            <button
              className="notification_model_cancelBtn"
              onClick={() => toggleMenu("notification_model")}
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

        <div ref={hamburgerModelRef} className="hamburger_model active">
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

        <div ref={languageModelRef} className="language_model active">
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

export default memo(Navbar);
