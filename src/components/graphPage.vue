// chart component/page
<template>
  <div class="graph-page">
    <nav-bar class="menu"></nav-bar>
    <div class="graph block">
      <!-- where chart lives -->
      <canvas id="myChart"></canvas>
      <br />
      <!-- total amount of entries -->
      <h2>Total Diary Entries: {{ diarys.length }}</h2>
      <br />
      <p>This Graph shows emotional scoring of diary entries over time</p>
    </div>
  </div>
</template>

///////////////////////////////////////////////////////////////SCRIPT//////////////////////////////////////////////////////////////////
// import chart.js from cdn
<script src="https://cdn.jsdelivr.net/npm/chart.js@2.8.0"></script>

<script>
export default {
  data() {
    return {
      // empty array for the diarys to be put into after retrievd and arrays needed to initialise graph
      diarys: [],
      myEmotionalData: [],
      myDateData: [],
    };
  },
  methods: {
    makeGraph: function () {
      var ctx = document.getElementById("myChart");
      var chart = new Chart(ctx, {
        type: "line",
        data: {
          // setting the x asis to be the date of entry
          labels: this.myDateData,
          datasets: [
            {
              label: "Emotion Rating",
              backgroundColor: "rgb(255, 99, 132,0.1)",
              borderColor: "rgb(153, 50, 204,0.4)",
              // setting the data to the emotial scores we got earlier
              data: this.myEmotionalData,
            },
          ],
        },
        // Make graph responsive in options
        options: {
          responsive: true,
          maintainAspectRatio: true,
        },
      });
      console.log("success");
    },
  },
  created() {
    var _this = this;
    // Fetch data from firebase
    fetch("https://onlinediarycli.firebaseio.com/posts.json")
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        // temporary array
        var diarysArray = [];
        for (let key in data) {
          // setting unique id for each post
          data[key].id = key;
          //console.log(data[key])
          diarysArray.push(data[key]);
        }
        // storing the diary objects local
        _this.diarys = diarysArray;
        // for loop to transfer new data graphs data arrays
        for (var i = 0; i < _this.diarys.length; i++) {
          _this.myEmotionalData.push(_this.diarys[i].slider);
          _this.myDateData.push(_this.diarys[i].date);
        }
        // initialise chart
        _this.makeGraph();
      });
  },
};
</script>
///////////////////////////////////////////////////////////////***STYLES***//////////////////////////////////////////////////////////////////

<style>
.graph {
  grid-area: graph;
}
.menu {
  grid-area: menu;
}
.graph-page {
  width: 100vw;
  height: 100vh;
  display: grid;
  grid-gap: 10px;
  padding: 10px;
  grid-template-columns: 1fr 4.5fr;
  display: grid;

  grid-template-areas: "menu graph";
}

@media screen and (max-width: 900px) {
  .graph-page {
    width: 100vw;
    height: 100vh;
    display: grid;
    grid-gap: 10px;
    padding: 10px;
    grid-template-columns: 0.1fr 4.5fr;
    display: grid;

    grid-template-areas: "menu graph";
  }
}

@media only screen and (max-width: 675px) {
  .graph-page {
    width: 100vw;
    height: 100vh;
    display: grid;
    grid-gap: 10px;
    padding: 10px;
    grid-template-rows: 0.1fr 1fr;
    grid-template-columns: 1fr;
    display: grid;

    grid-template-areas:
      "menu"
      "graph";
  }
}
</style>
