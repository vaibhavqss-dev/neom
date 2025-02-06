import Neom from "../../../assets/neom.png";
import bell from "../../../assets/bell.svg";
import web from "../../../assets/web.svg";
import bellnofiy from "../../../assets/bell-notify.svg";
import "./navbar.css";

export default function Navbar() {
  function toggleHamburger(e) {
    const hamburger = document.querySelector(".hamburger");
    const hamburger_model = document.querySelector(".hamburger_model");
    hamburger.addEventListener("click", () => {
      hamburger_model.classList.toggle("active");
    });
  }
  function toggleOpenBtn(e) {
    const notification = document.querySelector(".notification");
    const notification_model = document.querySelector(".notification_model");
    notification.addEventListener("click", () => {
      notification_model.classList.toggle("active");
    });
  }
  function toggleCloseBtn(e) {
    const notification_model = document.querySelector(".notification_model");
    notification_model.addEventListener("click", () => {
      notification_model.classList.toggle("active");
    });
  }

  return (
    <div className="header">
      <div className="neomLogoContainer">
        <img id="neom-logo" src={Neom} alt="neomlogo" />
      </div>
      <div className="dashboard">
        <div className="links">
          <a href="#">Dashboard </a>
          <a href="#">My favorites</a>
          <a href="#">Upcoming events</a>
        </div>

        <div onClick={(e) => toggleOpenBtn(e)} className="notification">
          <img id="bell-logo" src={bell} alt="notification" />
        </div>

        {/* Notification Model */}
        <div className="notification_model">
          <div className="notification_model_cancel">
            <button
              className="notification_model_cancelBtn"
              onClick={(e) => toggleCloseBtn(e)}
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
        {/* Notification Model End*/}

        <div className="hamburger">
          <div className="hamburgerIcons">
            <div></div>
            <div></div>
            <div></div>
          </div>
          <div className="hamburger-character">C</div>
        </div>

        <div className="hamburger_model active">
          <div className="hamburger_model_links">
            <a href="#">Edit Profile </a>
            <a href="#">Feedback</a>
            <a href="#">Settings</a>
          </div>
        </div>

        <div className="web">
          <img id="web-logo" src={web} alt="web" />
        </div>
      </div>
    </div>
  );
}
