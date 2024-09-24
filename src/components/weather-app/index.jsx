import {useState, useEffect} from 'react'
import Search from '../search'
import './style.css'

export default function Weather() {
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(false);
  const [weatherData, setWeatherData] = useState(null)


  async function fetchWeatherData(param) {
    setLoading(true);
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${param}&appid=605333ad344455774f0fd5c385083c9d`);

        const data = await response.json();

        console.log(data, 'data');

        if (data) {
          setWeatherData(data);
          setLoading(false);
        }
        
    } catch (e) {
      console.log(e);
      
    }
  }
  function handleSearch() {
    fetchWeatherData(search);
  }

    // useEffect pour charger les données météo par défaut lors du premier rendu
    
  useEffect(() =>{
    fetchWeatherData('yaounde'); // Récupère les données pour la ville par défaut
  },[]);

  function getCurrentDate() {
    return new Date().toLocaleDateString('en-us', {
      weekday: 'long',
      month: 'long',
      day: 'numeric',
      year: 'numeric'
    }) 
  }

  console.log(weatherData);
  
  return (
    <div>
      <Search 
        search={search} 
        setSearch={setSearch}
        handleSearch={handleSearch}
      />
      {
        loading ? <div className='loading'>Loading ....</div> :
        <div>
          <div className='city-name'>
            <h2>{weatherData?.name}, <span>{weatherData?.sys?.country}</span></h2>
          </div>
          <div className='date'>
            <span>{getCurrentDate()}</span>
          </div>
          <div className='temperature'>{weatherData?.main?.temp}</div>
          <p className='desciption'>
            {weatherData && weatherData.weather && weatherData.weather[0] ? weatherData.weather[0].description : ''}
          </p>
          <div className="weather-info">
            <div className='column'>
              <div>
                <p className='wind'>{weatherData?.wind?.speed}</p>
                <p>Wind Speed</p>
              </div>
            </div>

            <div className='column'>
              <div>
                <p className='humidity'>{weatherData?.main?.humidity}%</p>
                <p>Humidity</p>
              </div>
            </div>
          </div>
        </div>
      }
      
    </div>
  )
}
