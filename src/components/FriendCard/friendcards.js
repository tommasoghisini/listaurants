import React from "react";
import Parse from "parse/dist/parse.min.js";
import "./friendcards.css";

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

function Card({ user, isFriend, currentUserName, isAdded }) {
  const handleAction = async () => {
    if (isFriend) {
      console.log('Trying to remove friend')


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
          <div className="profile-image-border">
            <div className="profile-image-wrapper">
              <img
                src={"images/bob.jpeg"}
                alt="Profile"
                className="profile-image"
              />
            </div>
          </div>
        </div>
        <div className="text-container">
          <h1 className="friend-name">{user}</h1>
        </div>
        <button className="action-button" onClick={handleAction}>
          {isAdded ? "Added" : isFriend ? "Remove" : "Add"}
        </button>
      </div>
    </div>
  );
}

export default FriendCards;
