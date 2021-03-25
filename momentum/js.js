//DOM Elements

const time = document.getElementById('time');
const date = document.getElementById('date');
const greeting = document.getElementById('greeting');
const name = document.getElementById('name');
const focus = document.getElementById('focus');
const blockquote = document.querySelector('blockquote');
const figcaption = document.querySelector('figcaption');
const btn = document.querySelector('.btn');
const btn_body = document.querySelector('.btn_body');
const weatherIcon = document.querySelector('.weather-icon');
const temperature = document.querySelector('.temperature');
const humidity = document.querySelector('.humidity');
const wind = document.querySelector('.wind');
const weatherDescription = document.querySelector('.weather-description');
const city = document.querySelector('.city');

//Show time

function showTime() {
    let today = new Date();
    let hour = today.getHours();
    let min = today.getMinutes();
    let sec = today.getSeconds();
    let year = today.getFullYear();
    let month = today.getMonth();
    let date = today.getDate();
    let day = today.getDay();

    //24hr format
    hour = hour % 24 || 24;

    //Output time
    time.innerHTML = `${getWeekDay(day)}<span>, </span>${date} ${getCustomMonth(month)} ${year}<br>${addZero(hour)}<span>:</span>${addZero(min)}<span>:</span>${addZero(sec)}`;
    setTimeout(showTime, 1000)
}

//Add month and weekday

function getWeekDay() {
    let today = new Date();
    let days = ['Воскресенье', 
                'Понедельник', 
                'Вторник', 
                'Среда', 
                'Четверг', 
                'Пятница', 
                'Суббота'];
    return days[today.getDay()];
  }

function getCustomMonth() {
    let today = new Date();
    let months = ['Января',
                'Февраля',
                'Марта',
                'Апреля',
                'Мая',
                'Июня',
                'Июля',
                'Августа',
                'Сентября',
                'Октября',
                'Ноября',
                'Декабря'];
    return months[today.getMonth()];
}
  
//Add zeros
function addZero(n){
    return (parseInt(n, 10) < 10 ? "0" : '') + n;
}

//Set background and greeting
function setBackgroundAndGreet(){
    let today = new Date();
    let hour = today.getHours();
    //document.body.style.backgroundImage = `url(${array[hour]})`
    if(hour < 6) {
        //night
        greeting.textContent = "Good Night, ";
        document.body.style.color = "white";
    }else if(hour < 12){
        //Morning
        greeting.textContent = "Good Morning, ";
        document.body.style.color = "white"
    }else if(hour < 18){
        //Day
        greeting.textContent = "Good Day, ";
        document.body.style.color = "white";
    }else{
       //Evening
        greeting.textContent = "Good Evening, ";
        document.body.style.color = "white";
    }
}

//Get name
function getName() {
    if(localStorage.getItem('name') === null) {
        name.textContent = '[Enter Name]';
    } else {
        name.textContent = localStorage.getItem('name');
    }
}

let nameStorage = "";

function hiddenName(e) {
    localStorage.setItem("name", e.target.innerText);
    nameStorage = localStorage.getItem("name");
    if (e.type === "click") {
      name.textContent = "";
    }
  }

//Set name
function setName(e) {
    if (e.type === "keypress") {
      // Make sure enter is pressed
      if (e.which == 13 || e.keyCode == 13) {
        localStorage.setItem("name", e.target.innerText);
        name.blur();
      }
    } else {
      localStorage.setItem("name", e.target.innerText);
    }
    if (localStorage.getItem("name") === "") {
      localStorage.setItem("name", e.target.innerText);
      name.textContent = nameStorage;
      localStorage.removeItem("name");
    }
  }

//Get focus
function getFocus() {
    if(localStorage.getItem('focus') === null) {
        focus.textContent = '[Enter Focus]';
    } else {
        focus.textContent = localStorage.getItem('focus');
    }
}

let focusStorage = "";

function hiddenFocus(e) {
  localStorage.setItem("focus", e.target.innerText);
  focusStorage = localStorage.getItem("focus");
  if (e.type === "click") {
    focus.textContent = "";
  }
}

//Set focus
function setFocus(e) {
    if (e.type === "keypress") {
      // Make sure enter is pressed
      if (e.which == 13 || e.keyCode == 13) {
        localStorage.setItem("focus", e.target.innerText);
        focus.blur();
      }
    } else {
      localStorage.setItem("focus", e.target.innerText);
    }
    if (localStorage.getItem("focus") === "") {
      localStorage.setItem("focus", e.target.innerText);
      focus.textContent = focusStorage;
      localStorage.removeItem("focus");
    }
  }
  

