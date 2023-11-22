import React from "react";
import { useNavigate } from "react-router-dom";
import ProfilePicture2 from "../../components/ProfilePicture2/ProfilePicture2";
import EditProfile from "../../components/EditProfile/EditProfile";
import Button from "../../components/shared/Button/Button";
import UploadImageButton from "../../components/shared/UploadImageButton/UploadImageButton";
import "./EditProfilePage.css";

function EditProfilePage() {

  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate("/ProfilePage");

    // needs an 'edit profile' function
    // needs an edit profile picture function - use UploadImageButton component
    // needs a 'go back' button
    

};

return (


    <div className="save-edits-button">
    <Button text="Save edits" onClick={} />
    </div>

    <div className="log-out-button">
     <Button text="Log out" onClick={} />
    </div>

     <div className="delete-account-button">
        <Button text="Delete account" onClick={} />
    </div>

)

}

export default EditProfilePage;
