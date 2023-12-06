import NotificationCards from "../../components/NotificationCard/notificationcards";
import "./NotificationPage.css";
import TopBar from "../../components/shared/TopBar/TopBar";

function NotificationPage() {
  return (
    <div className="friend-page">
      <TopBar pageName={"Notifications"} />
      <div className="friend-card-appearance">
        <NotificationCards />
      </div>
    </div>
  );
}

export default NotificationPage;
