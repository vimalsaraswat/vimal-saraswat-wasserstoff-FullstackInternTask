import { useState, useEffect } from "react";
import { getCurrentWeather } from "@/app/actions";
import { convertTemperature } from "@/lib/utils";

const CurrentWeather = ({ city, unit }: { city: string; unit: "C" | "F" }) => {
  const [weatherData, setWeatherData] = useState<any>({});

  useEffect(() => {
    const fetchWeatherData = async () => {
      const data = await getCurrentWeather(city);
      setWeatherData(data);
    };

    fetchWeatherData();
  }, [city]);

  if (!weatherData.name) {
    return (
      <div>
        <h2>Weather Data for {city}</h2>
        <p>City not found</p>
      </div>
    );
  }

  const {
    name,
    sys: { country, sunrise, sunset },
    main: { temp, feels_like, temp_min, temp_max, humidity, pressure },
    wind: { speed, deg },
    weather: [{ description, icon }],
    visibility,
    dt,
  } = weatherData;

  // Convert visibility to kilometers
  const visibilityKm = (visibility / 1000).toFixed(1);

  // Format sunrise, sunset, and current time
  const formatTime = (timestamp: number) =>
    new Date(timestamp * 1000).toLocaleTimeString();

  return (
    <div className="p-6 bg-white rounded-lg shadow-lg text-center max-w-md">
      <h2 className="text-3xl font-bold mb-4">
        {name}, {country}
      </h2>

      <section className="flex items-center justify-center space-x-4">
        <img
          src={`https://openweathermap.org/img/wn/${icon}@4x.png`}
          alt={description}
          className="w-40 h-40 drop-shadow"
        />

        <div>
          <h3 className="text-2xl font-semibold mb-2">
            {convertTemperature(temp, unit)}°{unit}
          </h3>

          <p className="text-xl capitalize text-gray-700">{description}</p>

          <div className="flex justify-center space-x-4 mt-4">
            <span className="text-sm">
              Min: {convertTemperature(temp_min, unit)}°{unit}
            </span>
            <span className="text-sm">
              Max: {convertTemperature(temp_max, unit)}°{unit}
            </span>
          </div>

          <p className="mt-2 text-sm text-gray-600">
            Feels Like: {convertTemperature(feels_like, unit)}°{unit}
          </p>
        </div>
      </section>

      <div className="flex justify-center gap-8 mt-6">
        <p>
          <svg
            className="mx-auto"
            role="img"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            height="3rem"
            fill="none"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M3 17h1m16 0h1M5.6 10.6l.7.7m12.1-.7l-.7.7M8 17a4 4 0 0 1 8 0M3 21h18M12 9V3l3 3M9 6l3-3"
            />
          </svg>
          <span className="sr-only">Sunrise</span>
          {formatTime(sunrise)}
        </p>
        <p>
          <svg
            className="mx-auto"
            role="img"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            height="3rem"
            fill="none"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M3 17h1m16 0h1M5.6 10.6l.7.7m12.1-.7l-.7.7M8 17a4 4 0 0 1 8 0M3 21h18M12 3v6l3-3M9 6l3 3"
            />
          </svg>
          <span className="sr-only">Sunset</span>
          {formatTime(sunset)}
        </p>
      </div>

      <div className="flex justify-around flex-wrap mt-4 text-gray-700">
        <p>Humidity: {humidity}%</p>
        <p>Pressure: {pressure} hPa</p>
        <p>
          Wind: {speed} m/s at {deg}°
        </p>
        <p>Visibility: {visibilityKm} km</p>
      </div>

      <p className="mt-4 text-gray-600 text-sm">
        Last updated: {formatTime(dt)}
      </p>
    </div>
  );
};

export default CurrentWeather;
