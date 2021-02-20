const btnCity = document.querySelector('#btnCity'); //get btn//
const cityChosen = document.querySelector('#cities');//get select//
const container = document.querySelector("#container");// get div container to append card//

const btnHoliday = document.querySelector('#btnHoliday') //get btn2//
const holidayChosen = document.querySelector('#holiday');//get select2//

const state = {
  config: {
    api_key: "4a63bb3a36f18657c6e09a17c34fc470",
    base_url: "http://api.openweathermap.org/data/2.5/"
  }
}

//function generating card for holiday city//
async function getHolidayCity(evt){
  evt.preventDefault();
  let valueHolidayCity = holidayChosen.value;

  container.textContent = "";
  if(valueHolidayCity==="all"){
    let response = await fetch(`http://api.openweathermap.org/data/2.5/group?id=2525384,3180630,3177952,3173718,6541982,6457404,2523238,2522975&appid=${state.config.api_key}`);
    let result = await response.json();
    console.log(result);
  

  result.list.forEach(city => {
   createCard(city.name, //call function createCard by using its parameters//
    city.weather[0].icon,
    city.weather[0].main, 
    city.weather[0].description, 
    city.wind.speed,
    city.main.temp,
    city.main.humidity);
});
} else {
  let response = await fetch(getUrl ('/weather', valueHolidayCity));// parameters //
    result = await response.json(); 
    createCard(result.name, //call function createCard by using its parameters//
      result.weather[0].icon,
      result.weather[0].main, 
      result.weather[0].description, 
      result.wind.speed,
      result.main.temp,
      result.main.humidity);
    console.log(result);
}
}
//utility to get URL//
function getUrl(pathName, cityName) {
    const { api_key, base_url } = state.config;
  
    return `${base_url}${pathName}?q=${cityName}&appid=${api_key}`;
}

function createCard(name, iconCode, weather, description, windSpeed, temperature, humidity) {
  const cardWrap = document.createElement("div");
  // const coverImg = document.createElement("img");

  const textWrap = document.createElement("div");
  const headerWrap = document.createElement("div");
  const iconCodeImg = document.createElement("img");
  const nameCity = document.createElement("h3");
  const weatherP = document.createElement("p");
  const windSpeedP = document.createElement("p");
  const descriptionP = document.createElement("p");
  const temperatureP = document.createElement("p");
  const humidityP = document.createElement("p");
  
  cardWrap.classList.add("card");
  headerWrap.classList.add("card_header_wrap")
  textWrap.classList.add("card_text_wrap");

  nameCity.textContent = name;
  iconCodeImg.src = `http://openweathermap.org/img/wn/${iconCode}@4x.png`;
  weatherP.textContent = `Weather: ${weather}`;
  windSpeedP.textContent = `Wind speed: ${windSpeed} km/h`;
  descriptionP.textContent = `More details: ${description}`;
  temperatureP.textContent = `Temperature: ${Math.floor(parseFloat(temperature) - 273.15)} °C`;
  humidityP.textContent = `Humidity: ${humidity}%`;

  // coverImg.src = imgURL;
  headerWrap.append(nameCity,iconCodeImg);
  textWrap.append(weatherP, descriptionP, windSpeedP, temperatureP, humidityP);
  cardWrap.append(headerWrap, textWrap);
  container.appendChild(cardWrap);
} 




// to get data by fetch//
async function loadData(evt){
  evt.preventDefault();
  let valueCity = cityChosen.value;

  container.textContent = "";
  if (valueCity==="all"){
    let response = await fetch(`http://api.openweathermap.org/data/2.5/group?id=3183087,3182996,6542001,3181927,2525471,3180990,2525059,3176959,3176217,3175121,3173435,3172394,2523918,3171179,3170027,5134295,3165523,3165243,3165185,3164603&appid=${state.config.api_key}`);
    let result = await response.json();
    console.log(result);

    result.list.forEach(city => {
      createCard(city.name, //call function createCard by using its parameters//
        city.weather[0].icon,
        city.weather[0].main, 
        city.weather[0].description, 
        city.wind.speed,
        city.main.temp,
        city.main.humidity);
    });
  } else {
    let response = await fetch(getUrl ('/weather', valueCity));// parameters //
    result = await response.json(); 
    createCard(result.name, //call function createCard by using its parameters//
      result.weather[0].icon,
      result.weather[0].main, 
      result.weather[0].description, 
      result.wind.speed,
      result.main.temp,
      result.main.humidity);
    console.log(result);
  }
}

  //listener on btn//  
btnCity.addEventListener("click", loadData);   


btnHoliday.addEventListener("click", getHolidayCity);