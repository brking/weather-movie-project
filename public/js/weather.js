const apiKey = 'GrnTM09fcEuXvJRdrOXQ273aR0NtJtIf';
//GADSYldUb12XgtsWsJ4luTcQxEyISaop

const cityForm = document.querySelector('form');

cityForm.addEventListener('submit', e => {
    e.preventDefault();

    const city = cityForm.city.value.trim();
    cityForm.reset();

    updateCity(city)
        .then(data => console.log(data))
        .catch(err => console.log(err));
})

const updateCity = async(city) => {
    const cityList = await getCityList(city);

    return cityList
}

const getCityWeatherDetails = async (id, city, region, administrativeType, administrativeName, country) => {
    let output = '';
    const base = 'https://dataservice.accuweather.com/currentconditions/v1/';
    const query = `${id}?apikey=${apiKey}`;

    const response = await fetch(base + query);
    const data = await response.json();

    let timeSrc = null;
    let iconSrc = `img/icons/${data[0].WeatherIcon}.svg`

    if (data[0].IsDayTime) {
        timeSrc = 'img/day.svg'
    } else {
        timeSrc = 'img/night.svg'
    }

    output += `
    <div class="container mb-5 mx-auto">
        <div class="card shadow-lg rounded">
            <img src="${timeSrc}" class="time card-img-top">
            <div class="icon bg-light mx-auto text-center">
                <img src="${iconSrc}" class="time card-img-top">
            </div>
            <div class="text-muted text-center details">
                <h5 class="my-3"><span class="fw-bold">${region}:</span> ${city}</h5>
                <div class="my-1"><span class="fw-bold">${administrativeType}:</span> ${administrativeName}</div> 
                <div class="my-1"><span class="fw-bold">Country:</span> ${country}</div> 
                <div class="my-1"><span class="fw-bold">Weather condition:</span> ${data[0].WeatherText}</div>
                <div class="display-5 my-1">
                    <span>${data[0].Temperature.Metric.Value}</span>
                    <span>&deg;C</span>
                </div>
                <div class="display-5 my-1">
                    <span>${data[0].Temperature.Imperial.Value}</span>
                    <span>&deg;F</span>
                </div>
            </div>
        </div>
    </div>
    `
    $("#city-weather-details").html(output);
    // icon.setAttribute('src', iconSrc);

    return data;
}

const getCityList = async (searchText) => {
    let output = '';
    const base = 'https://dataservice.accuweather.com/locations/v1/cities/search';
    const query = `?apikey=${apiKey}&q=${searchText}`;

    const response = await fetch(base + query);
    const data = await response.json();

    data.forEach((item) => {
        output += `
        <div class="city-item row">
               <a href="#" onclick="getCityWeatherDetails('${item.Key}','${item.LocalizedName}','${item.Type}','${item.AdministrativeArea.LocalizedType}','${item.AdministrativeArea.LocalizedName}','${item.Country.LocalizedName}')">${item.LocalizedName} which is a ${item.Type.toLowerCase()} in the ${item.AdministrativeArea.LocalizedType.toLowerCase()} of ${item.AdministrativeArea.LocalizedName}, ${item.Country.LocalizedName}</a>
        </div>`
    });

    $("#city-list").html(output);
    return data;
}