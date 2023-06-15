﻿// Please see documentation at https://docs.microsoft.com/aspnet/core/client-side/bundling-and-minification
// for details on configuring this project to bundle and minify static web assets.

// Globala variabler


// Initiering av globala variabler och händelsehanterare.
function init() {
    let cardElems = document.getElementsByClassName("card-body");
    for (var i = 0; i < cardElems.length; i++) {
        cardElems[i].addEventListener('click', cardClick, false);
    }
} // End init
window.addEventListener("load", init); // init aktiveras då sidan är inladdad

// Funktion för hantering av click på card
function cardClick() {
    let href;
    let elems = this.children;
    //gå igenom elems och hitta "card-link"
    for (var i = 0; i < elems.length; i++) {
        if (elems[i].className == "card-link") {
            href = elems[i].href;
        }
    }
    open(href, "_self"); //Öppnas i samma fönster (_blank i annat fall)
}


// BUtton för signup i footern

function clickSignUp() {
    var signUpBtn = document.getElementById("signupButton");
    signUpBtn.addEventListener('click', () => {
        window.open('https://localhost:7241', 'popUp', 'height = 300, width = 500, left = 100, top = 100, scrollbars = yes, resizable = yes, menubar = no, toolbar = yes, location = no, directories = no, status = yes')

    });

}
clickSignUp();












// Hämta och visa upp väder

const weatherInfoElement = document.getElementById('wind');
const cityElement = document.getElementById('stad');
const temperatureElement = document.getElementById('temp');
const descriptionElement = document.getElementById('weatherdesc');
const humidityElement = document.getElementById('humidity');
const iconElement = document.getElementById('icon');
let errorMessageElement = document.getElementById('error-message')

    //geolocation
function fetchWeatherData(latitude, longitude, city) {
    let apiUrl = '';
    errorMessageElement.textContent = '';

    if (latitude && longitude) {
        apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&lang=sv&appid=5f8720cba1f10e09507ee30899b138a5`;
    }
    else if (city) {
        apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&units=metric&lang=sv&appid=5f8720cba1f10e09507ee30899b138a5`
    }
    else {
        console.log('Felaktig inmatning');
        errorMessageElement.textContent = 'Felaktig inmatning';
        
    }

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            

            const temperature = Math.round(data.main.temp); 
            temperatureElement.textContent = `${temperature.toString()}°C`;

            const windSpeed = Math.round(data.wind.speed);
            weatherInfoElement.textContent = `${windSpeed.toString()}m/s`;

            cityElement.textContent = `${data.name}`;

            humidityElement.textContent = `${data.main.humidity} %`;
            
            descriptionElement.textContent = `${data.weather[0].description}`;

            if (data.weather[0].main == 'Clouds') {
                iconElement.src = 'images/clouds.png';
            }
            else if (data.weather[0].main == 'Clear') {
                iconElement.src = 'images/clear.png';
            }
            else if (data.weather[0].main == 'Rain') {
                iconElement.src = 'images/rain.png';
            }
            else if (data.weather[0].main == 'Drizzle') {
                iconElement.src = 'images/drizzle.png';
            }
            else if (data.weather[0].main == 'Mist') {
                iconElement.src = 'images/mist.png';
            }
            else if (data.weather[0].main == 'Snow') {
                iconElement.src = 'images/snow.png';
            }
            
            weatherInfoElement.style.display = 'block';
        })
        .catch(error => {
            console.log('Error:', error);
            errorMessageElement.textContent = 'Ett fel uppstod, försök igen!';
        });
}

function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            const latitude = position.coords.latitude;
            const longitude = position.coords.longitude;
            fetchWeatherData(latitude, longitude);
        }, error => {
            console.log('Error:', error);
        });
    } else {
        console.log('Geolocation kan inte användas på din browser.');
        errorMessageElement.textContent = 'Geolocation kan inte användas på din browser.';
    }
}

    //Söker på plats
function searchWeatherByCity() {
    const searchInput = document.getElementById('search-input');
    const searchButton = document.getElementById('search-button');

    function searchWays() {
        const city = searchInput.value.trim();
        if (city) {
            fetchWeatherData(null, null, city);
        }
        else {
            errorMessageElement.textContent = 'Skriv in en befintlig stad';
        }
    };

    searchButton.addEventListener('click', searchWays);

    searchInput.addEventListener('keydown', (event) => { 
        if (event.key === 'Enter') {
            searchWays();
        }
    });
}

    // laddar in vädret när siddan laddas 
window.addEventListener('load', getLocation);

    // Laddar in väder vid sökning på plats
searchWeatherByCity();