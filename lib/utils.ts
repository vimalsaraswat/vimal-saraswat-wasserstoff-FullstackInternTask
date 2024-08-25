import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function convertTemperature(temp: number, unit: "C" | "F") {
  if (unit === "C") {
    return (temp - 273.15).toFixed(1);
  } else {
    return (((temp - 273.15) * 9) / 5 + 32).toFixed(1);
  }
}
