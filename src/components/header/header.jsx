import Neom from "../../assets/neom.png";
import bell from "../../assets/bell.svg";
import web from "../../assets/web.svg";
import "./header.css";

export default function Header() {
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

        <div className="hamburgerContainer">
          <div className="hamburger">
            <div></div>
            <div></div>
            <div></div>
          </div>
          <div className="hamburger-character">C</div>
        </div>

        <div className="web">
          <img id="web-logo" src={web} alt="web" />
        </div>
      </div>
    </div>
  );
}
