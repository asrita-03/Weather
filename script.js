const apiKey = '9203cfecca624fc7b0231c808285f584';

document.getElementById('locationForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const location = document.getElementById('locationInput').value;
    getWeatherData(location);
});

async function getWeatherData(location) {
    try {
        const currentWeatherResponse = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}&units=metric`);
        const currentWeatherData = await currentWeatherResponse.json();
        displayCurrentWeather(currentWeatherData);

        const forecastResponse = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${location}&appid=${apiKey}&units=metric`);
        const forecastData = await forecastResponse.json();
        displayForecast(forecastData);
    } catch (error) {
        console.error('Error fetching weather data:', error);
    }
}

function displayCurrentWeather(data) {
    const currentWeatherContainer = document.getElementById('currentWeather');
    currentWeatherContainer.innerHTML = `
        <div class="weather-card">
            <h2>Current Weather in ${data.name}</h2>
            <p>Temperature: ${data.main.temp}°C</p>
            <p>Weather: ${data.weather[0].description}</p>
        </div>
    `;
}

function displayForecast(data) {
    const forecastContainer = document.getElementById('forecast');
    forecastContainer.innerHTML = '<h2>7-Day Forecast</h2>';
    for (let i = 0; i < data.list.length; i += 8) {
        const day = data.list[i];
        forecastContainer.innerHTML += `
            <div class="weather-card">
                <p>Date: ${new Date(day.dt * 1000).toDateString()}</p>
                <p>Temperature: ${day.main.temp}°C</p>
                <p>Weather: ${day.weather[0].description}</p>
            </div>
        `;
    }
}
