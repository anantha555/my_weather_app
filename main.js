let weather = {
    apiKey: "6328a1ed6befb5ac4ad31b26ad1479f3",
    fetchWeather: function(city) {
        fetch(
                "https://api.openweathermap.org/data/2.5/weather?q=" +
                city +
                "&units=metric&appid=" +
                this.apiKey
            )
            .then((response) => {
                if (!response.ok) {
                    alert("No weather found.");
                    throw new Error("No weather found.");
                }
                return response.json();
            })
            .then((data) => this.featchWeather2(data))
    },

    featchWeather2: function(data) {
        const { lon, lat } = data.coord;
        const { name } = data;
        document.querySelector(".city").innerText = name;

        fetch(
                "https://api.openweathermap.org/data/2.5/onecall?lat=" +
                lat + "&lon=" + lon +
                "&units=metric&appid=" +
                this.apiKey
            )
            .then((response) => {
                if (!response.ok) {
                    alert("No weather found.");
                    throw new Error("No weather found.");
                }
                return response.json();
            })
            .then((data) => this.displayWeather(data));

    },


    displayWeather: function(data) {
        const { temp, feels_like, humidity, wind_speed } = data.current;
        const { icon, main, description } = data.current.weather[0];
        const { min, max } = data.daily[0].temp;
        const { pop } = data.daily[0];

        document.querySelector(".temp").innerText = Math.round(temp) + "°";

        document.querySelector(".feel_temp").innerText = "Feels like " + feels_like + "°C";
        document.querySelector(".icon").src = "https://openweathermap.org/img/wn/" + icon + ".png";

        document.querySelector(".long_desc").innerText = description;
        document.querySelector(".h_temp").innerText = max + "°C ↑";
        document.querySelector(".l_temp").innerText = min + "°C ↓";
        document.querySelector(".humidity").innerText = humidity + "%";
        document.querySelector(".wind").innerText = wind_speed + " km/h";
        document.querySelector(".rain").innerText = pop + "%";

        document.body.style.backgroundImage = "url('https://source.unsplash.com/1600x900/?" + main + "')";

    },
    search: function() {
        this.fetchWeather(document.querySelector(".search-bar").value);
    },
};

document.querySelector(".search button").addEventListener("click", function() {
    weather.search();
});

document
    .querySelector(".search-bar")
    .addEventListener("keyup", function(event) {
        if (event.key == "Enter") {
            weather.search();
        }
    });

weather.fetchWeather("Bangalore");