import FriendCards from "../../components/FriendCard/friendcards";
import "./FriendsPage.css";

function FriendsPage() {
  return (
    <div className="friend-page">
      <div className="friend-title">Friends</div>

      <div className="friend-search-container">
        <input
          type="text"
          placeholder="🔍 Search friends"
          className="friend-search-input"
        />
      </div>

      <div className="friend-card-appearance">
        <FriendCards />
      </div>
    </div>
  );
}

export default FriendsPage;
