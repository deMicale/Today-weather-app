const btnCity = document.querySelector('#btnCity');
const cityChosen = document.querySelector('#cities');
const container = document.querySelector("#container");

const state = {
    config: {
      api_key: "4a63bb3a36f18657c6e09a17c34fc470",
      base_url: "http://api.openweathermap.org/data/2.5/"
    }
}

function getUrl(pathName, cityName) {
    const { api_key, base_url } = state.config;
  
    return `${base_url}${pathName}?q=${cityName}&appid=${api_key}`;
}


function createCard(name, weather, description, temperature, humidity) {
        const cardWrap = document.createElement("div");
        // const coverImg = document.createElement("img");
      
        const textWrap = document.createElement("div");
        const headerWrap = document.createElement("div");
        const nameCity = document.createElement("h3");
        const weatherP = document.createElement("p");
        const descriptionP = document.createElement("p");
        const temperatureP = document.createElement("p");
        const humidityP = document.createElement("p");
        
        cardWrap.classList.add("card");
        headerWrap.classList.add("card_header_wrap")
        textWrap.classList.add("card_text_wrap");
      
        nameCity.textContent = name;
        weatherP.textContent = `Weather: ${weather}`;
        descriptionP.textContent = `More details: ${description}`;
        temperatureP.textContent = `Temperature: ${parseFloat(temperature) - 273.15} °C`;
        humidityP.textContent = `Humidity: ${humidity}%`;

        // coverImg.src = imgURL;
        headerWrap.appendChild(nameCity);
        textWrap.append(weatherP, descriptionP, temperatureP, humidityP);
        cardWrap.append(headerWrap, textWrap);
        container.appendChild(cardWrap);
}

async function loadData(evt){
    evt.preventDefault();
    let valueCity = cityChosen.value;
    let response = await fetch(getUrl ('/weather', valueCity));
    let result = await response.json();

    createCard(result.name,
        result.weather[0].main, 
        result.weather[0].description, 
        result.main.temp,
        result.main.humidity);
    console.log(result);
}

  //bottone in ascolto//  
btnCity.addEventListener("click", loadData);   
