import { useState } from "react";
import ProfileTab from "./tabs/ProfileTab";
import PasswordTab from "./tabs/PasswordTab";
import EmailTab from "./tabs/EmailTab";
import PictureTab from "./tabs/PictureTab";
import ContactTab from "./tabs/ContactTab";

import "../styles/settings.css";

const Settings = () => {
  const [activeTab, setActiveTab] = useState("profile");

  const tabs = [
    { id: "profile", label: "Profile" },
    { id: "password", label: "Password" },
    { id: "email", label: "Email" },
    { id: "picture", label: "Profile Picture" },
    { id: "contact", label: "Address / Phone" }
  ];

  return (
    <div className="settings-container">
      <div className="settings-tabs">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            className={`tab-btn ${activeTab === tab.id ? "active" : ""}`}
            onClick={() => setActiveTab(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="settings-content">
        {activeTab === "profile" && <ProfileTab />}
        {activeTab === "password" && <PasswordTab />}
        {activeTab === "email" && <EmailTab />}
        {activeTab === "picture" && <PictureTab />}
        {activeTab === "contact" && <ContactTab />}
      </div>
    </div>
  );
};

export default Settings;
