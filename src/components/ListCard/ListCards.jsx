import React, { useState, useEffect } from "react";
import "./ListCards.css";
import { useNavigate, useLocation } from "react-router-dom";
import Parse from "parse/dist/parse.min.js";

function ListCards({ Wishlist, Favourites }) {
  const titles = ["💖 Favourites", "🌠 Wishlist"];
  const [images, setImages] = useState([null, null]); // State to store image URLs
  

  // Function to get restaurant names
  const getRestaurantNames = (list) => {
    return list.map((post) => post.get("restaurantName"));
  };

  // Function to fetch restaurant image data
  const fetchRestaurantData = async (restaurantId) => {
    try {
      const RestaurantData = Parse.Object.extend("Restaurant");
      const query = new Parse.Query(RestaurantData);
      query.equalTo("objectId", restaurantId);
      const result = await query.first();

      return result ? result.get("image").url() : "/icons/defaultImage.svg";
    } catch (error) {
      console.error(error);
      return "/icons/defaultImage.svg";
    }
  };

  // useEffect hook to fetch image sources
  useEffect(() => {
    const fetchImages = async () => {
      const favImage = await getImageSrc(Favourites);
      const wishImage = await getImageSrc(Wishlist);
      setImages([favImage, wishImage]);
    };

    const getImageSrc = async (list) => {
      if (list.length > 0) {
        const restaurantId = list[0].get("restaurantId");
        console.log(restaurantId);
        return await fetchRestaurantData(restaurantId);
      } else {
        return "/icons/defaultImage.svg";
      }
    };

    fetchImages();
  }, [Favourites, Wishlist]); // Depend on Favourites and Wishlist

  const personalLists = [
    getRestaurantNames(Favourites),
    getRestaurantNames(Wishlist),
  ];

  return (
    <div>
      {titles.map((title, index) => {
        const truncatedText = personalLists[index].slice(0, 5);
        const moreText = personalLists[index].length > 5 ? ", and more" : "";

        return (
          <Card
            key={index}
            title={title}
            text={truncatedText.join(", ") + moreText}
            imageSource={images[index]}
          />
        );
      })}
    </div>
  );
}

function Card({ title, text, imageSource }) {
  const navigate = useNavigate();
  const location = useLocation();

  const handleClick = () => {
    console.log(title);
    const urlSearchParams = new URLSearchParams(location.search);
    const parameter = urlSearchParams.get("userParameter");
    if (parameter) {
      navigate(`/list/${title}?userParameter=${parameter}`);
    } else {
      navigate(`/list/${title}`);
    }
  };

  return (
    <div className="list-card" onClick={handleClick}>
      <div className="list-content">
        <div className="image-container">
          <img
            src={imageSource}
            alt="placeholder"
            className="image-placeholder"
          />
        </div>
        <div className="text-container">
          <h1 className="list-title">{title}</h1>
          <h1 className="list-text">{text}</h1>
        </div>
      </div>
    </div>
  );
}

export default ListCards;
