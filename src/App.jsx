import { useState, useRef } from 'react';
import axios from 'axios';
import './App.css';
import WeatherInformations from './components/WeatherInformations/WeatherInformations';
import WeatherInformations5Days from './components/WeatherInformations5Days/WeatherInformations5Days';

function App() {
  const [weather, setWeather] = useState();
  const [weather5Days, setWeather5Days] = useState();
  const inputRef = useRef();

  async function searchCity() {
    const city = inputRef.current.value;

    const api_key = import.meta.env.VITE_API_KEY_OPEN_WEATHER;
    const url_forecast_actual = `${import.meta.env.VITE_URL_OPEN_WEATHER_FORECAST_ACTUAL}?q=${city}&appid=${api_key}&lang=pt_br&units=metric`;
    const url_forecast_5_days = `${import.meta.env.VITE_URL_OPEN_WEATHER_FORECAST_5D}?q=${city}&appid=${api_key}&lang=pt_br&units=metric`;

    const apiInfo = await axios.get(url_forecast_actual);
    setWeather(apiInfo.data);

    const apiInfo5Days = await axios.get(url_forecast_5_days);
    setWeather5Days(apiInfo5Days.data);
  }

  return (
    <>
      <div className='container'>
        <h1>Previsão do Tempo</h1>
        <input ref={inputRef} type="text" placeholder='Digite o nome da cidade' />
        <button onClick={searchCity}>Buscar</button>

        {weather && <WeatherInformations weather={weather} />}
        {weather5Days && <WeatherInformations5Days weather5Days={weather5Days} />}
      </div>
    </>
  );
}

export default App;
