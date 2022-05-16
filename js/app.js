(function () {
    var app = document.getElementById('app')
    var txtSearch = document.getElementById('txt-search')
    var error = document.getElementById('alert-error')

    var degrees = " °C"
    var velocity = "m/s"

    var city = txtSearch.value
    var apiKey = "4ef5b01cd2060237ebbb1a0ef97a1870"

    var url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`
    getWeather(url, degrees, velocity)

    //Events
    app.addEventListener('submit', function (e) {
        e.preventDefault()
    })

    app.elements.namedItem('btn-search').addEventListener('click', function () {
        city = txtSearch.value
        if (city == "" || city == null) {
            error.classList.remove('d-none')
            setTimeout(function () {
                error.classList.add('d-none')
            }, 2000);
        } else {
            velocity = " m/s"
            url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`
            getWeather(url, degrees, velocity)
        }
    })

    app.elements.namedItem('btn-celcius').addEventListener('click', function () {
        city = txtSearch.value
        if (city == "" || city == null) {
            error.classList.remove('d-none')
            setTimeout(function () {
                error.classList.add('d-none')
            }, 2000);
        } else {
            degrees = " °C"
            velocity = " m/s"
            url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`
            getWeather(url, degrees, velocity)
        }
    })

    app.elements.namedItem('btn-farenheit').addEventListener('click', function () {
        city = txtSearch.value
        if (city == "" || city == null) {
            error.classList.remove('d-none')
            setTimeout(function () {
                error.classList.add('d-none')
            }, 2000);
        } else {
            degrees = " °F"
            velocity = " mph"
            url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${apiKey}`
            getWeather(url, degrees, velocity)
        }
    })

    function getWeather(url, degrees, velocity) {

        fetch(url)
            .then(response => { return response.json() })
            .then(data => {

                let dnDate = new Date(data.dt * 1000)
                let dnDayName = dayNameNow(dnDate)
                let dnDayNumber = dnDate.getDate()
                let dnMonth = monthNameNow(dnDate)
                let dnYear = dnDate.getFullYear()
                txtDay.textContent = `${dnDayName} ${dnDayNumber} ${dnMonth} ${dnYear}`
                
                

                let cityName = data.name
                txtCity.textContent = cityName

                let temp = Math.round(data.main.temp)
                txtTemp.textContent = `${temp} ${degrees}`

                let descTemp = data.weather[0].description
                txtDescTemp.textContent = descTemp

                let tempMax = Math.round(data.main.temp_max)
                txtTempMax.textContent = `${tempMax} ${degrees}`

                let tempMin = Math.round(data.main.temp_min)
                txtTempMin.textContent = `${tempMin} ${degrees}`

                let wind = `${data.wind.speed} ${velocity}`
                txtWind.textContent = wind

                let humidity = `${data.main.humidity}%`
                txtHumidity.textContent = humidity

                let sunrise = data.sys.sunrise
                let srDate = new Date(sunrise * 1000)
                let srHours = srDate.getHours()
                let srMinutes = srDate.getMinutes()
                srMinutes.toString().length == 1 ? txtSunrise.textContent = srHours + ': 0' + srMinutes : txtSunrise.textContent = srHours + ': ' + srMinutes

                let sunset = data.sys.sunset
                let ssDate = new Date(sunset * 1000)
                let ssHours = ssDate.getHours()
                let ssMinutes = srDate.getMinutes()
                ssMinutes.toString().length == 1 ? txtSunset.textContent = ssHours + ': 0' + ssMinutes : txtSunset.textContent = ssHours + ': ' + ssMinutes

                //para iconos dinámicos

                console.log(data.weather[0].main)
                switch (data.weather[0].main) {
                    case 'Thunderstorm':
                        imgStatus.src = './img/animated/thunder.svg'
                        //console.log('TORMENTA');
                        break;
                    case 'Drizzle':
                        imgStatus.src = './img/animated/rainy-2.svg'
                        //console.log('LLOVIZNA');
                        break;
                    case 'Rain':
                        imgStatus.src = './img/animated/rainy-7.svg'
                        //console.log('LLUVIA');
                        break;
                    case 'Snow':
                        imgStatus.src = './img/animated/snowy-6.svg'
                        //console.log('NIEVE');
                        break;
                    case 'Clear':
                        imgStatus.src = './img/animated/day.svg'
                        //console.log('LIMPIO');
                        break;
                    case 'Atmosphere':
                        imgStatus.src = './img/animated/weather.svg'
                        //console.log('ATMOSFERA');
                        break;
                    case 'Clouds':
                        imgStatus.src = './img/animated/cloudy-day-1.svg'
                        //console.log('NUBES');
                        break;
                    default:
                        imgStatus.src = './img/animated/cloudy-day-1.svg'
                    //console.log('por defecto');
                }

            })
            .catch(error => {
                console.log(error)
            })
    }

    function dayNameNow(dnDate) {
        var weekdays = new Array(7)
        weekdays[0] = "Sunday"
        weekdays[1] = "Monday"
        weekdays[2] = "Tuesday"
        weekdays[3] = "Wednesday"
        weekdays[4] = "Thursday"
        weekdays[5] = "Friday"
        weekdays[6] = "Saturday"
        var day = weekdays[dnDate.getDay()]
        return day
    }

    function monthNameNow(dnDate) {
        var months = new Array(11)
        months[0] = "January"
        months[1] = "February"
        months[2] = "March"
        months[3] = "April"
        months[4] = "May"
        months[5] = "June"
        months[6] = "July"
        months[7] = "August"
        months[8] = "September"
        months[9] = "October"
        months[10] = "November"
        months[11] = "December"
        var month = months[dnDate.getMonth()]
        return month
    }

}())