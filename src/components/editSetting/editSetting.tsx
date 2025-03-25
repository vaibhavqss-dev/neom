import React, { useEffect, useState } from "react";
import { get_data, patch_data, post_data } from "../../api/api";

type SettingsProps = {
  personalandAccount: boolean;
  operator: boolean;
  managedata: boolean;
  password_security: boolean;
  notification_email: boolean;
  notification_sms: boolean;
  notification_personalized: boolean;
  language: string;
};

const EditSetting: React.FC = () => {
  const [settings, setSettings] = useState<SettingsProps | undefined>();

  const handleToggle = (
    settingName: string,
    settingValue: string | boolean
  ) => {
    setSettings((prevSettings) => {
      if (!prevSettings) return prevSettings;
      return {
        ...prevSettings,
        [settingName]: settingValue,
      };
    });
  };

  const handleLanguageChange = (language: string) => {
    setSettings((prevSettings) => {
      if (!prevSettings) return prevSettings;
      return {
        ...prevSettings,
        language: language,
      };
    });
  };

  async function fetchSettings() {
    try {
      const data = await get_data(`/user/settings`);
      setSettings(data.settings);
    } catch (error) {
      console.error("Error fetching settings:", error);
    }
  }
  useEffect(() => {
    fetchSettings();
  }, []);

  async function updateSettings() {
    try {
      const data = await patch_data(`/user/settings`, settings);
      if (data.error) {
        console.error("API error:", data.error);
        return;
      }
      alert("Settings submitted successfully");
    } catch (error) {
      console.error("Error submitting settings:", error);
    }
  }
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateSettings();
  };

  return (
    <div className="editSetting">
      <div className="editSettingPg">
        <div className="editSettingPg_headers">
          <h1>Good morning {localStorage.getItem("fullname")}!</h1>
          <p>
            You can change the settings for your personal data and other
            information.
          </p>
        </div>

        <div className="editSettingPg_form">
          <form onSubmit={handleSubmit}>
            <div className="editSettingPg_form_input">
              <div className="editSettingPg_form_input_text">
                <p>Personal and Account Information</p>
                <p>
                  Would you like to share your personal information with us to
                  know you better?
                </p>
              </div>
              <div className="editSettingPg_form_input_toggle">
                <input
                  type="checkbox"
                  id="personalInfo"
                  checked={settings?.personalandAccount || false}
                  onChange={() =>
                    handleToggle(
                      "personalandAccount",
                      !settings?.personalandAccount
                    )
                  }
                />
                <label htmlFor="personalInfo"></label>
              </div>
            </div>

            <div className="editSettingPg_form_input">
              <div className="editSettingPg_form_input_text">
                <p>Consent for sharing information with operators</p>
                <p>
                  Would you like to share your personal information with the
                  operator to serve you better?
                </p>
              </div>
              <div className="editSettingPg_form_input_toggle">
                <input
                  type="checkbox"
                  id="operatorConsent"
                  checked={settings?.operator || false}
                  onChange={() => handleToggle("operator", !settings?.operator)}
                />
                <label htmlFor="operatorConsent"></label>
              </div>
            </div>

            <div className="editSettingPg_form_input">
              <div className="editSettingPg_form_input_text">
                <p>Manage your data</p>
                <p>
                  Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed
                  diam nonumy eirmod?
                </p>
              </div>
              <div className="editSettingPg_form_input_toggle">
                <input
                  type="checkbox"
                  id="manageData"
                  checked={settings?.managedata || false}
                  onChange={() =>
                    handleToggle("managedata", !settings?.managedata)
                  }
                />
                <label htmlFor="manageData"></label>
              </div>
            </div>

            <div className="editSettingPg_form_input">
              <div className="editSettingPg_form_input_text">
                <p>Password and Security</p>
                <p>
                  Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed
                  diam nonumy eirmod?
                </p>
              </div>
              <div className="editSettingPg_form_input_toggle">
                <input
                  type="checkbox"
                  id="passwordSecurity"
                  checked={settings?.password_security || false}
                  onChange={() =>
                    handleToggle(
                      "password_security",
                      !settings?.password_security
                    )
                  }
                />
                <label htmlFor="passwordSecurity"></label>
              </div>
            </div>

            <div className="editSettingPg_form_input_multiSelect">
              <div className="editSettingPg_form_input_text">
                <p>Notifications</p>
                <p>Which type of notifications would you like to receive?</p>
              </div>
              <div className="editSettingPg_form_input_checkbox _multiSelect">
                <div className="checkbox-item">
                  <input
                    type="checkbox"
                    id="notificationsEmails"
                    checked={settings?.notification_email || false}
                    onChange={() =>
                      handleToggle(
                        "notification_email",
                        !settings?.notification_email
                      )
                    }
                  />
                  <label htmlFor="notificationsEmails">Emails</label>
                </div>
                <div className="checkbox-item">
                  <input
                    type="checkbox"
                    id="notificationsApp"
                    checked={settings?.notification_sms || false}
                    onChange={() =>
                      handleToggle(
                        "notification_sms",
                        !settings?.notification_sms
                      )
                    }
                  />
                  <label htmlFor="notificationsApp">Notifications</label>
                </div>
                <div className="checkbox-item">
                  <input
                    type="checkbox"
                    id="notificationsPersonalized"
                    checked={settings?.notification_personalized || false}
                    onChange={() =>
                      handleToggle(
                        "notification_personalized",
                        !settings?.notification_personalized
                      )
                    }
                  />
                  <label htmlFor="notificationsPersonalized">
                    Personalized notifications
                  </label>
                </div>
              </div>
            </div>

            <div className="editSettingPg_form_input_multiSelect">
              <div className="editSettingPg_form_input_text">
                <p>Language</p>
                <p>
                  Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed
                  diam nonumy eirmod?
                </p>
              </div>
              <div className="editSettingPg_form_input_checkbox _multiSelect">
                <div className="checkbox-item">
                  <input
                    type="radio"
                    id="languageEnglish"
                    name="language"
                    checked={settings?.language === "english"}
                    onChange={() => handleLanguageChange("english")}
                  />
                  <label htmlFor="languageEnglish">English</label>
                </div>
                <div className="checkbox-item">
                  <input
                    type="radio"
                    id="languageFrench"
                    name="language"
                    checked={settings?.language === "french"}
                    onChange={() => handleLanguageChange("french")}
                  />
                  <label htmlFor="languageFrench">French</label>
                </div>
                <div className="checkbox-item">
                  <input
                    type="radio"
                    id="languageArabic"
                    name="language"
                    checked={settings?.language === "arabic"}
                    onChange={() => handleLanguageChange("arabic")}
                  />
                  <label htmlFor="languageArabic">Arabic</label>
                </div>
              </div>
            </div>

            <div className="editSettingPg_form_submit">
              <button type="submit" className="submit-btn">
                Save Settings
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditSetting;
