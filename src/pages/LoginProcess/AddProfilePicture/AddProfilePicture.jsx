import "./AddProfilePicture.css";
import { useNavigate, useParams } from "react-router-dom";
import Button from "../../../components/shared/Button/Button";
import TopbarSignup from "../../../components/TopbarSignup/TopbarSignup";
import Parse from "parse/dist/parse.min";
import React, { useEffect, useRef, useState } from "react";
function AddProfilePicture() {
  const navigate = useNavigate();
  const { username } = useParams();
  const [image, setImage] = useState("/icons/addProfile.svg");
  const fileInputRef = useRef(null);

  const handleImageChange = async (event) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      setImage(URL.createObjectURL(file));

      try {
        const parseFile = new Parse.File(file.name, file);
        await parseFile.save();

        const currentUser = Parse.User.current();
        if (currentUser) {
          currentUser.set("profilePicture", parseFile);
          await currentUser.save();
          console.log("Profile picture updated successfully");
          navigate(`/added-picture/${username}`);
        }
      } catch (error) {
        console.error("Error while uploading file: ", error);
      }
    }
  };

  const handleChooseFileClick = () => {
    fileInputRef.current.click();
  };

  return (
    <div className="verification-page">
      <TopbarSignup prevProgress={0.6} progressMax={0.8} />

      <h1 className="title">
        Add a profile picture <span className="optional-text">(Optional)</span>
      </h1>
      <label htmlFor="file-input" className="profile-img-label">
        <img src={image} height={200} alt="profile-img" />
      </label>
      <input
        type="file"
        id="file-input"
        style={{ display: "none" }}
        accept="image/*"
        onChange={handleImageChange}
        ref={fileInputRef}
      />
      <Button text="Add photo" onClick={handleChooseFileClick} />
    </div>
  );
}

export default AddProfilePicture;
