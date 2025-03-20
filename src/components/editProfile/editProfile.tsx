import React, { useEffect, useState, useCallback } from "react";
import profilePic from "../../assets/img/profilePic.png";
import pencil from "../../assets/img/pencil.svg";
import Interest from "./selectInterest/interest";

// Helper functions for date formatting
const formatDateForDisplay = (dateString: string): string => {
  if (!dateString) return "";

  try {
    // Handle ISO format (including with time), DD-MM-YYYY format, or YYYY-MM-DD format
    let date: Date;

    if (dateString.includes("T")) {
      // ISO format with time component
      date = new Date(dateString);
    } else if (dateString.includes("-")) {
      const parts = dateString.split("-");
      if (parts[0].length === 4) {
        // YYYY-MM-DD format
        date = new Date(
          parseInt(parts[0]),
          parseInt(parts[1]) - 1,
          parseInt(parts[2])
        );
      } else {
        // DD-MM-YYYY format
        date = new Date(
          parseInt(parts[2]),
          parseInt(parts[1]) - 1,
          parseInt(parts[0])
        );
      }
    } else {
      return "";
    }

    if (isNaN(date.getTime())) return "";

    // Format as DD-MM-YYYY
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();

    return `${day}-${month}-${year}`;
  } catch (e) {
    console.error("Error formatting date:", e);
    return "";
  }
};

const formatDateForInput = (displayDate: string): string => {
  if (!displayDate) return "";

  try {
    // If it's an ISO date with time, convert directly
    if (displayDate.includes("T")) {
      const date = new Date(displayDate);
      if (isNaN(date.getTime())) return "";

      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, "0");
      const day = String(date.getDate()).padStart(2, "0");

      return `${year}-${month}-${day}`;
    }

    // If already in YYYY-MM-DD format
    if (displayDate.includes("-")) {
      const parts = displayDate.split("-");
      if (parts.length !== 3) return "";

      if (parts[0].length === 4) {
        return displayDate; // Already in correct format
      } else {
        // Convert from DD-MM-YYYY to YYYY-MM-DD
        return `${parts[2]}-${parts[1]}-${parts[0]}`;
      }
    }

    return "";
  } catch (e) {
    console.error("Error formatting date for input:", e);
    return "";
  }
};

type ProfileProps = {
  name: string;
  email: string;
  mobile_number: string;
  interests: string[];
  likes: string[];
  dob: string;
  profile_img: string;
};

const EditProfile: React.FC = () => {
  const initialDateFormattingDone = React.useRef(false);
  const [profileImage, setProfileImage] = useState<string>(profilePic);
  const [Profile, setProfile] = useState<ProfileProps | undefined>();
  const [loading, setLoading] = useState(true);

  const onChangeHandler = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const { id, value } = e.target;
      setProfile((prev) => (prev ? { ...prev, [id]: value } : prev));
    },
    []
  );

  const handleInterestsChange = useCallback((newInterests: string[]) => {
    setProfile((prev) => (prev ? { ...prev, interests: newInterests } : prev));
  }, []);

  async function UpdateProfile() {
    try {
      // Create a copy of the profile to manipulate before sending
      const profileToSend = { ...Profile };

      // No need to transform the date as we're already storing it in DD-MM-YYYY format

      const response = await fetch("http://localhost:3001/api/user/profile", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(profileToSend),
      });
      const data = await response.json();

      // Format the date in the response
      if (data.profile?.dob) {
        data.profile.dob = formatDateForDisplay(data.profile.dob);
      }

      setProfile(data.profile);
    } catch (e) {
      console.error("Error updating data:", e);
    }
  }

  const handleSave = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      e.preventDefault();

      if (!Profile) {
        alert("Profile data not loaded");
        return;
      }
      alert("Profile updated successfully!");
      UpdateProfile();
    },
    [Profile, profileImage]
  );

  const handleCancel = useCallback(() => {
    if (
      window.confirm(
        "Are you sure you want to cancel? Any unsaved changes will be lost."
      )
    ) {
      window.history.back();
    }
  }, []);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch("http://localhost:3001/api/user/profile", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        const data = await response.json();
        setProfile(data.profile);
      } catch (e) {
        console.error("Error fetching data:", e);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  // Format date when profile data is received
  useEffect(() => {
    if (Profile?.dob && !initialDateFormattingDone.current) {
      setProfile((prev) => {
        if (!prev) return prev;
        initialDateFormattingDone.current = true;
        return {
          ...prev,
          dob: formatDateForDisplay(prev.dob),
        };
      });
    }
  }, [Profile]);

  // Special handler for date input
  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    // Convert YYYY-MM-DD from input to DD-MM-YYYY for storage
    const parts = value.split("-");
    if (parts.length === 3) {
      const formattedDate = `${parts[2]}-${parts[1]}-${parts[0]}`;
      setProfile((prev) => (prev ? { ...prev, dob: formattedDate } : prev));
    }
  };

  return (
    <>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <div className="editProfile">
          <div className="editProfilePg">
            <h1 className="editProfilePg_heading">
              Edit {Profile?.name}'s Profile
            </h1>
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
                        setProfileImage(imageUrl);
                      }
                    }}
                  />
                  <img
                    className="editProfilePg_container_left_img_profileImg"
                    src={profileImage}
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
                    onChange={onChangeHandler}
                    value={Profile?.name || ""}
                    type="text"
                    id="name"
                    placeholder="Vaibhav"
                    required
                  />
                </div>

                <div className="editProfilePg_container_right_inputs">
                  <label htmlFor="email">What's your email address?</label>
                  <input
                    onChange={onChangeHandler}
                    value={Profile?.email || ""}
                    type="email"
                    id="email"
                    placeholder="vaibhavemail@gmail.com"
                    required
                  />
                </div>

                <div className="editProfilePg_container_right_inputs">
                  <label htmlFor="mobile_number">
                    On which number can we contact you?
                  </label>
                  <input
                    onChange={onChangeHandler}
                    value={Profile?.mobile_number || ""}
                    type="number"
                    id="mobile_number"
                    placeholder="9971 87 7676"
                    required
                  />
                </div>

                <div className="editProfilePg_container_right_inputs">
                  <label htmlFor="dob">
                    When can we wish a happy birthday?
                  </label>
                  <input
                    onChange={handleDateChange}
                    // Using our improved formatter that can handle ISO dates with time
                    value={formatDateForInput(Profile?.dob || "")}
                    type="date"
                    id="dob"
                    placeholder="01-02-2001"
                    required
                  />
                </div>

                <div className="editProfilePg_container_right_intputs_interests">
                  <Interest
                    initialInterests={Profile?.interests || []}
                    onInterestsChange={handleInterestsChange}
                  />
                </div>

                <div className="editProfilePg_container_right_btns">
                  <button onClick={handleSave}>Save</button>
                  <button onClick={handleCancel}>Cancel</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default EditProfile;