//Get quote

async function getQuote() {  
  const url = `https://favqs.com/api/qotd`;
  const res = await fetch(url);
  const data = await res.json(); 
  blockquote.textContent = data.quote.body;
  figcaption.textContent = data.quote.author;
}

//Get weather

function getCity() {
    if (localStorage.getItem("city") === null) { 
        city.textContent = "[Enter your location]";
    } else {
      city.textContent = localStorage.getItem("city");
      //getWeather();
    }
  }
  
  let cityStorage = "";
  
  function hiddenCity(e) {
    localStorage.setItem("city", e.target.innerText);
    cityStorage = localStorage.getItem("city");
    if (e.type === "click") {
      city.textContent = "";
    }
  }

  function setCity(e) {
    if (e.type === "keypress") {
      // Make sure enter is pressed
      if (e.which == 13 || e.keyCode == 13) {
        localStorage.setItem("city", e.target.innerText);
        city.blur();
        getWeather();
      }
    } else {
      localStorage.setItem("city", e.target.innerText);
    }
    if (localStorage.getItem("city") === "") {
      localStorage.setItem("city", e.target.innerText);
      city.textContent = focusStorage;
      localStorage.removeItem("city");
    }
  }

async function getWeather() {
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city.textContent}&lang=ru&appid=7a0b8eea220bfcc26659b2bde7fcd57b&units=metric`;
  const res = await fetch(url);
  const data = await res.json();

  if (city.textContent == "") {
    localStorage.setItem("city", cityStorage);
    city.textContent = localStorage.getItem("city");
  } else if (data.cod != 200) {
    alert("Please enter your location to update weather");
    city.textContent = "[Enter your location]";
    weatherIcon.className = "weather-icon owf";
    temperature.textContent = ``;
    weatherDescription.textContent = "";
    humidity.textContent = ``;
    wind.textContent = ``;
  } else {
  weatherIcon.className = 'weather-icon owf';
  weatherIcon.classList.add(`owf-${data.weather[0].id}`);
  temperature.textContent = `${data.main.temp.toFixed(0)}°C`;  
  humidity.textContent = `Влажность : ${data.main.humidity.toFixed(0)} %`; 
  wind.textContent = `Скорость ветра : ${data.wind.speed.toFixed(0)} m/s`;
  weatherDescription.textContent = data.weather[0].description;
  }
}



//Get img

function getRandomImg() {
    let imgRandom = Math.floor(Math.random() * 20) + 1;
     if (imgRandom>=10){
         return imgRandom= `${imgRandom}.jpg`;
     } else {
        return imgRandom= `0${imgRandom}.jpg`;
     }
    }

let imgData = [];

async function createImgData() {
  const base = "assets/images/";
  for (let i = 0; i < 24; i++) {
    if (i < 6) imgData[i] = base + "night/" + getRandomImg();
    else if (i < 12) imgData[i] = base + "morning/" + getRandomImg();
    else if (i < 18) imgData[i] = base + "day/" + getRandomImg();
    else imgData[i] = base + "evening/" + getRandomImg();
  }
}
createImgData();

function setBgImage() {
    let today = new Date();
    let hour = today.getHours();
    let src = imgData[hour];
    const img = document.createElement('img');
    img.src = src;
    img.onload = () => {      
        document.body.style.backgroundImage = `url(${src})`;
    }; 
}


let numOfImg = 0;

function changeBgOnClick(){
    let src = imgData[numOfImg];
    const img = document.createElement("img");
    img.src = src;
    img.onload = () => {
      document.body.style.backgroundImage = `url(${src})`;

    };
    
    numOfImg++;
    if(numOfImg>imgData.length){
        numOfImg = 0
    } 

btn_body.disabled = true;
setTimeout(function() { btn_body.disabled = false }, 1000);
}



//Add event listeners
document.addEventListener('DOMContentLoaded', getWeather);
document.addEventListener('DOMContentLoaded', getQuote);
btn.addEventListener('click', getQuote);
city.addEventListener("click", hiddenCity);
city.addEventListener('keypress', setCity);
city.addEventListener("blur", setCity);

name.addEventListener("click", hiddenName);
name.addEventListener("keypress", setName);
name.addEventListener("blur", setName);
focus.addEventListener("keypress", setFocus);
focus.addEventListener("blur", setFocus);
focus.addEventListener("click", hiddenFocus);
btn_body.addEventListener('click', changeBgOnClick);

//Run
showTime();
setBackgroundAndGreet();
getName();
getFocus();
getQuote()
setBgImage()
getCity();

