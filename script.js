

document.getElementById('getWeatherBtn').addEventListener('click', fetchWeather);

async function fetchWeather() {
    const city = document.getElementById('cityInput').value;
    const apiKey = 'your_api_key_here'; // Replace with your actual API key
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        
        if (response.ok) {
            // Update the weather display section
            const weatherDisplay = document.getElementById('weatherInfo');
            const temp = data.main.temp;
            const humidity = data.main.humidity;
            const description = data.weather[0].description;

            weatherDisplay.innerHTML = `
                <strong>Weather in ${city}:</strong><br>
                Temperature: ${temp}°C<br>
                Humidity: ${humidity}%<br>
                Description: ${description}
            `;

            
            checkTemperatureAlert(temp);
        } else {
            document.getElementById('weatherInfo').textContent = 'City not found. Please try again.';
        }
    } catch (error) {
        console.error('Error fetching weather data:', error);
        document.getElementById('weatherInfo').textContent = 'Error fetching data. Please try again.';
    }
}


document.getElementById('setAlertBtn').addEventListener('click', setTemperatureAlert);
let alertTemp = null;

function setTemperatureAlert() {
    const tempAlert = document.getElementById('tempAlert').value;
    alertTemp = parseFloat(tempAlert);
    alert(`Alert set for temperatures below ${alertTemp}°C.`);
}

function checkTemperatureAlert(currentTemp) {
    if (alertTemp !== null && currentTemp < alertTemp) {
        alert(`Warning: The temperature is below ${alertTemp}°C!`);
    }
}
