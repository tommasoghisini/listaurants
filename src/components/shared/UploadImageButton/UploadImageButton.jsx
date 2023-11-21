import React, { useRef } from "react";
import "./UploadImageButton.css";

const UploadImageButton = ({
  selectedImage,
  handleImageChange,
  handleChooseFileClick,
}) => {
  const fileInputRef = useRef(null);

  return (
    <div className="restaurant-input-field">
      <label htmlFor="restaurantImage">Restaurant Image</label>
      {selectedImage && (
        <div className="uploaded-image-container">
          <img
            src={URL.createObjectURL(selectedImage)}
            alt="Selected"
            className="uploaded-cropped-image"
          />
        </div>
      )}
      <input
        type="file"
        id="restaurantImage"
        accept="image/*"
        onChange={handleImageChange}
        ref={fileInputRef}
      />
    </div>
  );
};

export default UploadImageButton;
