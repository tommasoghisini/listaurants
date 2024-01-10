import React, { useEffect, useState } from "react";
import NotificationCards from "../../components/NotificationCard/notificationcards";
import TopBar from "../../components/shared/TopBar/TopBar";
import Parse from "parse/dist/parse.min.js";

function NotificationPage() {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const fetchNotifications = async () => {
      const currentUser = Parse.User.current();
      const Notifications = Parse.Object.extend("Notifications");
      const query = new Parse.Query(Notifications);
      query.equalTo("userToBeNotified", currentUser.id);
      query.equalTo("isRead", false);
      const results = await query.find();

      // Get the user data for each notification
      const notificationsWithUserData = await Promise.all(
        results.map(async (notif) => {
          const userQuery = new Parse.Query(Parse.User);
          userQuery.equalTo("objectId", notif.get("userId"));
          const user = await userQuery.first();
          return {
            message: notif.get("message"),
            imgSrc: user.get("profilePicture").url(),
            notifId: notif.id,
          };
        })
      );

      setNotifications(notificationsWithUserData);

      // Mark notifications as read
      results.forEach((notif) => {
        notif.set("isRead", true);
        notif.save();
      });
    };

    fetchNotifications();
  }, []);

  return (
    <div className="friend-page">
      <TopBar pageName={"Notifications"} />
      <div className="friend-card-appearance">
        <NotificationCards notifications={notifications} />
      </div>
    </div>
  );
}

export default NotificationPage;
