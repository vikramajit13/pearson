import logo from "./logo.svg";
import "./App.css";
import { CountriesContainer } from "./Container/Countries";
function App() {
  return (
    <div className="App">
      <div>
        <h2> Weather App</h2>
      </div>
      <CountriesContainer />
    </div>
  );
}

export default App;
