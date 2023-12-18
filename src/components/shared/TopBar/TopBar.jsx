import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Parse from "parse/dist/parse.min.js";
import "./TopBar.css";

function TopBar({ pageName }) {
  const [hasUnreadNotifications, setHasUnreadNotifications] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUnreadNotificationsCount = async () => {
      const currentUser = Parse.User.current();
      const Notifications = Parse.Object.extend("Notifications");
      const query = new Parse.Query(Notifications);
      query.equalTo("userToBeNotified", currentUser.id);
      query.equalTo("isRead", false);
      const count = await query.count();
      setHasUnreadNotifications(count > 0);
    };

    fetchUnreadNotificationsCount();
  }, []);

  // tried to use conditional statement and just fill in the color into svg but somehow it did not work, so fell back to just using 2 icons.
  // const notificationIconStyle = hasUnreadNotifications ? { height: "20px", fill: "#cf0808" } : { height: "20px" };

  // Determine which notification icon to use
  const notificationIcon = hasUnreadNotifications
    ? "./icons/notification-alert.svg"
    : "./icons/notification.svg";

  return (
    <div className="top-bar">
      <div className="top-bar-name">{pageName}</div>
      <img
        src={notificationIcon}
        onClick={() => navigate("/notification")}
        alt="notification"
        style={{ height: "20px" }}
        className="top-bar-notification"
      />
    </div>
  );
}

export default TopBar;
