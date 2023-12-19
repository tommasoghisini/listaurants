import { useNavigate, useParams } from "react-router-dom";
import "./ListPage.css";
import Parse from "parse/dist/parse.min.js";
import postData from "../../data/user1.json";
import RestaurantCard from "../../components/RestaurantCard/RestaurantCard";
import { useState, useEffect, useCallback } from "react";
import LoadingComponent from "../../components/LoadingComponent/LoadingComponent";
import { useLocation } from "react-router-dom";

function ListPage() {
  const navigate = useNavigate();
  const { listname } = useParams();
  const location = useLocation();
  const decodedListName =
    listname === "💖 Favourites" ? "Favourites" : "Wishlist";
  const defaultImgSrcRestaurant = "/icons/defaultImage.svg";
  const [loading, setLoading] = useState(true);
  const [posts, setPosts] = useState([]);
  const [currentUser, setCurrentUser] = useState("");
  const [profileUser, setProfileUser] = useState("");
  const [parameterExists, setParameterExists] = useState("");

  const goBack = () => {
    navigate(-1); // Use the history object to go back to the previous page
  };

  const fetchRestaurantData = useCallback(async (restaurantId) => {
    try {
      const RestaurantData = Parse.Object.extend("Restaurant");
      const query = new Parse.Query(RestaurantData);
      query.equalTo("objectId", restaurantId);
      const result = await query.first();

      if (result) {
        const category_1 = result.get("price");
        const category_2 = result.get("cousine");
        const category_3 = result.get("diet");

        const image = result.get("image").url();

        return [category_1, category_2, category_3, image];
      } else {
        console.log("No restaurant found");
        return [
          postData["category_1"],
          postData["category_2"],
          postData["category_3"],
          defaultImgSrcRestaurant,
        ];
      }
    } catch (error) {
      console.error(error);
    }
  }, []);

  useEffect(() => {
    const urlSearchParams = new URLSearchParams(location.search);
    const parameter = urlSearchParams.get("userParameter");
    const currentUser = Parse.User.current();
    setCurrentUser(currentUser);

    // Check if currentUser is not null
    if (!currentUser) {
      console.log("No user logged in");
      return;
    }

    const fetchProfileUser = async () => {
      if (parameter) {
        const UserData = Parse.Object.extend("_User");
        const query = new Parse.Query(UserData);
        query.equalTo("objectId", parameter);
        const friends = await query.find();
        setParameterExists(true);
        

        if (friends.length > 0) {
          const friend = friends[0];
          setProfileUser(friend);
        } else {
          console.log("User not found");
        }
      } else {
        console.log("no parameter");
        setProfileUser(currentUser);
      }
    };
    fetchProfileUser();
  }, [location.search,  currentUser]);

  useEffect(() => {
    const fetchPosts = async () => {
      if (!profileUser) {
        console.log("No profile user");
        return;
      }
      

      const PostData = Parse.Object.extend("Post");
      const query = new Parse.Query(PostData);
      console.log("Query parameters:", profileUser.id, decodedListName);

      query.equalTo("userId", profileUser.id);
      query.equalTo("savedToList", decodedListName);
      const results = await query.find();

      const postPromises = results.map(async (userPost) => {
        const restaurantId = userPost.get("restaurantId");
        let [category_1, category_2, category_3, tempRestaurantImage] =
          await fetchRestaurantData(restaurantId);
        
        const categories = [category_1, category_2, category_3];
        const postText = userPost.get("text");
        const restaurantName = userPost.get("restaurantName");
        const restaurantAddress = userPost.get("restaurantAddress");
        const time = userPost.get("updatedAt");
        const id = userPost.id;
        const parameter=parameterExists;
        const imgSrcRestaurant = userPost.get("image")
          ? userPost.get("image").url()
          : tempRestaurantImage;

        return [
          time,
          <RestaurantCard
            key={id}
            imgSrcRestaurant={imgSrcRestaurant}
            restaurantName={restaurantName}
            restaurantAddress={restaurantAddress}
            categories={categories}
            comment={postText}
            postId={id}
            parameter={parameter}
          />,
        ];
      });
      const posts = await Promise.all(postPromises);
      setPosts(posts);
      setLoading(false);
    };

    setLoading(true);
    fetchPosts();
  }, [fetchRestaurantData, decodedListName, profileUser]);

  return (
    <div className="list-page">
      <div className="list-top-bar">
        <img
          src="/icons/back.svg"
          alt="back"
          className="close-icon"
          onClick={goBack}
        />
        <div className="list-top-bar-name">{listname}</div>
      </div>
      <div className="list-items">
        {loading ? (
          <LoadingComponent />
        ) : (
          posts
            // Sort posts by time
            .sort((a, b) => b[0] - a[0])
            .map((post) => {
              return post[1];
            })
        )}
      </div>
    </div>
  );
}

export default ListPage;
