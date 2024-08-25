"use client";

import { useEffect, useState } from "react";
import Weather from "@/components/CurrentWeather";
import WeatherForecast from "@/components/Forecast";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function Home() {
  const [city, setCity] = useState("New York");
  const [unit, setUnit] = useState<"C" | "F">("C");

  const toggleUnit = () => {
    setUnit(unit === "C" ? "F" : "C");
  };

  useEffect(() => {
    localStorage.getItem("city")
      ? setCity(localStorage.getItem("city") as string)
      : localStorage.setItem("city", "New York");

    localStorage.getItem("unit")
      ? setUnit(localStorage.getItem("unit") as "C" | "F")
      : localStorage.setItem("unit", "C");
  }, []);

  useEffect(() => {
    localStorage.setItem("city", city);
    localStorage.setItem("unit", unit);
  }, [city, unit]);

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4 md:12">
      <header className="flex justify-between items-center p-4 text-white">
        <h1 className="sr-only">Weather Dashboard</h1>
        <div className="flex items-center space-x-4">
          <CityInput setCity={setCity} />
          <Button
            onClick={toggleUnit}
            className="bg-blue-800 px-4 py-2 rounded-md"
          >
            {unit === "C" ? "°F" : "°C"}
          </Button>
        </div>
      </header>
      <div className="container flex flex-col md:flex-row justify-center gap-8 md:gap-4 mx-auto p-4">
        <Weather city={city} unit={unit} />
        <WeatherForecast city={city} unit={unit} />
      </div>
    </main>
  );
}

const CityInput = ({ setCity }: { setCity: (city: string) => void }) => {
  const [cityName, setCityName] = useState("");

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        setCity(cityName);
      }}
      className="flex items-center space-x-4"
    >
      <Input
        className="text-black"
        type="text"
        placeholder="Enter city name"
        onChange={(e) => setCityName(e.target.value)}
      />
      <Button type="submit">Go</Button>
    </form>
  );
};
