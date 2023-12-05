import React, { useState, useEffect } from "react";
import Parse from "parse/dist/parse.min.js";
import { useNavigate } from "react-router-dom";
import Button from "../../components/shared/Button/Button";
import "./AddRestaurantPage1.css";
import UploadImageButton from "../../components/shared/UploadImageButton/UploadImageButton";
import TopBar from "../../components/shared/TopBar/TopBar";

const titles = ["Wishlist", "Favourites"];

function AddRestaurantPage1() {
  const navigate = useNavigate();
  const [restaurantName, setRestaurantName] = useState("");
  const [restaurantOptions, setRestaurantOptions] = useState([]);
  const [restaurantMapping, setRestaurantMapping] = useState({});

  const [restaurantAddress, setRestaurantAddress] = useState("");
  const [selectedList, setSelectedList] = useState("Wishlist");
  const [restaurantComment, setRestaurantComment] = useState("");

  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedRestaurantInfo, setSelectedRestaurantInfo] = useState(null);

  useEffect(() => {
    async function fetchRestaurantOptions() {
      try {
        const Restaurant = Parse.Object.extend("Restaurant");
        const query = new Parse.Query(Restaurant);
        const results = await query.find();

        const mapping = results.map((restaurant) => ({
          name: restaurant.get("name"),
          address: restaurant.get("address"),
          image: restaurant.get("image"),
        }));

        setRestaurantOptions(mapping.map((restaurant) => restaurant.name));
        setRestaurantMapping(mapping);
      } catch (error) {
        console.error("Error fetching restaurant names:", error);
      }
    }

    fetchRestaurantOptions();
  }, []);

  const handleRestaurantChange = async (e) => {
    const selectedRestaurant = e.target.value;
    setRestaurantName(selectedRestaurant);
    const selectedRestaurantInfo = restaurantMapping.find(
      (restaurant) => restaurant.name === selectedRestaurant
    );

    if (selectedRestaurantInfo) {
      setRestaurantAddress(selectedRestaurantInfo.address);
      if (selectedRestaurantInfo.image) {
        try {
          const imageUrl = selectedRestaurantInfo.image.url();
          console.log(imageUrl);
          setSelectedImage(imageUrl);
        } catch (error) {
          console.error("Error getting image URL from Parse:", error);
          setSelectedImage(null);
        }
      } else {
        setSelectedImage(null);
      }

      setSelectedRestaurantInfo(selectedRestaurantInfo);
    }
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file && file.type.startsWith("image/")) {
      setSelectedImage(file);
    } else if (event.target.value.startsWith("http")) {
      setSelectedImage(event.target.value);
    } else {
      alert("Please select a valid image file");
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

      if (!restaurantName) {
        alert("Please select a restaurant name");
        return;
      }

      const Post = Parse.Object.extend("Post");
      const post = new Post();
      post.set("userId", currentUser.id);
      post.set("restaurantName", restaurantName);
      post.set("restaurantAddress", restaurantAddress);
      post.set("savedToList", selectedList);
      post.set("text", restaurantComment);

      if (selectedImage instanceof File) {
        const file = new Parse.File("image.jpg", selectedImage);
        await file.save();
        post.set("image", file);
      }

      const savedPost = await post.save();
      alert(`Success! Post was successfully added!`);

      navigate("p2");
    } catch (error) {
      alert(`Error! ${error}`);
    }
  };

  return (
    <div className="add-restaurant-page">
      <TopBar pageName={"Add a Restaurant"} />
      <div className="add-restaurant-fields">
        
        <form>
          <div className="restaurant-input-field">
            <label htmlFor="restaurantName">Name of the Restaurant</label>
            <select
              id="restaurantName"
              value={restaurantName}
              onChange={handleRestaurantChange}
            >
              <option value="" disabled>
                Select a restaurant
              </option>
              {restaurantOptions.map((name, index) => (
                <option key={index} value={name}>
                  {name}
                </option>
              ))}
            </select>
          </div>

          <div className="restaurant-input-field" style={{ display: "none" }}>
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
