const icon = document.querySelector(".weather-icon");
const temperature = document.querySelector(".temperature-value");
const description = document.querySelector(".temperature-description");
const locationElement = document.querySelector(".location");
const notification = document.querySelector(".notification");

const KELVIN=273;
const weather = {}

weather.temperature={
    unit:"celsius"
}

const key = '91894c09292bdf1c11b283c8017c75a0';

if('geolocation' in navigator){
    navigator.geolocation.getCurrentPosition(setPosition,showError);
}
else{
    notification.style.display='block';
    notification.innerHTML="Browser does not support Geolocation"
}

function setPosition(position){
    let latitude = position.coords.latitude;
    let longitude = position.coords.longitude;

    getWeather(latitude,longitude);
}

//Show error

function showError(error){
    notification.style.display="block";
    notification.innerHTML = `${error.message}`;
}

function getWeather(latitude,longitude){
    let api = `http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${key}`;

   fetch(api)
    .then(function(response){
        let data= response.json();
        return data 
    })
    .then(function(data){
        weather.temperature.value = Math.floor(data.main.temp-KELVIN);
        weather.description = data.weather[0].description;
        weather.iconId = data.weather[0].icon;
        weather.city = data.name;
        weather.country = data.sys.country;
    })
    .then(function(){
        displayWeather();
    })
}

function displayWeather(){
    icon.innerHTML = `<img src="icons/${weather.iconId}.png"/>`;
    temperature.innerHTML = `${weather.temperature.value}°C`;
    description.innerHTML = weather.description;
    locationElement.innerHTML = `${weather.city},${weather.country}`;
}