import React, { useState, useEffect, useMemo} from "react";
import { useNavigate, useLocation } from "react-router-dom";
import ListCards from "../../components/ListCard/ListCards";
import ProfilePicture2 from "../../components/ProfilePicture2/ProfilePicture2";
import ProfilePicture from "../../components/shared/ProfilePicture/ProfilePicture";
import ButtonSh from "../../components/shared/ButtonShort/ButtonShort";
import TopBar from "../../components/shared/TopBar/TopBar";
import "./ProfilePage.css";
import Parse from "parse/dist/parse.min";

const ProfilePage = () => {
  const navigate = useNavigate();
  const [editProfilePressed, setEditProfilePressed] = useState(false);
  const [friendsPressed, setFriendsPressed] = useState(false);
  const [userName, setUserName] = useState(""); // State to store the user's name

  const [currentUser, setCurrentUser] = useState("");
  const [profileUser, setProfileUser] = useState("");
  const [profileUserImg, setProfileUserImg] = useState("");
  const [friendsNumber, setFriendsNumber] = useState(0); // State to store the number of friends
  const [Wishlist, setWishlist] = useState([]);
  const [Favourites, setFavourites] = useState([]);
  const [isOther, setIsOther] = useState("");

  const location = useLocation();


  useEffect(() => {
    const fetchUserData = async () => {
      const currentUser = Parse.User.current();
      setCurrentUser(currentUser);

      if (currentUser instanceof Parse.User) {
        try {
          const urlSearchParams = new URLSearchParams(location.search);
          const parameter = urlSearchParams.get("userParameter");

          if (parameter) {
            setIsOther(true);
            const UserData = Parse.Object.extend("_User");
            const query = new Parse.Query(UserData);
            query.equalTo("objectId", parameter);
            const friends = await query.find();

            if (friends.length > 0) {
              const friend = friends[0];
              setProfileUser(friend);
              const image = friend.get("profilePicture")
                ? friend.get("profilePicture").url()
                :  "/images/pp.jpeg";
              setProfileUserImg(image);
              setUserName(friend.get("name") || "Anonymous");

            } else {
              console.log("User not found");
            }
          } else {
            const profileUser=currentUser;
            setProfileUser(currentUser);
            setUserName(currentUser.get("name") || "Anonymous");
            setIsOther(false);
            console.log("my profile", profileUser.get("name"));
          }
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      }
    };

    fetchUserData();
  }, [location.search]);

  const fetchFriendsNumber = async (currentUser) => {
    if (currentUser) {
      const FriendshipData = Parse.Object.extend("Friendship");
      const User = Parse.Object.extend("User");
      const userPointer = new User();
      userPointer.id = currentUser.getUsername();

      // Query for friendships where current user is user1
      const queryUser1 = new Parse.Query(FriendshipData);
      queryUser1.equalTo("user1", userPointer);
      queryUser1.equalTo("status", "Friends");
      queryUser1.include("user2"); // Include user2 data

      // Query for friendships where current user is user2
      const queryUser2 = new Parse.Query(FriendshipData);
      queryUser2.equalTo("user2", userPointer);
      queryUser2.equalTo("status", "Friends");
      queryUser2.include("user1"); // Include user1 data

      // Combine the queries
      const combinedQuery = Parse.Query.or(queryUser1, queryUser2);
      const count = await combinedQuery.count();
      setFriendsNumber(count);
    }
  };

  const fetchRestaurants = async (profileUser) => {
    const RestaurantData = Parse.Object.extend("Post");
    const query = new Parse.Query(RestaurantData);
    query.equalTo("userId", profileUser.id);
    const results = await query.find();
    const Wishlist = results.filter(
      (post) => post.get("savedToList") === "Wishlist"
    );
    const Favourites = results.filter(
      (post) => post.get("savedToList") === "Favourites"
    );

    setWishlist(Wishlist);
    setFavourites(Favourites);
    console.log("fetching restaurants done");
  };

  useEffect(() => {
      if (isOther && profileUser instanceof Parse.Object) {
        fetchRestaurants(profileUser);
      }else if (!isOther && currentUser instanceof Parse.User){
        fetchFriendsNumber(currentUser);
        fetchRestaurants(currentUser);
      }
    
  },  [isOther, currentUser, profileUser]);

  const handleEditProfileClick = () => {
    navigate("/editprofilepage");
    setEditProfilePressed(true);
  };

  const handleFriendsClick = () => {
    navigate("/friendspage");
    setFriendsPressed(true);
  };

  return (
    <div className="container-sana">
      <TopBar pageName="Profile" />
      {/*<BackButton />*/}
      <div className="profile-section">
        {!isOther ? (
          <ProfilePicture2 showEditButton={false} /> 
          
        ) : (
          <ProfilePicture imgSrc={profileUserImg}  height={"150px"} />
        )}
        {<p className="profile-name">{userName}</p>}
      </div>
      <div className="buttons-container-profile">
        {!isOther && (
          <ButtonSh
            text="Edit Profile"
            onClick={handleEditProfileClick}
            className={editProfilePressed ? "button pressed" : "button"}
          />
        )}
        {!isOther && (
          <ButtonSh
            text={friendsNumber + " Friends"}
            onClick={handleFriendsClick}
            className={friendsPressed ? "button pressed" : "button"}
          />
        )}
      </div>
      <div className="cards-container">
        <ListCards
          className="cards"
          Wishlist={Wishlist}
          Favourites={Favourites}
        />
      </div>
    </div>
  );
}

export default React.memo(ProfilePage);
