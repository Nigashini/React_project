import { useEffect, useState } from 'react';
import './Weather.css';
import search1 from '../assets/search1.png';
import cloudy from '../assets/cloudy.gif';
import Humidity from '../assets/Humidity.gif';
import rain from '../assets/rain.gif';
import snow from '../assets/snow.gif';
import TransparentGif from '../assets/sunny1.gif';
import windy from '../assets/win.gif';

const Weather = () => {
    const [weatherData, setWeatherData] = useState(null);
    const [city, setCity] = useState('London'); // State for user input
    const allIcons = {
        "01d": cloudy,
        "01n": cloudy,
        "02d": cloudy,
        "03d": TransparentGif,
        "03n": TransparentGif,
        "04d": rain,
        "04n": rain,
        "09d": Humidity,
        "09n": Humidity,
        "10d": snow,
        "10n": snow,
        "13d": windy,
        "13n": windy,
    };

    const search = async (city) => {
        try {
            const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${import.meta.env.VITE_APP_ID}`;
            const response = await fetch(url);
            const data = await response.json();
            console.log(data);

            if (data.cod !== 200) {
                throw new Error(data.message);
            }

            const icon = allIcons[data.weather[0].icon] || TransparentGif;

            setWeatherData({
                humidity: data.main.humidity,
                windSpeed: data.wind.speed,
                temperature: Math.floor(data.main.temp),
                location: data.name,
                icon: icon,
            });
        } catch (error) {
            console.error("Error fetching weather data:", error);
            setWeatherData(null); // Reset data on error
        }
    };

    useEffect(() => {
        search(city); // Fetch weather data for the default city
    }, []);

    const handleSearch = (e) => {
        e.preventDefault(); // Prevent form submission from refreshing the page
        if (city.trim()) {
            search(city.trim());
        }
    };

    return (
        <div>
            <div className="weather">
                <form className="search-bar" onSubmit={handleSearch}>
                    <input
                        type="text"
                        placeholder="Search places"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                    />
                    <button type="submit">
                        <img src={search1} alt="Search" />
                    </button>
                </form>
                {weatherData ? (
                    <>
                        <img
                            src={weatherData.icon}
                            alt="Weather Icon"
                            className="weather-icon"
                        />
                        <p className="temperature">
                            {weatherData.temperature}°C
                        </p>
                        <p className="location">{weatherData.location}</p>
                        <div className="weather-data">
                            <div className="col">
                                <img src={Humidity} alt="" />
                                <div>
                                    <p>{weatherData.humidity} %</p>
                                    <span>Humidity</span>
                                </div>
                            </div>
                            <div className="col">
                                <img src={windy} alt="" />
                                <div>
                                    <p>{weatherData.windSpeed} km/h</p>
                                    <span>Wind speed</span>
                                </div>
                            </div>
                        </div>
                    </>
                ) : (
                    <p>City not found or an error occurred. Try again.</p>
                )}
            </div>
        </div>
    );
};

export default Weather;
