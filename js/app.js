window.addEventListener('load', ()=> {

})

(function () {
    var app = document.getElementById('app')
    var txtSearch = document.getElementById('txt-search')

    var city = "Mexico City"
    var url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=4ef5b01cd2060237ebbb1a0ef97a1870`
    getWeather(city)

    //Events
    app.addEventListener('submit', function (e) {
        e.preventDefault()
    })

    app.elements.namedItem('btn-search').addEventListener('click', function () {
        city = txtSearch.value
        getWeather(city)
    })

    function getWeather(city) {
        var url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=4ef5b01cd2060237ebbb1a0ef97a1870`

        fetch(url)
            .then(response => { return response.json() })
            .then(data => {

                let dnDate = new Date()
                let dnDayName = dayNameNow()
                let dnDayNumber = dnDate.getDate()
                let dnMonth = monthNameNow()
                let dnYear = dnDate.getFullYear()
                txtDay.textContent = `${dnDayName} ${dnDayNumber} ${dnMonth} ${dnYear}`

                let cityName = data.name
                txtCity.textContent = cityName

                let temp = Math.round(data.main.temp)
                txtTemp.textContent = `${temp} °C`

                let descTemp = data.weather[0].description
                txtDescTemp.textContent = descTemp

                let tempMax = Math.round(data.main.temp_max)
                txtTempMax.textContent = `${tempMax} °C`

                let tempMin = Math.round(data.main.temp_min)
                txtTempMin.textContent = `${tempMin} °C`

                let wind = `${data.wind.speed} km/h`
                txtWind.textContent = wind

                let rain = `${data.main.humidity}%`
                txtRain.textContent = rain

                let sunrise = data.sys.sunrise
                let srDate = new Date(sunrise * 1000)
                let srHours = srDate.getHours()
                let srMinutes = srDate.getMinutes()
                srMinutes.toString().length == 1 ? txtSunrise.textContent = srHours+': 0'+srMinutes : txtSunrise.textContent = srHours+': '+srMinutes
                
                let sunset = data.sys.sunset
                let ssDate = new Date(sunset * 1000)
                let ssHours = ssDate.getHours()
                let ssMinutes = srDate.getMinutes()
                ssMinutes.toString().length == 1 ? txtSunset.textContent = ssHours+': 0'+ssMinutes : txtSunset.textContent = ssHours+': '+ssMinutes

                //para iconos dinámicos
                
                console.log(data.weather[0].main)
                switch (data.weather[0].main) {
                    case 'Thunderstorm':
                      imgStatus.src='./img/animated/thunder.svg'
                      //console.log('TORMENTA');
                      break;
                    case 'Drizzle':
                      imgStatus.src='./img/animated/rainy-2.svg'
                      //console.log('LLOVIZNA');
                      break;
                    case 'Rain':
                      imgStatus.src='./img/animated/rainy-7.svg'
                      //console.log('LLUVIA');
                      break;
                    case 'Snow':
                        imgStatus.src='./img/animated/snowy-6.svg'
                        //console.log('NIEVE');
                      break;                        
                    case 'Clear':
                        imgStatus.src='./img/animated/day.svg'
                        //console.log('LIMPIO');
                      break;
                    case 'Atmosphere':
                        imgStatus.src='./img/animated/weather.svg'
                        //console.log('ATMOSFERA');
                        break;  
                    case 'Clouds':
                        imgStatus.src='./img/animated/cloudy-day-1.svg'
                        //console.log('NUBES');
                        break;  
                    default:
                        //imgStatus.src='./img/animated/cloudy-day-1.svg'
                        console.log('por defecto');
                  }

            })
            .catch(error => {
                console.log(error)
            })
    }

    function dayNameNow() {
        var a = new Date()
        var weekdays = new Array(7)
        weekdays[0] = "Sunday"
        weekdays[1] = "Monday"
        weekdays[2] = "Tuesday"
        weekdays[3] = "Wednesday"
        weekdays[4] = "Thursday"
        weekdays[5] = "Friday"
        weekdays[6] = "Saturday"
        var day = weekdays[a.getDay()]
        return day
    }

    function monthNameNow() {
        var a = new Date()
        var weekdays = new Array(11)
        weekdays[0] = "January"
        weekdays[1] = "February"
        weekdays[2] = "March"
        weekdays[3] = "April"
        weekdays[4] = "May"
        weekdays[5] = "June"
        weekdays[6] = "July"
        weekdays[7] = "August"
        weekdays[8] = "September"
        weekdays[9] = "October"
        weekdays[10] = "November"
        weekdays[11] = "December"
        var month = weekdays[a.getMonth()]
        return month
    }

}())