import Neom from "../../../assets/neom.png";
import bell from "../../../assets/bell.svg";
import web from "../../../assets/web.svg";
import "./header.css";

export default function Header() {
  
  
  
  
  // Hamburger Functionality
  function toggleHamburger() {
    const hamburger = document.querySelector(".hamburger");
    const hamburger_model = document.querySelector(".hamburger_model");
    hamburger.addEventListener("click", () => {
      hamburger_model.classList.toggle("active");
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

        <div className="notification">
          <img id="bell-logo" src={bell} alt="notification" />
        </div>

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
