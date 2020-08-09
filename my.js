// initialising new vue app
var app = new Vue({
    el: "#app",
    data: {
        time: null,
        // name shown on dashboard
        Name: "Ben",
        // temporary store for current entry
        message: null,
        // temporary strage for the slider value
        slider: 50,
        // location check
        locate: 0,

        // where saved entries go
        entries: [
            {
                text: 'Had such a great day, cooked dinner and hung out with housemates',
                slider: 98
            }, {
                text: 'Was very cold today so stayed inside, didnt do much',
                slider: 24
            }, {
                text: 'Work work work work work',
                slider: 57
            }
        ]
    },
    methods: {
        // submit diary text and add to front of array
        submit: function () {
            console.log("mybutton");
            if (app.message != null) {
                var newEntry = {
                    text: app.message,
                    slider: app.slider
                    // todo imoplement saving time
                };
                app.entries.unshift(newEntry);
                app.message = null;
            } else {
                alert("Please enter some text before submitting")
            }
        },
        // function that returns formatted time
        displayTime: function () {
            var n = new Date().toLocaleTimeString();
            time = n;
            return time;
        },
        // function that returns formatted date
        displayDate: function () {
            var today = new Date();
            var dd = String(today.getDate()).padStart(2, '0');
            var mm = String(today.getMonth() + 1).padStart(2, '0');
            var yyyy = today.getFullYear();

            today = dd + '/' + mm + '/' + yyyy;
            return today;
        },

        // Function to get location data and display coordinates to user
        showPosition: function () { // only ask for location once
            if (!this.locate) {
                this.locate = 1;
                if (navigator.geolocation) {
                    navigator.geolocation.getCurrentPosition(function (pos) {
                        var posInfo = "Latitude: " + pos.coords.latitude + "," + "\n" + "Longitude: " + pos.coords.longitude;
                        document.getElementById("result").innerHTML = posInfo;
                    });
                } else {
                    alert("Your browser does not support HTML5 geolocation, Sorry");
                }
            }
        },

        // function to show menu items by dynamicly adding styles
        showMenu: function () {
            {
                var z;
                z = window.getComputedStyle(document.querySelector('#menuItems')).display;
                if (z === "block") {
                    document.getElementById("menuItems").style.display = "none";
                } else {
                    document.getElementById("menuItems").style.display = "block";
                }
            }
        }
    }
});
