import { getWeatherForecast } from "@/app/actions";
import { useEffect, useState } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "./ui/carousel";
import { convertTemperature } from "@/lib/utils";
import { Card, CardContent } from "./ui/card";

type forecastType = {
  dt: number;
  main: {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    pressure: number;
    sea_level: number;
    grnd_level: number;
    humidity: number;
    temp_kf: number;
  };
  weather: {
    id: number;
    main: string;
    description: string;
    icon: string;
  }[];
  clouds: {
    all: number;
  };
  wind: {
    speed: number;
    deg: number;
    gust: number;
  };
  visibility: number;
  pop: number;
  sys: {
    pod: string;
  };
  dt_txt: string;
};

const WeatherForecast = ({ city, unit }: { city: string; unit: "C" | "F" }) => {
  const [weatherData, setForecast] = useState<any>([]);

  useEffect(() => {
    const fetchWeatherData = async () => {
      const data = await getWeatherForecast(city);
      console.log(data);
      data.city ? setForecast(data.list) : setForecast([]);
    };

    fetchWeatherData();
  }, [city]);

  if (weatherData.length === 0 || !weatherData) {
    return (
      <div>
        <p>City not found</p>
      </div>
    );
  }

  const formatDate = (dt_txt: string) => {
    const date = new Date(dt_txt);
    return date.toLocaleString("en-US", {
      weekday: "short",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  };

  return (
    <Carousel
      opts={{
        align: "start",
      }}
      className="w-full max-w-xl rounded-lg bg-white shadow-lg p-4 md:p-6 lg:p-8 xl:p-12"
    >
      <CarouselContent className="items-center">
        {weatherData.map((forecast: forecastType) => (
          <CarouselItem
            key={forecast.dt}
            className="sm:basis-1/2 md:basis-1/3 lg:basis-1/4"
          >
            <div className="p-1">
              <Card>
                <CardContent className="p-6 flex flex-col items-center">
                  <div className="forecast-date">
                    {formatDate(forecast.dt_txt)}
                  </div>
                  <div className="forecast-icon">
                    <img
                      src={`http://openweathermap.org/img/wn/${forecast.weather[0].icon}@2x.png`}
                      alt={forecast.weather[0].description}
                      className="drop-shadow"
                    />
                  </div>
                  <div className="forecast-temp">
                    {convertTemperature(forecast.main.temp, unit)}°{unit}
                  </div>
                  <div className="capitalize">
                    {forecast.weather[0].description}
                  </div>
                </CardContent>
              </Card>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className="left-2" />
      <CarouselNext className="right-2" />
    </Carousel>
  );
};

export default WeatherForecast;
