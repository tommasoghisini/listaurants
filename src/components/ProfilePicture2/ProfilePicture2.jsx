import React, { useState } from "react";
import "./ProfilePicture2.css";

// const images = ["/images/Alice.jpeg"];

// function ProfilePicture2() {
//   return (
//     <div className="profile-container">
//       {/*<img className="profile-picture" src={AliceImage} alt="Alice" />*/}
//       <img className="profile-picture" src={images[0]} alt="Alice" />
//     </div>
//   );
// }
//
// export default ProfilePicture2;

function ProfilePicture2() {
  const [image, setImage] = useState("/images/Alice.jpeg");

  const handleImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      let img = event.target.files[0];
      setImage(URL.createObjectURL(img));
    }
  };

  return (
    <div className="profile-container">
      <img className="profile-picture" src={image} alt="Profile" />
      <input
        type="file"
        id="file-input"
        style={{ display: "none" }}
        accept="image/*"
        onChange={handleImageChange}
      />
      <label htmlFor="file-input" className="edit-profile-picture">
        <img
          src="https://www.svgrepo.com/show/75500/edit-button.svg"
          alt="Edit Profile"
        />
      </label>
    </div>
  );
}

export default ProfilePicture2;
