import React from "react";

const EditSetting: React.FC = () => {
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
          <form>
            <div className="editSettingPg_form_input">
              <div className="editSettingPg_form_input_text">
                <p>Personal and Account Information</p>
                <p>
                  Would you like to share your personal information with us to
                  know you better?
                </p>
              </div>
              <div className="editSettingPg_form_input_checkbox">
                <input type="checkbox" id="toggle" />
                <label></label>
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
              <div className="editSettingPg_form_input_checkbox">
                <input type="checkbox" id="toggle" />
                <label></label>
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
              <div className="editSettingPg_form_input_checkbox">
                <input type="checkbox" id="toggle" />
                <label></label>
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
              <div className="editSettingPg_form_input_checkbox">
                <input type="checkbox" id="toggle" />
                <label></label>
              </div>
            </div>

            <div className="editSettingPg_form_input_multiSelect">
              <div className="editSettingPg_form_input_text">
                <p>Notifications</p>
                <p>Which type of notifications would you like to receive?</p>
              </div>
              <div className="editSettingPg_form_input_checkbox _multiSelect">
                <div className="checkbox-item">
                  <input type="checkbox" id="toggle" />
                  <label>Emails</label>
                </div>
                <div className="checkbox-item">
                  <input type="checkbox" id="toggle" />
                  <label>Notifications</label>
                </div>
                <div className="checkbox-item">
                  <input type="checkbox" id="toggle" />
                  <label>Personalized notifications</label>
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
                  <input type="checkbox" id="toggle" />
                  <label>English</label>
                </div>
                <div className="checkbox-item">
                  <input type="checkbox" id="toggle" />
                  <label>French</label>
                </div>
                <div className="checkbox-item">
                  <input type="checkbox" id="toggle" />
                  <label>Arabic</label>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditSetting;
