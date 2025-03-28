import React, { useEffect, useState, useCallback } from "react";
import profilePic from "../../assets/img/profilePic.png";
import pencil from "../../assets/img/pencil.svg";
import Interest from "./selectInterest/interest";
import { get_data, patch_data, post_data } from "../../api/api";
import { useNotification } from "../../context/NotificationContext";

const formatDateForDisplay = (dateString: string): string => {
  if (!dateString) return "";

  try {
    let date: Date;
    if (dateString.includes("T")) {
      date = new Date(dateString);
    } else if (dateString.includes("-")) {
      const parts = dateString.split("-");
      if (parts[0].length === 4) {
        date = new Date(
          parseInt(parts[0]),
          parseInt(parts[1]) - 1,
          parseInt(parts[2])
        );
      } else {
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
    if (displayDate.includes("T")) {
      const date = new Date(displayDate);
      if (isNaN(date.getTime())) return "";

      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, "0");
      const day = String(date.getDate()).padStart(2, "0");

      return `${year}-${month}-${day}`;
    }
    if (displayDate.includes("-")) {
      const parts = displayDate.split("-");
      if (parts.length !== 3) return "";

      if (parts[0].length === 4) {
        return displayDate; // Already in correct format
      } else {
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
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);

  const { showNotification } = useNotification();

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

  async function UpdateProfile(updatedProfileData?: ProfileProps) {
    const profileToSend = updatedProfileData || { ...Profile };
    const data = await patch_data("/user/profile", profileToSend);
    if (data.profile?.dob) {
      data.profile.dob = formatDateForDisplay(data.profile.dob);
    }

    setProfile(data.updated_fields);

    if (data.updated_fields?.profile_img) {
      setProfileImage(data.updated_fields.profile_img);
    }
  }

  const handleSave = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      e.preventDefault();

      if (!Profile) {
        alert("Profile data not loaded");
        return;
      }

      if (profileImage !== profilePic) {
        setProfile((prev) =>
          prev ? { ...prev, profile_img: profileImage } : prev
        );
      }

      showNotification("Profile updated successfully!", "success");
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
        const data = await get_data("/user/profile");
        setProfile(data.profile);
        if (data.profile?.profile_img) {
          setProfileImage(data.profile.profile_img);
        }
      } catch (e) {
        console.error("Error fetching data:", e);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

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

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    const parts = value.split("-");
    if (parts.length === 3) {
      const formattedDate = `${parts[2]}-${parts[1]}-${parts[0]}`;
      setProfile((prev) => (prev ? { ...prev, dob: formattedDate } : prev));
    }
  };

  useEffect(() => {
    if (selectedFile) {
      uploadProfileImage();
    }
  }, [selectedFile]);

  const uploadProfileImage = async () => {
    if (!selectedFile) {
      console.error("No file selected");
      return;
    }

    setUploading(true);

    try {
      const presignedUrlData = await post_data("/user/profile/uploadimg", {
        profile_img_name: "my_profile",
      });
      if (!presignedUrlData || !presignedUrlData.uploadUrl) {
        alert("Error getting presigned URL");
        setUploading(false);
        return;
      }

      console.log("Attempting to upload to:", presignedUrlData.uploadUrl);
      console.log("File size:", selectedFile.size);

      const uploadResponse = await fetch(presignedUrlData.uploadUrl, {
        method: "PUT",
        body: selectedFile,
      });

      console.log("Upload response status:", uploadResponse.status);

      if (!uploadResponse.ok) {
        const errorText = await uploadResponse.text();
        console.error("Upload error response:", errorText);
        throw new Error(
          `Upload failed: ${uploadResponse.status} ${uploadResponse.statusText}`
        );
      }

      const publicUrl = presignedUrlData.publicUrl;
      console.log("Public URL:", publicUrl);

      if (Profile) {
        const updatedProfile = {
          ...Profile,
          profile_img: publicUrl,
        };

        console.log("Updated profile with new image:", updatedProfile);
        setProfileImage(publicUrl);
        await UpdateProfile(updatedProfile);
        setProfile(updatedProfile);
        showNotification("Profile image updated successfully!", "success");
      } else {
        console.error("Profile is undefined, cannot update");
      }
    } catch (e) {
      console.error("Error uploading profile image:", e);
      alert("Failed to upload image. Please try again.");
    } finally {
      setUploading(false);
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
                        setSelectedFile(file);

                        const imageUrl = URL.createObjectURL(file);
                        setProfileImage(imageUrl);
                      }
                    }}
                  />
                  <img
                    className="editProfilePg_container_left_img_profileImg"
                    src={Profile?.profile_img || profileImage}
                    alt="Profile"
                    style={{ opacity: uploading ? 0.5 : 1 }}
                  />
                  {uploading && (
                    <div
                      style={{
                        position: "absolute",
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                        zIndex: 2,
                      }}
                    >
                      Uploading...
                    </div>
                  )}
                  <img
                    className="editProfilePg_container_left_img_pencilbtn"
                    src={pencil}
                    onClick={() => {
                      if (!uploading) {
                        document.getElementById("profileImageInput")?.click();
                      }
                    }}
                    style={{ cursor: uploading ? "not-allowed" : "pointer" }}
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
