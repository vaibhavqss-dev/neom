import React from "react";
import profilePic from "../../assets/img/profilePic.png";
import pencil from "../../assets/img/pencil.svg";
import Interest from "./selectInterest/interest";

const EditProfile: React.FC = () => {
  const [Profile, setProfile] = React.useState({
    name: "Vaibhavv",
    email: "something@gmail.com",
    number: "9971877676",
    dob: "08/01/1000",
    interests: ["explore", "adventure", "travel"],
  });

  function onChangeHandler(e: React.ChangeEvent<HTMLInputElement>) {
    const { id, value } = e.target;
    setProfile((prev) => ({ ...prev, [id]: value }));
  }

  const handleInterestsChange = (newInterests: string[]) => {
    setProfile((prev) => ({ ...prev, interests: newInterests }));
  };

  return (
    <div className="editProfile">
      <div className="editProfilePg">
        <h1 className="editProfilePg_heading">Edit {Profile.name}'s Profile</h1>
        <div className="editProfilePg_container">
          <div className="editProfilePg_container_left">
            <div className="editProfilePg_container_left_img">
              <input
                type="file"
                accept="image/*"
                id="profileImageInput"
                style={{ display: "none" }}
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) {
                    const imageUrl = URL.createObjectURL(file);
                    const profileImg = document.querySelector(
                      ".editProfilePg_container_left_img_profileImg"
                    ) as HTMLImageElement;
                    if (profileImg) {
                      profileImg.src = imageUrl;
                    }
                  }
                }}
              />
              <img
                className="editProfilePg_container_left_img_profileImg"
                src={profilePic}
                alt="Profile"
              />
              <img
                className="editProfilePg_container_left_img_pencilbtn"
                src={pencil}
                onClick={() =>
                  document.getElementById("profileImageInput")?.click()
                }
                style={{ cursor: "pointer" }}
              />
            </div>
          </div>
          <div className="editProfilePg_container_right">
            <div className="editProfilePg_container_right_inputs">
              <label htmlFor="name">What should we call you?</label>
              <input
                onChange={(e) => onChangeHandler(e)}
                value={Profile.name}
                type="text"
                id="name"
                placeholder="Vaibhav"
              />
            </div>

            <div className="editProfilePg_container_right_inputs">
              <label htmlFor="email">What's your email address?</label>
              <input
                onChange={(e) => onChangeHandler(e)}
                value={Profile.email}
                type="email"
                id="email"
                placeholder="vaibhavemail@gmail.com"
              />
            </div>

            <div className="editProfilePg_container_right_inputs">
              <label htmlFor="number">
                On which number can we contact you?
              </label>
              <input
                onChange={(e) => onChangeHandler(e)}
                value={Profile.number}
                type="number"
                id="number"
                placeholder="9971 87 7676"
              />
            </div>

            <div className="editProfilePg_container_right_inputs">
              <label htmlFor="date">When can we wish a happy birthday?</label>
              <input
                onChange={(e) => onChangeHandler(e)}
                value={Profile.dob}
                type="date"
                id="dob"
                placeholder="08/01/1979"
              />
            </div>

            <div className="editProfilePg_container_right_intputs_interests">
              <Interest
                initialInterests={Profile.interests}
                onInterestsChange={handleInterestsChange}
              />
            </div>

            <div className="editProfilePg_container_right_btns">
              <button>Save</button>
              <button>Cancel</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditProfile;
