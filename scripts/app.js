const apiKey = '00ff1b7bf3e47a6dcb373400182c54bc';  // Replace with your valid OpenWeatherMap API Key
const searchButton = document.getElementById('searchButton');
const cityInput = document.getElementById('cityInput');

searchButton.addEventListener('click', () => {
    const cityName = cityInput.value;
    if (cityName) {
        fetchWeatherData(cityName);
    }
});

function fetchWeatherData(city) {
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok ' + response.statusText);
            }
            return response.json();
        })
        .then(data => {
            if (data.cod === 200) {
                displayWeatherData(data);
            } else {
                alert('City not found or API request failed. Please try again.');
                console.error('API Error:', data.message);
            }
        })
        .catch(error => console.error('Error fetching the weather data:', error));
}

function displayWeatherData(data) {
    if (data.main && data.weather) {
        const cityName = document.getElementById('cityName');
        const temperature = document.getElementById('temperature');
        const description = document.getElementById('description');
        const humidity = document.getElementById('humidity');
        const windSpeed = document.getElementById('windSpeed');

        cityName.textContent = data.name;
        temperature.textContent = `Temperature: ${data.main.temp} °C`;
        description.textContent = `Weather: ${data.weather[0].description}`;
        humidity.textContent = `Humidity: ${data.main.humidity} %`;
        windSpeed.textContent = `Wind Speed: ${data.wind.speed} m/s`;
    } else {
        alert('Weather data not found for this city. Please try another city.');
        console.error('Invalid data structure:', data);
    }
}
