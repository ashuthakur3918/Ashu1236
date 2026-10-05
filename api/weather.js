export const access = "public";
export const methods = ["GET"];

const PLACES = {
  manali: { name: "Manali", lat: 32.2432, lon: 77.1892 },
  shimla: { name: "Shimla", lat: 31.1048, lon: 77.1734 },
  dharamshala: { name: "Dharamshala", lat: 32.2190, lon: 76.3234 },
  spiti: { name: "Spiti Valley", lat: 32.2460, lon: 78.0350 },
  kullu: { name: "Kullu", lat: 31.9579, lon: 77.1095 },
  kasol: { name: "Kasol", lat: 32.0100, lon: 77.3148 },
  jibhi: { name: "Jibhi", lat: 31.6510, lon: 77.3440 },
  bir: { name: "Bir", lat: 32.0510, lon: 76.7160 },
  dalhousie: { name: "Dalhousie", lat: 32.5387, lon: 75.9700 },
  kinnaur: { name: "Kinnaur", lat: 31.5830, lon: 78.4000 },
  kyoto: { name: "Kyoto", lat: 35.0116, lon: 135.7681 },
  lisbon: { name: "Lisbon", lat: 38.7223, lon: -9.1393 },
  marrakech: { name: "Marrakech", lat: 31.6295, lon: -7.9811 },
  "cape-town": { name: "Cape Town", lat: -33.9249, lon: 18.4241 },
  bali: { name: "Bali", lat: -8.4095, lon: 115.1889 },
  istanbul: { name: "Istanbul", lat: 41.0082, lon: 28.9784 },
  patagonia: { name: "Patagonia", lat: -50.9423, lon: -73.4068 }
};

function cleanKey(value) {
  return String(value || "").trim().toLowerCase().replace(/[^a-z0-9]+/g, "-");
}

async function getWeather(key, place) {
  const url = new URL("https://api.openweathermap.org/data/3.0/onecall");
  url.searchParams.set("lat", String(place.lat));
  url.searchParams.set("lon", String(place.lon));
  url.searchParams.set("appid", key);
  url.searchParams.set("units", "metric");
  url.searchParams.set("exclude", "minutely");
  const r = await fetch(url.toString(), { headers: { accept: "application/json" } });
  if (!r.ok) throw new Error("OpenWeather " + r.status);
  return await r.json();
}

function normalize(place, data, providerKey) {
  const current = data.current || {};
  const condition = current.weather?.[0] || {};
  return {
    source: "OpenWeather",
    keySource: providerKey,
    updatedAt: new Date((current.dt || Math.floor(Date.now() / 1000)) * 1000).toISOString(),
    location: place,
    timezone: data.timezone || null,
    current: {
      temp: current.temp ?? null, feelsLike: current.feels_like ?? null,
      humidity: current.humidity ?? null, windSpeed: current.wind_speed ?? null,
      visibility: current.visibility ?? null, pressure: current.pressure ?? null,
      uvi: current.uvi ?? null, clouds: current.clouds ?? null,
      rain1h: current.rain?.["1h"] ?? 0, snow1h: current.snow?.["1h"] ?? 0,
      condition: condition.main || "Unknown", description: condition.description || "",
      icon: condition.icon || null,
      sunrise: current.sunrise ? new Date(current.sunrise * 1000).toISOString() : null,
      sunset: current.sunset ? new Date(current.sunset * 1000).toISOString() : null
    },
    daily: (Array.isArray(data.daily) ? data.daily.slice(0, 8) : []).map(day => ({
      date: new Date(day.dt * 1000).toISOString().slice(0, 10),
      min: day.temp?.min ?? null, max: day.temp?.max ?? null,
      precipitationProbability: Math.round((day.pop || 0) * 100),
      rain: day.rain ?? 0, snow: day.snow ?? 0,
      condition: day.weather?.[0]?.main || "Unknown",
      description: day.weather?.[0]?.description || "",
      icon: day.weather?.[0]?.icon || null,
      summary: day.summary || null
    }))
  };
}

import { auth } from "hatchable";

export default async function (req, res) {
  await auth.getUser(req);
  const q = req.query || {};
  const place = PLACES[cleanKey(q.place || "manali")];
  if (!place) return res.status(400).json({ error: "Unknown destination", available: Object.keys(PLACES) });

  const primary = process.env.OPENWEATHER_API_KEY_PRIMARY;
  const fallback = process.env.OPENWEATHER_API_KEY_FALLBACK;
  if (!primary && !fallback) return res.status(503).json({ error: "Weather provider is not configured." });

  let data, providerKey, lastError;
  for (const [label, key] of [["primary", primary], ["fallback", fallback]]) {
    if (!key) continue;
    try { data = await getWeather(key, place); providerKey = label; break; }
    catch (err) { lastError = err; }
  }
  if (!data) {
    const detail = lastError?.message || "Unknown provider error";
    return res.status(200).json({ available: false, source: "OpenWeather", location: place, updatedAt: null, error: detail });
  }
  return res.json({ available: true, ...normalize(place, data, providerKey) });
}