import React, { useState } from "react";
import Button from "../../components/shared/Button/Button";
import UploadImageButton from "../../components/shared/UploadImageButton/UploadImageButton";
import "./AddRestaurantPage2.css";

function AddRestaurantPage2() {
  const [selectedImage, setSelectedImage] = useState(null);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    setSelectedImage(file);
  };

  const handleChooseFileClick = () => {};

  return (
    <div className="add-restaurant-page">
      <div className="add-restaurant-fields">
        <div className="friend-title">Add Restaurant P2</div>

        <form>
          <div className="restaurant-comment-input-field">
            <label htmlFor="restaurantComment">
              What do you think about the restaurant?
            </label>
            <textarea
              id="restaurantComment"
              rows={4}
              placeholder="Write your comment here..."
            />
          </div>

          <div className="restaurant-comment-input-field">
            <UploadImageButton
              selectedImage={selectedImage}
              handleImageChange={handleImageChange}
              handleChooseFileClick={handleChooseFileClick}
            />
          </div>
        </form>

      </div>
      <div className="add-restaurant-button">
          <Button text="Save and Publish" />
        </div>

    </div>
  );
}

export default AddRestaurantPage2;
