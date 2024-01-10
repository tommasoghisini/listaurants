import React, { useRef, useEffect } from "react";
import "./UploadImageButton.css";

const UploadImageButton = ({
  selectedImage,
  handleImageChange,
  handleChooseFileClick,
}) => {
  const fileInputRef = useRef(null);

  useEffect(() => {
    if (selectedImage instanceof File) {
      const reader = new FileReader();
      reader.onload = (e) => {
        document.getElementById("uploadedImage").src = e.target.result;
      };
      reader.readAsDataURL(selectedImage);
    } else if (typeof selectedImage === "string" && selectedImage.startsWith("http")) {
      document.getElementById("uploadedImage").src = selectedImage;
    }
  }, [selectedImage]);

  return (
    <div className="restaurant-input-field">
      <label htmlFor="restaurantImage">Restaurant Image</label>
      {selectedImage && (
        <div className="uploaded-image-container">
          <img
            id="uploadedImage"
            alt="Selected"
            className="uploaded-cropped-image"
          />
        </div>
      )}
      <label htmlFor="restaurantImage" className="choose-file-label">
        Choose a Personal Image
        <input
          type="file"
          id="restaurantImage"
          accept="image/*"
          onChange={handleImageChange}
          ref={fileInputRef}
          style={{ display: "none" }} 
        />
      </label>
    </div>
  );
};

export default UploadImageButton;
