import { Post } from "../../components/MainPage/Post/Post";
import TopBar from "../../components/shared/TopBar/TopBar";
import "./MainPage.css";
import postData from "../../data/user1.json";
import { useEffect, useState } from "react";
import Parse from "parse/dist/parse.min.js";
import SaveListOverlay from "../../components/MainPage/SaveListOverlay/SaveListOverlay";
import NoPosts from "../../components/NoPosts/NoPosts";
import LoadingComponent from "../../components/LoadingComponent/LoadingComponent";
import { useNavigate } from "react-router-dom";

function MainPage({ setIsNavbarVisible }) {
  const defaultImgSrc = "/icons/defaultImage.svg";
  const navigate = useNavigate();

  // Store the selected post information
  const [selectedPostInfo, setSelectedPostInfo] = useState(null);
  const [posts, setPosts] = useState([]);
  const [isOverlayOpen, setIsOverlayOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  const handleOverlayClose = () => {
    setIsNavbarVisible(true);
    setIsOverlayOpen(false);
  };

  const handleSaveClicked = (postInfo) => {
    setIsNavbarVisible(false);
    setSelectedPostInfo(postInfo);
    setIsOverlayOpen(true);
  };
  const handleSaveToList = async (listName) => {
    // Handle the logic to save the post to the selected list
    if (selectedPostInfo) {


      // Create a new Post object using Parse
      const PostObject = Parse.Object.extend("Post");
      const newPost = new PostObject();
      // Orginial Post Query to get the image
      const originalPostQuery = new Parse.Query(PostObject);
      originalPostQuery.equalTo("objectId", selectedPostInfo.id); // Use the ID of the selected post
      const originalPost = await originalPostQuery.first();


      if (originalPost && originalPost.get("image")) {
        // Set the image from the original post
        newPost.set("image", originalPost.get("image"));
      } else {
        console.error("No image found");
      }

      // Set the attributes of the new Post object
      newPost.set("userId", Parse.User.current().id);
      newPost.set("savedToList", listName);
      newPost.set("text", "");
      newPost.set("restaurantName", selectedPostInfo.restaurantName);
      newPost.set("restaurantAddress", selectedPostInfo.restaurantAddress);
      newPost.set("restaurantId", selectedPostInfo.restaurantId);

      if (listName === "Favourites") {
        const idToURL = selectedPostInfo.restaurantId?.id;
        const edit="";
        navigate(`/add?restIdParameter=${idToURL}&edit=${edit}`);
        return;
      }

      // Save the new Post object to the Parse database
      try {
        await newPost.save();
        console.log("Post saved successfully to", listName);
      } catch (error) {
        console.error("Error saving post:", error);
      }
    }
    setIsOverlayOpen(false);
  };

  const fetchUserData = async (userId) => {
    try {
      const UserData = Parse.Object.extend("User");
      const query = new Parse.Query(UserData);
      query.equalTo("objectId", userId);
      const result = await query.first();

      if (result) {
        const userName = result.get("name");
        const imgSrcUser = result.get("profilePicture").url();
        return [userName, imgSrcUser];
      } else {
        console.log("No user found");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const fetchRestaurantData = async (restaurantId) => {
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
          defaultImgSrc,
        ];
      }
    } catch (error) {
      console.error(error);
    }
  };

  const fetchUserId = async (userName) => {
    try {
      const UserData = Parse.Object.extend("User");
      const query = new Parse.Query(UserData);
      query.equalTo("username", userName);
      const result = await query.first();

      if (result) {
        return result.id;
      } else {
        console.log("No user found");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const fetchFriends = async (userName) => {
    try {
      const FriendshipData = Parse.Object.extend("Friendship");
      const User = Parse.Object.extend("User");
      const userPointer = new User();
      userPointer.id = userName;

      // Query for friendships where current user is user1
      const queryUser1 = new Parse.Query(FriendshipData);
      queryUser1.equalTo("user1", userPointer);
      queryUser1.equalTo("status", "Friends");
      queryUser1.include("user2"); // Include user2 data

      // Query for friendships where current user is user2
      const queryUser2 = new Parse.Query(FriendshipData);
      queryUser2.equalTo("user2", userPointer);
      queryUser2.equalTo("status", "Friends");
      queryUser2.include("user1"); // Include user1 data

      // Combine the queries
      const combinedQuery = Parse.Query.or(queryUser1, queryUser2);
      const results = await combinedQuery.find();

      const friends = results.map((friendship) => {
        // Check if the current user is user1 or user2 and return the other user's id
        if (friendship.get("user1").id === userName) {
          return friendship.get("user2").id;
        } else {
          return friendship.get("user1").id;
        }
      });

      return friends.filter((friend) => friend !== null);
    } catch (error) {
      console.error(error);
    }
  };

  // Helper function to fetch friends' user IDs
  const fetchFriendsUserIds = async (username) => {
    const friends = await fetchFriends(username);
    const userIdPromises = friends.map((friend) => fetchUserId(friend));
    return await Promise.all(userIdPromises);
  };

  useEffect(() => {
    setLoading(true);
    const fetchPosts = async () => {
      const currentUser = Parse.User.current();

      // Check if currentUser is not null
      if (!currentUser) {
        console.log("No user logged in");
        return;
      }

      const imgSrcCommenter = currentUser.get("profilePicture").url();

      const PostData = Parse.Object.extend("Post");
      const query = new Parse.Query(PostData);
      const results = await query.find();

      // Get friends
      const friends = await fetchFriendsUserIds(currentUser.getUsername());

      console.log("Friends:", friends);
      // Filter results first
      const userPosts = results.filter(
        (result) =>
          result.get("userId") === currentUser.id ||
          friends.includes(result.get("userId"))
      );

      const postPromises = userPosts.map(async (userPost) => {
        const restaurantId = userPost.get("restaurantId");

        let [category_1, category_2, category_3, restaurantClassImage] =
          await fetchRestaurantData(restaurantId);

        const categories = [category_1, category_2, category_3];

        const listName = userPost.get("savedToList");
        const postText = userPost.get("text");
        const restaurantName = userPost.get("restaurantName");
        const restaurantAddress = userPost.get("restaurantAddress");
        const time = userPost.get("createdAt");
        const id = userPost.id;
        const [userName, imgSrcUser] = await fetchUserData(
          userPost.get("userId")
        );
        const imgSrcRestaurant = userPost.get("image")
          ? userPost.get("image").url()
          : restaurantClassImage;

        return [
          time,

          <Post
            id={id}
            imgSrcUser={imgSrcUser}
            restaurantId={restaurantId}
            imgSrcRestaurant={imgSrcRestaurant}
            imgSrcCommenter={imgSrcCommenter}
            userName={userName}
            listName={listName}
            categories={categories}
            postText={postText}
            restaurantName={restaurantName}
            restaurantAddress={restaurantAddress}
            handleSaveClicked={() => {
              handleSaveClicked({
                id: id,
                imgSrcRestaurant: imgSrcRestaurant,
                restaurantName: restaurantName,
                restaurantAddress: restaurantAddress,
                restaurantId: restaurantId,
              });
            }}
            saveClicked={isOverlayOpen}
          />,
        ];
      });
      const posts = await Promise.all(postPromises);
      setPosts(posts);
      setLoading(false);
    };
    fetchPosts();
  }, []);

  return (
    <>
      <div className="main-page">
        <TopBar pageName={"Home"} />
        {loading ? (
          <LoadingComponent />
        ) : (
          <div className="main-page-posts">
            {posts.length === 0 ? (
              <NoPosts />
            ) : (
              posts
                // Sort posts by time
                .sort((a, b) => b[0] - a[0])
                .map((post) => {
                  return post[1];
                })
            )}
          </div>
        )}
      </div>
      <SaveListOverlay
        isOpen={isOverlayOpen}
        onClose={handleOverlayClose}
        onSave={handleSaveToList}
      />
    </>
  );
}

export default MainPage;
