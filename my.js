// initialising new vue app
Vue.filter('capitalize', function (value) {
    if (! value) 
        return ''
    value = value.toString()
    return value.charAt(0).toUpperCase() + value.slice(1)
})

// initialising new vue app
Vue.component('nav-menu', {
    template: `<div class="menu">
        <!-- menu Title  -->
        <h2 class="menuTitle">The Online Diary</h2>
        <!-- Hamburger menu button with javascript method showMenu() -->
        <a v-on:click="menuOpenState = !menuOpenState" class="icon">
            <i class="fa fa-bars"></i>
        </a>
        <!-- items in menu nav -->
        <div v-bind:class="{open: menuOpenState}">
            <li><i class="fas fa-search"></i><input class="search" type="text" placeholder="Search"></a></li>
            <li><i class="fas fa-home"></i><a href="index.html">Home</a></li>
            <li><i class="fas fa-book-open"></i><a href="All.html">All Entries</a></li>
            <li><i class="fas fa-chart-line"></i><a href="Graph.html">Graphs</a></li>
        </div>
    </div>`,
    data: function () {
        return {menuOpenState: true}
    }
})

Vue.component('weather-block', {
    template: `
    <div class="weather block">
        <h3>Weather</h3>
        <p id="result">Loading Location...{{showPosition()}}</p>
        <img src="partly_cloudy.png" alt="">
    </div>
    `,
    data: function () {

        return {name: 'yoshi'}
    },
    methods: {
        showPosition: function () {
            var self = this; // only ask for location once
            if (!this.locate) {
                this.locate = 1;
                if (navigator.geolocation) {
                    navigator.geolocation.getCurrentPosition(function (pos) { // self.getWeather(pos.coords.latitude,pos.coords.longitude);
                    });
                } else {
                    alert("Your browser does not support HTML5 geolocation, Sorry");
                }
            }
        },

        getWeather: function (lat, long) {
            var length = 9;
            var newlat = String(lat).substring(0, length);
            var newlong = String(long).substring(0, length);
            let endpoint = "https://api.openweathermap.org/data/2.5/onecall?lat=" + newlat + "&lon=" + newlong + "&appid=a3c703c79a312c2137c274a3473aac43"

            fetch(endpoint).then(function (response) {
                return response.json();
            }).then(function (data) {
                var temp = Math.round(data.current.temp - 273.15);
                document.getElementById("result").innerHTML = temp + "C";
            })
        }
    }
})

Vue.component('main-welcome-block', {
    props: ['name'],
    template: `
        <div class="main block">
            <h1 class="mainTitle">Hello {{ name }},</h1>
            <h3>The Time is {{displayTime}} and Todays Date is {{displayDate}}</h3>
        </div>
    `,
    data: function () {
        // TODO MAKE THIS GET NAME FROM ROOT APP not hardcoded
        return {Name: 'Ben'}
    },
    computed: {
        displayTime: function () {
            var n = new Date();
            var string = n.toLocaleTimeString([], {timeStyle: 'short'});
            return string;
        },
        displayDate: function () {
            var today = new Date();
            var dd = String(today.getDate()).padStart(2, '0');
            var mm = String(today.getMonth() + 1).padStart(2, '0');
            var yyyy = today.getFullYear();
            today = dd + '/' + mm + '/' + yyyy;
            return today;
        },
    },
    methods: {
        changeName: function () {
            this.name = 'mario'
        }
    }
})





Vue.component('quote-block', {
    template: `
    <div class="quote block">
                <h3>Quote of the day</h3>
                <div class="quoteContainer">
                    <p id="quoteText" class="quoteText">"Loading Quote {{displayQuote}}"</p>
                </div>
            </div>
    `,
    data: function () {
        return {name: 'yoshi'}
    },
    computed: {
        displayQuote: function () {
            // fetch("https://quotes.rest/qod?language=en").then(function (response) {
            //         return response.json();
            //     }).then(function (data) {
            //         console.log(data.contents.quotes[0].quote);

            //         document.getElementById("quoteText").innerHTML = data.contents.quotes[0].quote;
            //     });
        },
    },
    methods: {
        changeName: function () {
            this.name = 'mario'
        }
    }
})





Vue.component('greeting2', {
    template: '<p> hey im component  {{name}}. <button v-on:click="changeName"> change name </button><</p>',
    data: function () {
        return {name: 'yoshi'}
    },
    methods: {
        changeName: function () {
            this.name = 'mario'
        }
    }
})

Vue.component('previous-entries-block', {
    template: `
    <div class="previous block">
    <h3>Previous Entries</h3>
    <div class="previousEntriesContainer">
        <!-- will iterate through all entries in diary and render them -->
        <div v-for="entry in entries">
            <p class="previousEntry">{{ entry.text | capitalize }} <br> emotional score = {{entry.slider}}</p>
        </div>
    </div>
</div>
    `,
})

