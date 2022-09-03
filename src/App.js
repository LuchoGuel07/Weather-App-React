import './App.css';
import Search from './components/search/search';
import CurrentWeather from './components/search/current-weather/current-weather';

function App() {

  const handleOnSearchChange = (searchData) =>{
    console.log(searchData);
  }

  return (
    <div className="container">
      <Search onSearchChange={handleOnSearchChange}/>
      <CurrentWeather />
    </div>
  );
}

export default App;
