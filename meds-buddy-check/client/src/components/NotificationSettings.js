import React, { useState } from 'react';

const NotificationSettings = () => {
  const [emailNotifications, setEmailNotifications] = useState(false);
  const [smsNotifications, setSmsNotifications] = useState(false);
  const [pushNotifications, setPushNotifications] = useState(false);

  const handleSave = (e) => {
    e.preventDefault();
    // For now, just alert the settings
    alert('Notification settings saved (mock)');
  };

  return (
    <div className="notification-settings-container">
      <h2>Notification Settings</h2>
      <form onSubmit={handleSave}>
        <div>
          <label>
            <input
              type="checkbox"
              checked={emailNotifications}
              onChange={() => setEmailNotifications(!emailNotifications)}
            />
            Email Notifications
          </label>
        </div>
        <div>
          <label>
            <input
              type="checkbox"
              checked={smsNotifications}
              onChange={() => setSmsNotifications(!smsNotifications)}
            />
            SMS Notifications
          </label>
        </div>
        <div>
          <label>
            <input
              type="checkbox"
              checked={pushNotifications}
              onChange={() => setPushNotifications(!pushNotifications)}
            />
            Push Notifications
          </label>
        </div>
        <button type="submit">Save Settings</button>
      </form>
    </div>
  );
};

export default NotificationSettings;
