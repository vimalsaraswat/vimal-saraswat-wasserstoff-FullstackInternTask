"use server";

const API_KEY = process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY;

export async function getCurrentWeather(city: string) {
  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`,
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    return { error: "Failed to fetch weather data" };
  }
}
