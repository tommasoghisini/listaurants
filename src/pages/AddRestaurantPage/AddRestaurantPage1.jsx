import React, { useState, useEffect } from "react";
import Parse from "parse/dist/parse.min.js";
import { useNavigate } from "react-router-dom";
import Button from "../../components/shared/Button/Button";
import "./AddRestaurantPage1.css";
import UploadImageButton from "../../components/shared/UploadImageButton/UploadImageButton";
import TopBar from "../../components/shared/TopBar/TopBar";

const titles = ["Favourites", "Wishlist"];

function AddRestaurantPage1() {
  const navigate = useNavigate();
  const [restaurantName, setRestaurantName] = useState("");
  const [restaurantMapping, setRestaurantMapping] = useState([]);
  const [restaurantId, setRestaurantId] = useState("");

  const [restaurantAddress, setRestaurantAddress] = useState("");
  const [selectedList, setSelectedList] = useState("Favourites");
  const [restaurantComment, setRestaurantComment] = useState("");
  const [isEdit, setIsEdit] = useState("");

  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedRestaurantInfo, setSelectedRestaurantInfo] = useState(null);

  useEffect(() => {
    async function fetchRestaurantOptions() {
      try {
        const Restaurant = Parse.Object.extend("Restaurant");
        const query = new Parse.Query(Restaurant);
        const results = await query.find();

        const restaurantMapping = results.map((restaurant) => ({
          name: restaurant.get("name"),
          address: restaurant.get("address"),
          image: restaurant.get("image"),
          selected: "",
          restaurantPointer: {
            __type: "Pointer",
            className: "Restaurant",
            objectId: restaurant.id,
          },
        }));

        setRestaurantMapping(restaurantMapping);

        const urlSearchParams = new URLSearchParams(window.location.search);
        const idParameter = urlSearchParams.get("restIdParameter");
        const isEdit = urlSearchParams.get("edit");
        setIsEdit(isEdit);

        if (idParameter) {
          const targetIndex = restaurantMapping.findIndex(
            (restaurant) =>
              restaurant.restaurantPointer.objectId === idParameter
          );
          if (targetIndex !== -1) {
            const foundRestaurantName = restaurantMapping[targetIndex].name;
            const selectedRestaurantInfo = restaurantMapping[targetIndex];

            console.log("Found Restaurant Name:", foundRestaurantName);
            setRestaurantName(foundRestaurantName);

            if (selectedRestaurantInfo) {
              setRestaurantAddress(selectedRestaurantInfo.address);
              if (selectedRestaurantInfo.image) {
                try {
                  const imageUrl = selectedRestaurantInfo.image.url();
                  setSelectedImage(imageUrl);
                } catch (error) {
                  console.error("Error getting image URL from Parse:", error);
                  setSelectedImage(null);
                }
              } else {
                setSelectedImage(null);
              }

              setSelectedRestaurantInfo(selectedRestaurantInfo);
              setRestaurantId(selectedRestaurantInfo.restaurantPointer);
            }
          }
        } else {
          console.log("No parameter");
        }
      } catch (error) {
        console.error("Error fetching restaurant options:", error);
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
          setSelectedImage(imageUrl);
        } catch (error) {
          console.error("Error getting image URL from Parse:", error);
          setSelectedImage(null);
        }
      } else {
        setSelectedImage(null);
      }

      setSelectedRestaurantInfo(selectedRestaurantInfo);
      setRestaurantId(selectedRestaurantInfo.restaurantPointer);
    }
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file && file.type.startsWith("image/")) {
      setSelectedImage(file);
    } else if (event.target.value.startsWith("http")) {
      setSelectedImage(event.target.value);
    } else {
      console.log("Not a valid image file");
    }
  };

  const handleChooseFileClick = () => {};

  const handleNextPage = async () => {
    try {
      const currentUser = Parse.User.current();
      if (!currentUser) {
        console.log("User not logged in");
        return;
      }

      if (!restaurantName) {
        console.log("No choice of restaurant");
        return;
      }


      if (isEdit === 1) {
        //Find the existing post
        const existingPostQuery = new Parse.Query(Post);
        existingPostQuery.equalTo("userId", currentUser.id);
        existingPostQuery.equalTo("restaurantId", restaurantId);
        existingPostQuery.equalTo("savedToList", selectedList);

        const existingPost = await existingPostQuery.first();

        if (existingPost) {
          existingPost.set("restaurantName", restaurantName);
          existingPost.set("restaurantAddress", restaurantAddress);
          existingPost.set("text", restaurantComment);

          if (selectedImage instanceof File) {
            // Update image if a new one is provided
            const existingImage = existingPost.get("image");
            if (existingImage) {
              await existingImage.destroy();
            }
            const newImage = new Parse.File("image.jpg", selectedImage);
            await newImage.save();
            existingPost.set("image", newImage);
          }

          await existingPost.save();
        } else {
          console.log("Existing post not found");
        }
      } else {
        const Post = Parse.Object.extend("Post");
        const post = new Post();
        post.set("userId", currentUser.id);
        post.set("restaurantName", restaurantName);
        post.set("restaurantAddress", restaurantAddress);
        post.set("savedToList", selectedList);
        post.set("text", restaurantComment);
        post.set("restaurantId", restaurantId);

        if (selectedImage instanceof File) {
          const file = new Parse.File("image.jpg", selectedImage);
          await file.save();
          post.set("image", file);
        }

        const savedPost = await post.save();
      }

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
              {restaurantMapping.map((restaurant, index) => (
                <option key={index} value={restaurant.name}>
                  {restaurant.name}
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
          <Button
            text={isEdit ? "Save" : "Save and Publish"}
            onClick={handleNextPage}
          />
        </div>
      </div>
    </div>
  );
}

export default AddRestaurantPage1;