var app = new Vue({
    el: "#app",
    data: {
        time: null,
        // name shown on dashboard
        Name: "Ben",
        // temporary store for current entry
        message: '',
        // temporary strage for the slider value
        slider: 50,
        // location check
        locate: 0,
        state: "edit",
        menuOpenState: true,

        // where saved entries go
        entries: [
            {
                text: 'Had such a great day, cooked dinner and hung out with housemates',
                slider: 98,
                date: "10/08/20"
            },
            {
                text: 'Was very cold today so stayed inside, didnt do much',
                slider: 24,
                date: "13/08/20"
            },
            {
                text: 'Work work work work work',
                slider: 57,
                date: "16/08/20"
            },
            {
                text: 'Work work work work work',
                slider: 67,
                date: "20/08/20"
            }, {
                text: 'Was very cold today so stayed inside, didnt do much',
                slider: 24,
                date: "13/08/20"
            }, {
                text: 'Work work work work work',
                slider: 57,
                date: "16/08/20"
            }, {
                text: 'Work work work work work',
                slider: 78,
                date: "20/08/20"
            }, {
                text: 'Was very cold today so stayed inside, didnt do much',
                slider: 90,
                date: "13/08/20"
            }, {
                text: 'Work work work work work',
                slider: 57,
                date: "16/08/20"
            }, {
                text: 'Work work work work work',
                slider: 67,
                date: "20/08/20"
            },
        ]
    },
    computed: {
        inputCharacterCount() {
            return this.message.length;
        },
        displayTime: function () {
            var n = new Date().toLocaleTimeString();
            time = n;
            return time;
        }
    },
    methods: {
        // submit diary text and add to front of array
        submit: function () { // console.log(submit);
            if (app.message.length != 0) {
                var newEntry = {
                    text: app.message,
                    slider: app.slider,
                   
                    // todo imoplement saving time
                };
                app.entries.unshift(newEntry);
                app.message = '';

                this.changeState("normal");
            } else {
                alert("Please enter some text before submitting")
            }
        },
        changeState: function (newState) {
            this.state = newState
        },
        // function that returns formatted time

        // function that returns formatted date

        // old quote api
        // "https://type.fit/api/quotes"

        // displayQuote: function () {

        //     // this.getWeather();
        //     // fetch("https://quotes.rest/qod?language=en").then(function (response) {
        //     //         return response.json();
        //     //     }).then(function (data) {
        //     //         // console.log(data.contents);

        //     //         // document.getElementById("quoteText").innerHTML = '"' + data[key].text + '"';
        //     //     });
        // },

        // // Function to get location data and display coordinates to user
        // showPosition: function () { // only ask for location once
        //     if (!this.locate) {
        //         this.locate = 1;
        //         if (navigator.geolocation) {
        //             navigator.geolocation.getCurrentPosition(function (pos) {
        //                 var posInfo = "Latitude: " + pos.coords.latitude + "," + "\n" + "Longitude: " + pos.coords.longitude;

        //                 //this.app.getWeather(pos.coords.latitude,pos.coords.longitude);

        //             });
        //         } else {
        //             alert("Your browser does not support HTML5 geolocation, Sorry");
        //         }
        //     }

        // },

        // getWeather: function(lat,long)
        // {
        //     var length = 9;
        //     var newlat = String(lat).substring(0,length);
        //     var newlong =  String(long).substring(0,length);
        //     let endpoint = "https://api.openweathermap.org/data/2.5/onecall?lat="+newlat+"&lon="+ newlong+ "&appid=a3c703c79a312c2137c274a3473aac43"

        //     fetch(endpoint).then(function (response) {
        //                 return response.json();
        //             }).then(function (data) {
        //                 var temp = Math.round(data.current.temp -273.15);
        //                 document.getElementById("result").innerHTML = temp + "C";
        //             }
        //         )
        // },

        beforeMount() { // this.displayQuote()
            AddData();
        }
    }
});




var myEmotionalData = [];
var myDateData = [];

// adding the emotional score and date into arrays for graph to use
function AddData() {
    var i;
    for (i = 0; i < app.entries.length; i++) {
        myEmotionalData.push(app.entries[i].slider);
        myDateData.push(app.entries[i].date);
    }
}
AddData();

// var ctx = document.getElementById('myChart');
// var chart = new Chart(ctx, {
//     type: 'line',
//     data: {
//         // setting the x asis to be the date of entry
//         labels: myDateData,
//         datasets: [
//             {
//                 label: 'Emotion',
//                 backgroundColor: 'rgb(255, 99, 132,0.1)',
//                 borderColor: 'rgb(153, 50, 204,0.4)',
//                 // setting the data to be the emotional scores array
//                 data: myEmotionalData
//             }
//         ]
//     },
//     // Configuration options go here
//     options: {}
// });
