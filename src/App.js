import "./App.css";
// import RoundProfilePicture from './RoundProfilePicture'; // Import your RoundProfilePicture component
// import RoundProfilePicture from "./components/ProfilePicture/RoundProfilePicture"; // Import your RoundProfilePicture component
import RoundProfilePicture from "./components/ProfilePicture/ProfilePicture";

function App() {
  return (
    <div className="App">
      <h1>App</h1>
      <RoundProfilePicture />{" "}
      {/* Render the RoundProfilePicture component here */}
    </div>
  );
}

export default App;
