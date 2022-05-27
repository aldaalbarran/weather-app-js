(function () {
    let app = document.getElementById('app')
    let txtSearch = document.getElementById('txt-search')
    let error = document.getElementById('alert-error')

    let degrees = " °C"
    let velocity = "m/s"

    let city = txtSearch.value
    let apiKey = "4ef5b01cd2060237ebbb1a0ef97a1870"

    let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`
    getWeather(url, degrees, velocity)

    //Events
    app.addEventListener('submit', function (e) {
        e.preventDefault()
    })

    app.elements.namedItem('btn-search').addEventListener('click', function () {
        city = txtSearch.value
        if (city == "" || city == null) {
            error.textContent = "Type a city"
            error.classList.remove('d-none')
            setTimeout(function () {
                error.classList.add('d-none')
            }, 2000)
        } else {
            degrees = " °C"
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
            }, 2000)
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
            }, 2000)
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
                if (data.name == null || data.name == "") {
                    txtDay.textContent = ""
                    txtCity.textContent = ""
                    error.textContent = "Type a valid city"
                    error.classList.remove('d-none')
                    setTimeout(function () {
                        error.classList.add('d-none')
                    }, 2000)
                }

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

                let statusImg = data.weather[0].icon
                imgStatus.src = `./img/animated/${statusImg}.svg`
                document.body.style.background = `var(--bg__${statusImg})`
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