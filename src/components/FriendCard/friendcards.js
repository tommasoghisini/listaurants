import React, { useState, useEffect} from "react";
import Parse from "parse/dist/parse.min.js";
import "./friendcards.css";
import ProfilePicture from "../shared/ProfilePicture/ProfilePicture";

function FriendCards({
  filteredUsers,
  friendNames,
  addedNames,
  currentUserName,
}) {
  return (
    <div>
      {filteredUsers.map((user, index) => (
        <Card
          key={index}
          user={user}
          currentUserName={currentUserName}
          isFriend={(friendNames ?? []).includes(user)}
          isAdded={(addedNames ?? []).includes(user)}
        />
      ))}
    </div>
  );
}

const Card = React.memo(({ user, isFriend, currentUserName, isAdded }) => {
  const [added, setAdded] = useState(isAdded);
  const [friend, setFriend] = useState(isFriend);
  console.log("Status: " + user + ": " + isFriend);

  useEffect(() => {
    setAdded(isAdded);
    setFriend(isFriend);
  }, [isAdded, isFriend]);

  const handleAction = async () => {
    if (added) {
      console.log("Already added");
      return;
    } else if (friend) {
      console.log("Trying to remove friend");

      try {
        const Friendship = Parse.Object.extend("Friendship");
        const query1 = new Parse.Query(Friendship);
        const query2 = new Parse.Query(Friendship);

        // Query for the friendship where user2=user
        query1.equalTo("user1", {
          __type: "Pointer",
          className: "_User",
          objectId: currentUserName,
        });
        query1.equalTo("user2", {
          __type: "Pointer",
          className: "_User",
          objectId: user,
        });

        // Query for the friendship where user1=user
        query2.equalTo("user1", {
          __type: "Pointer",
          className: "_User",
          objectId: user,
        });
        query2.equalTo("user2", {
          __type: "Pointer",
          className: "_User",
          objectId: currentUserName,
        });

        const mainQuery = Parse.Query.or(query1, query2);

        const rowToDelete = await mainQuery.first();
        if (rowToDelete) {
          const result = await rowToDelete.destroy();
          setAdded(false);
          setFriend(false);
          isFriend = false;
          isAdded = false;
          console.log("Friendship removed successfully:", result);
        } else {
          console.log("Friendship not found");
        }
      } catch (error) {
        console.error("Error removing friend:", error);
      }
    } else {
      console.log(`Adding friend: ${user}`);
      try {
        const Friendship = Parse.Object.extend("Friendship");
        const newFriendship = new Friendship();

        newFriendship.set("user1", {
          __type: "Pointer",
          className: "_User",
          objectId: currentUserName,
        });
        newFriendship.set("user2", {
          __type: "Pointer",
          className: "_User",
          objectId: user,
        });

        newFriendship.set("status", "Pending");

        const result = await newFriendship.save();
        setAdded(true); 
        isAdded= true;

        console.log("Friendship added successfully:", result);
      } catch (error) {
        console.error("Error adding friend:", error);
      }
    }
  };

  return (
    <div className="friend-card">
      <div className="friend-content">
        <div className="image-container">
          <ProfilePicture imgSrc={"/images/bob.jpeg"} height="50px" />
        </div>
        <div className="text-container">
          <h1 className="friend-name">{user}</h1>
        </div>
        <button className="action-button" onClick={handleAction}>
          {added ? "Added" : friend ? "Remove" : "Add"}
        </button>
      </div>
    </div>
  );
});

export default FriendCards;
