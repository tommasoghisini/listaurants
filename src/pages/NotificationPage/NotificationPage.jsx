import NotificationCards from "../../components/NotificationCard/notificationcards";
import "./NotificationPage.css";

function NotificationPage() {
  return (
    <div className="friend-page">
      <div className="friend-title">Notifications</div>
      <div className="friend-card-appearance">
        <NotificationCards />
      </div>
    </div>
  );
}

export default NotificationPage;
