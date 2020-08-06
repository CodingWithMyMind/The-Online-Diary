var app = new Vue({
    el: "#app",
    data: {
        time: null,
        // name shown on dashboard
        Name: "Ben",
        message: null,
        entries: [
            {
                text: 'Had such a great day, cooked dinner and hung out with housemates'
            }, {
                text: 'Was very cold today so stayed inside, didnt do much'
            }, {
                text: 'Work work work work work'
            }
        ]
    },
    methods: {
        submit: function () {
            console.log("mybutton");
            if(app.message != null){
                var newEntry = {
                text: app.message
                };
                app.entries.unshift(newEntry);
                app.message = null;
            }
        },
        displayTime: function () {

            var n = new Date().toLocaleTimeString();
            time = n;
                // jj
            return time;
        },

        displayDate: function () { // Add formatted timestamp to home page
            var today = new Date();
            var dd = String(today.getDate()).padStart(2, '0');
            var mm = String(today.getMonth() + 1).padStart(2, '0');
            var yyyy = today.getFullYear();

            today = dd + '/' + mm + '/' + yyyy;
            return today;
        },

        // Function to get location data and display coordinates to user
        showPosition: function () {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(function (pos) {
                    var posInfo = "Latitude: " + pos.coords.latitude + "," + "\n" + "Longitude: " + pos.coords.longitude;
                    document.getElementById("result").innerHTML = posInfo;
                });
            } else {
                alert("Your browser does not support HTML5 geolocation, Sorry");
            }
        },

        showMenu: function () {
            {
                var x;
                x = window.getComputedStyle(document.querySelector('#menuItems')).display;
                if (x === "block") {
                    document.getElementById("menuItems").style.display = "none";
                } else {
                    document.getElementById("menuItems").style.display = "block";
                }
            }
        }
    }
});
