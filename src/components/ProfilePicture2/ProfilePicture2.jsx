import React, { useState, useRef, useEffect } from "react";
import Parse from "parse/dist/parse.min";
import "./ProfilePicture2.css";

function ProfilePicture2({ showEditButton }) {
  const [image, setImage] = useState("/images/Alice.jpeg");
  const fileInputRef = useRef(null);

  useEffect(() => {
    const fetchProfilePicture = async () => {
      const currentUser = Parse.User.current();
      if (currentUser && currentUser.get("profilePicture")) {
        const profilePictureFile = currentUser.get("profilePicture");
        setImage(profilePictureFile.url());
      }
    };

    fetchProfilePicture();
  }, []);

  const handleImageChange = async (event) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      setImage(URL.createObjectURL(file)); // Temporarily show the selected image

      try {
        const parseFile = new Parse.File(file.name, file);
        await parseFile.save();

        const currentUser = Parse.User.current();
        if (currentUser) {
          currentUser.set("profilePicture", parseFile);
          await currentUser.save();
          console.log("Profile picture updated successfully");
        }
      } catch (error) {
        console.error("Error while uploading file: ", error);
      }
    }
  };

  return (
    <div className="profile-container">
      <img className="profile-picture" src={image} alt="Profile" />
      {showEditButton && (
        <>
          <input
            type="file"
            id="file-input"
            style={{ display: "none" }}
            accept="image/*"
            onChange={handleImageChange}
            ref={fileInputRef}
          />
          <label htmlFor="file-input" className="edit-profile-picture">
            <img
              src="https://www.svgrepo.com/show/75500/edit-button.svg"
              alt="Edit Profile"
              onClick={() => fileInputRef.current.click()}
            />
          </label>
        </>
      )}
    </div>
  );
}

export default ProfilePicture2;
