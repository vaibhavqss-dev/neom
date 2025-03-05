import React, { useState } from "react";

const EditSetting: React.FC = () => {
  const [settings, setSettings] = useState({
    personalInfo: false,
    operatorConsent: false,
    manageData: false,
    passwordSecurity: false,
    notifications: {
      emails: false,
      notifications: false,
      personalizedNotifications: false,
    },
    language: {
      english: false,
      french: false,
      arabic: false,
    },
  });

  const handleToggle = (setting: string) => {
    setSettings({
      ...settings,
      [setting]: !settings[setting as keyof typeof settings],
    });
  };

  const handleNestedToggle = (
    category: "notifications" | "language",
    setting: string
  ) => {
    setSettings({
      ...settings,
      [category]: {
        ...settings[category],
        [setting]:
          !settings[category][
            setting as keyof (typeof settings)[typeof category]
          ],
      },
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Settings to be submitted:", settings);
    // Here you would call your API
    // submitSettingsToApi(settings);
  };

  return (
    <div className="editSetting">
      <div className="editSettingPg">
        <div className="editSettingPg_headers">
          <h1>Good morning Vaibhav!</h1>
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
                  checked={settings.personalInfo}
                  onChange={() => handleToggle("personalInfo")}
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
                  checked={settings.operatorConsent}
                  onChange={() => handleToggle("operatorConsent")}
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
                  checked={settings.manageData}
                  onChange={() => handleToggle("manageData")}
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
                  checked={settings.passwordSecurity}
                  onChange={() => handleToggle("passwordSecurity")}
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
                    checked={settings.notifications.emails}
                    onChange={() =>
                      handleNestedToggle("notifications", "emails")
                    }
                  />
                  <label htmlFor="notificationsEmails">Emails</label>
                </div>
                <div className="checkbox-item">
                  <input
                    type="checkbox"
                    id="notificationsApp"
                    checked={settings.notifications.notifications}
                    onChange={() =>
                      handleNestedToggle("notifications", "notifications")
                    }
                  />
                  <label htmlFor="notificationsApp">Notifications</label>
                </div>
                <div className="checkbox-item">
                  <input
                    type="checkbox"
                    id="notificationsPersonalized"
                    checked={settings.notifications.personalizedNotifications}
                    onChange={() =>
                      handleNestedToggle(
                        "notifications",
                        "personalizedNotifications"
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
                    type="checkbox"
                    id="languageEnglish"
                    checked={settings.language.english}
                    onChange={() => handleNestedToggle("language", "english")}
                  />
                  <label htmlFor="languageEnglish">English</label>
                </div>
                <div className="checkbox-item">
                  <input
                    type="checkbox"
                    id="languageFrench"
                    checked={settings.language.french}
                    onChange={() => handleNestedToggle("language", "french")}
                  />
                  <label htmlFor="languageFrench">French</label>
                </div>
                <div className="checkbox-item">
                  <input
                    type="checkbox"
                    id="languageArabic"
                    checked={settings.language.arabic}
                    onChange={() => handleNestedToggle("language", "arabic")}
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
