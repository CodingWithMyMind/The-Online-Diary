<template>
  <keep-alive>
    <div class="weather block">
      <h3>Weather</h3>
      <div class="result">
        <!-- storing the temp here -->
        <h1>{{ temp }}</h1>
        <h2>{{ type | capitalizeFirst }}</h2>
      </div>
    </div>
  </keep-alive>
</template>

///////////////////////////////////////////////////////////////SCRIPT//////////////////////////////////////////////////////////////////

<script>
export default {
  data() {
    return {
      temp: "Loading",
      type: "",
    };
  },
  methods: {
    getWeather: function (lat, long) {
      var _this = this;
      // shorten incoming lat and long so work with api call
      var newlat = String(lat).substring(0, 9);
      var newlong = String(long).substring(0, 9);
      //   create endpoint using shortend lat and long
      let endpoint =
        "https://api.openweathermap.org/data/2.5/onecall?lat=" +
        newlat +
        "&lon=" +
        newlong +
        "&appid=a3c703c79a312c2137c274a3473aac43";
      // try fetch data using new endpoint
      fetch(endpoint)
        .then(function (response) {
          return response.json();
        })
        .then(function (data) {
          // if successful then set the temperature and weather type locally
          _this.temp = Math.round(data.current.temp - 273.15) + "°C";
          _this.type = data.current.weather[0].description;
        });
    },
  },
  // when first created try to get coordinates of user
  created() {
    var self = this; // only ask for location once
    if (!this.locate) {
      this.locate = 1;
      if (navigator.geolocation) {
        // ask for permission
        navigator.geolocation.getCurrentPosition(function (pos) {
          // if got permission and can then fire my function get weather
          self.getWeather(pos.coords.latitude, pos.coords.longitude);
        });
      } else {
        alert("Your browser does not support HTML5 geolocation, Sorry");
      }
    }
  },
};
</script>
///////////////////////////////////////////////////////////////***STYLES***//////////////////////////////////////////////////////////////////

<style scoped>
.weather {
  grid-area: weather;
}
.result {
  text-align: center;
  height: 100%;
}
h1 {
  font-size: 3vmax;
  position: relative;
  font-size: auto;
  top: 20%;
}
h2 {
  top: 20%;
  font-size: 2vmax;
  position: relative;
}
@media only screen and (max-width: 675px) {
  .result {
    max-height: 200px;
  }
}
</style>
