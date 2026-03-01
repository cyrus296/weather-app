import { useState } from "react";

function App() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchWeather = async () => {
    if (!city) return;

    setLoading(true);
    setError("");
    setWeather(null);

    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${import.meta.env.VITE_WEATHER_API_KEY}&units=metric`,
      );

      if (!response.ok) {
        throw new Error("City not found");
      }

      const data = await response.json();
      setWeather(data);
    } catch (err) {
      setError(err.message);
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-[#0B1420] text-white flex">
      {/* Sidebar */}
      <div className="p-6">
        <div className="w-24 bg-[#111C2D] flex flex-col items-center py-6 space-y-10 rounded-2xl shadow-2xl">
          <div className="flex flex-col items-center gap-2">
            <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center text-2xl">
              🌤
            </div>
            <p className="text-xs text-gray-400 tracking-wide">SkyCast</p>
          </div>

          <div className="flex flex-col gap-8 text-xl">
            <div className="opacity-70 hover:opacity-100 cursor-pointer transition">
              🏠
            </div>
            <div className="opacity-70 hover:opacity-100 cursor-pointer transition">
              📍
            </div>
            <div className="opacity-70 hover:opacity-100 cursor-pointer transition">
              ⚙️
            </div>
            <div className="h-95"></div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-8">
        {/* Search Section */}
        <div className="mb-8 flex items-center">
          <input
            type="text"
            placeholder="Search for cities"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            className="w-1/2 bg-[#1B2A41] p-3 rounded-xl outline-none"
          />

          <button
            onClick={fetchWeather}
            className="ml-4 bg-blue-600 px-4 py-2 rounded-lg hover:bg-blue-700 transition"
          >
            Search
          </button>
        </div>

        {/* Loading */}
        {loading && <p className="text-gray-400">Loading...</p>}

        {/* Error */}
        {error && <p className="text-red-400">{error}</p>}

        {/* Weather Display */}
        {weather && (
          <div className="flex gap-8">
            {/* Main Weather Card */}
            <div className="flex-1 bg-[#111C2D] rounded-2xl p-8">
              <h2 className="text-3xl font-bold">{weather.name}</h2>

              <p className="text-gray-400 mt-2 capitalize">
                {weather.weather[0].description}
              </p>

              <div className="mt-10 flex justify-between items-center">
                <p className="text-6xl font-bold">{weather.main.temp}°</p>
                <div>
                  <img
                    src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
                    alt="weather icon"
                  />
                </div>
              </div>

              <div className="mt-8 flex gap-8 text-gray-400">
                <div>
                  <p>Humidity</p>
                  <p className="text-white font-semibold">
                    {weather.main.humidity}%
                  </p>
                </div>

                <div>
                  <p>Wind</p>
                  <p className="text-white font-semibold">
                    {weather.wind.speed} m/s
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
