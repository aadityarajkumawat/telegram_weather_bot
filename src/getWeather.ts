export async function getWeather() {
  const key = process.env.WEATHER_KEY || "";
  const weatherApi = `https://api.weatherapi.com/v1/current.json?key=${key}&q=India&aqi=no`;
  const res = await fetch(weatherApi);
  const body = await res.json();
  return body;
}
