import React, { useState } from "react";
import Parse from "parse/dist/parse.min.js";
import { useNavigate } from "react-router-dom";
import Button from "../../components/shared/Button/Button";
import "./AddRestaurantPage1.css";
import CategoryButton from "../../components/shared/CategoryButton/CategoryButton";
import UploadImageButton from "../../components/shared/UploadImageButton/UploadImageButton";

const color_choosen = "var(--primary-color)";
const titles = ["Wishlist", "Favourites"];

function AddRestaurantPage1() {
  const navigate = useNavigate();
  const [restaurantName, setRestaurantName] = useState("");
  const [restaurantAddress, setRestaurantAddress] = useState("");
  const [selectedList, setSelectedList] = useState("Wishlist");
  const [restaurantComment, setRestaurantComment] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file && file.type.startsWith("image/")) {
      setSelectedImage(file);
    } else {
      alert("Please select a valid image file.");
    }
  };

  const handleChooseFileClick = () => {};

  const handleNextPage = async () => {
    try {
      const currentUser = Parse.User.current();
      if (!currentUser) {
        alert("User not logged in");
        return;
      }

      const Post = Parse.Object.extend("Post");
      const post = new Post();
      post.set("userId", currentUser.id);
      post.set("restaurantName", restaurantName);
      post.set("restaurantAddress", restaurantAddress);
      post.set("savedToList", selectedList);
      post.set("text", restaurantComment);

      if (selectedImage) {
        const base64Image = await convertImageToBase64(selectedImage);
        const file = new Parse.File("restaurantImage.png", {
          base64: base64Image,
        });
        await file.save();
        post.set("image", file);
      }

      const savedPost = await post.save();
      alert(
        `Success! Post ${savedPost.restaurantName} was successfully added!`
      );

      navigate("p2/done");
    } catch (error) {
      alert(`Error! ${error}`);
    }
  };

  const convertImageToBase64 = (imageFile) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(imageFile);
      reader.onload = () => resolve(reader.result.split(",")[1]);
      reader.onerror = (error) => reject(error);
    });
  };

  return (
    <div className="add-restaurant-page">
      <div className="add-restaurant-fields">
        <div className="friend-title">Add a Restaurant</div>

        <form>
          <div className="restaurant-input-field">
            <label htmlFor="restaurantName">Name of the Restaurant</label>
            <input
              type="text"
              id="restaurantName"
              value={restaurantName}
              onChange={(e) => setRestaurantName(e.target.value)}
            />
          </div>

          <div className="restaurant-input-field">
            <label htmlFor="restaurantAddress">Address of the Restaurant</label>
            <input
              type="text"
              id="restaurantAddress"
              value={restaurantAddress}
              onChange={(e) => setRestaurantAddress(e.target.value)}
            />
          </div>

          <div className="restaurant-input-field">
            <label htmlFor="chooseList">Choose List</label>
            <select
              id="chooseList"
              value={selectedList}
              onChange={(e) => setSelectedList(e.target.value)}
            >
              {titles.map((title, index) => (
                <option key={index} value={title}>
                  {title}
                </option>
              ))}
            </select>
          </div>

          <div className="restaurant-comment-input-field">
            <label htmlFor="restaurantComment">
              What do you think about the restaurant?
            </label>
            <textarea
              id="restaurantComment"
              rows={4}
              placeholder="Write your comment here..."
              value={restaurantComment}
              onChange={(e) => setRestaurantComment(e.target.value)}
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

        <div className="add-restaurant-button">
          <Button text="Save and Publish" onClick={handleNextPage} />
        </div>
      </div>
    </div>
  );
}

export default AddRestaurantPage1;
