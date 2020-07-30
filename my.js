var app = new Vue(
    {
        el: "#app",
        data: 
        {
            // name shown on dashboard
            Name: "Ben",
            entries: [
                { text: 'best day eveeevvrrryyy' },
                { text: 'baddaY' },
                { text: 'okday', }
            ]
        },
        methods: {

           displayDate: function () {
           
           // Add formatted timestamp to home page
            var today = new Date();
            var dd = String(today.getDate()).padStart(2, '0');
            var mm = String(today.getMonth() + 1).padStart(2, '0');
            var yyyy = today.getFullYear();
      
                  today = dd + '/' + mm + '/' + yyyy;
            return today;
          },

          // Function to get location data and display coordinates to user
          showPosition: function() {
            if(navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(function(pos) {
                    var posInfo = "Latitude: " + pos.coords.latitude + ","+"\n" + "Longitude: " + pos.coords.longitude;
                    document.getElementById("result").innerHTML = posInfo;

                });
            } else {
                alert("Your browser does not support HTML5 geolocation, Sorry");
            }
        },
        showMenu: function(){
            console.log("hello");
            {
                var x = document.getElementById("menuItems");
            
                x = window.getComputedStyle(document.querySelector('#menuItems')).display;
             console.log(x);
                if (x === "block") {
                    console.log("true");
                    document.getElementById("menuItems").style.display = "none";
             
            
                } else {
                    document.getElementById("menuItems").style.display = "block";
            
                }}
        }

    }
}
);

// TODO Change this horrible mess


  
