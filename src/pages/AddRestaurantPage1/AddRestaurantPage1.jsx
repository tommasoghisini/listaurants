import CategoryButton from "../../components/shared/CategoryButton/CategoryButton";
import Button from "../../components/shared/Button/Button";
import "./AddRestaurantPage1.css";
import { useNavigate } from "react-router-dom";

const titles = ["Wishlist", "Favourites"];

const color_choosen = "var(--primary-color)";



function AddRestaurantPage1() {

  const navigate = useNavigate();

  const handleNextPage = () => {
		navigate("p2");
	};


  return (
    <div className="add-restaurant-page">
      <div className="add-restaurant-fields">
        <div className="friend-title">Add a Restaurant</div>

        <form>

          <div className="restaurant-input-field">
            <label htmlFor="restaurantName">Name of the Restaurant</label>
            <input type="text" id="restaurantName" />
          </div>

          <div className="restaurant-input-field">
            <label htmlFor="restaurantAddress">Address of the Restaurant</label>
            <input type="text" id="restaurantAddress" />
          </div>

          <div className="restaurant-input-field">
            <label htmlFor="chooseList">Choose List</label>
            <select id="chooseList">
              {titles.map((title, index) => (
                <option key={index} value={`list${index + 1}`}>
                  {title}
                </option>
              ))}
            </select>
          </div>

          <div className="restaurant-input-field">
            <label htmlFor="restaurantAddress">Price</label>
            <CategoryButton text="$"  />
            <CategoryButton text="$$" color={color_choosen} />
            <CategoryButton text="$$$" />
          </div>

          <div className="restaurant-input-field">
            <label htmlFor="restaurantAddress">Vegan Options</label>
            <CategoryButton text="Yes" />
            <CategoryButton text="No" color={color_choosen} />
          </div>

          <div className="restaurant-input-field">
        
            <label htmlFor="restaurantCuisine">Cuisine</label>
            <CategoryButton text="Danish" />
            <CategoryButton text="Asian" />
            <CategoryButton text="Other" color={color_choosen} />

          </div>


        </form>

        <div className="add-restaurant-button">
          <Button text="Next" onClick={handleNextPage} />
        </div>
      </div>
    </div>
  );
}

export default AddRestaurantPage1;
