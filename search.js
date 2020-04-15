$(document).ready(function () {
    // let stateName = $().val().trim();
    // let brewName = $().val().trim();
    // let zipCode = $().val().trim();
    var locations = [];
    var labels = [];

    function renderSearchInfo(brewData) {
        console.log(brewData);
        console.log(brewData[0].name);
        let j = 0;
        let k = 0;
        let rowElement = $("<div>");
        rowElement.addClass("pure-g");
        let mapElement = $("<div>");
        mapElement.attr("id", "map");
        $(".results-field").append(mapElement, rowElement);
        for (let i = 0; i < brewData.length; i++) {
            if (brewData[i].street !== "") {
                let brewery = brewData[i];
                breweryCount = i + 1;
                let brewList = $("<ul>");
                let brewName = $("<h3>");
                let brewAddress = $("<p>");
                let brewPhone = $("<p>");
                let brewType = $("<p>")
                let brewUrl = $("<a>");
                let favButton = $("<button>");
                favButton.text("Add to Favorites");
                favButton.attr({
                    class: "pure-button fav-button",
                    index: j
                })
                if(brewData[i].latitude!==null){
                locations[k] = { lat: parseFloat(brewData[i].latitude), lng: parseFloat(brewData[i].longitude) }
                k+=1;
                labels.push(k);
                }
                j += 1;
                brewName.text(j + ". " + brewData[i].name);
                brewAddress.text("Address: " + brewData[i].street + ", " + brewData[i].city);
                brewPhone.text("Phone Number: " + brewData[i].phone);
                brewUrl.text(brewData[i].website_url);
                brewType.text("Brewery Type: " + brewData[i].brewery_type);
                brewUrl.attr("href", brewData[i].website_url);
                brewList.append(brewName, brewAddress, brewPhone, brewType, brewUrl, favButton);
                brewList.addClass("brew-list");
                brewList.addClass("pure-u-1");
                $(rowElement).append(brewList);
            }
        };
        console.log(locations);
        initMap();
    };

    let locationLat = 33.4494
    let locationLng = -112.0740
    //this is for diplaying map
    function initMap() {
        var options = {
            zoom: 12,
            center: { lat: locationLat, lng: locationLng }
        }
        //new map
        var map = new
            google.maps.Map(document.getElementById("map"), options);

            var markers = locations.map(function (location , i) {
                console.log(location);
                return new google.maps.Marker({
                    position: location,
                    label: labels[i % labels.length]
                });
            });
        
            // Add a marker clusterer to manage the markers.
            var markerCluster = new MarkerClusterer(map, markers,
                );
    }

    // Add some markers to the map.
    // Note: The code uses the JavaScript Array.prototype.map() method to
    // create an array of markers based on a given "locations" array.
    // The map() method here has nothing to do with the Google Maps API.







    $(".search-btn").on("click", function (e) {
        e.preventDefault();
        $(".city-question").empty();
        $(".results-field").empty();

        //api keys 
        var apiKey = "AIzaSyDmKB_PsZA-oY2nOAY-ENH8huGsjSKh3rQ";
        let searchTerms = $(".city-search").val();
        let corsUrl = "https://cors-anywhere.herokuapp.com/"
        var queryUrl = "https://maps.googleapis.com/maps/api/place/textsearch/json?query=" + searchTerms + "&key=" + apiKey
        //ajax call 
        $.ajax({
            url: queryUrl,
            method: "GET"
        }).then(function (response) {
            console.log(response)
            locationLat = response.results[0].geometry.location.lat
            locationLng = response.results[0].geometry.location.lng
        });



        let cityName = $(".city-search").val().trim();
        console.log(cityName)
        let city = "?by_city=" + cityName;
        let queryURL = "https://api.openbrewerydb.org/breweries" + city;
        $.ajax({
            url: queryURL,
            method: "GET"
        })
            .then(function (response) {
                renderSearchInfo(response);
            })
            //local storage

            // let text = $(".search-btn").text();
            // localStorage.setItem("search-btn", text);
            // alert(localStorage.getItem("search-btn"));
        

    });

    // function addFav(){
    //     $.ajax({
    //       url: "/favorites/add",
    //       data: {"id": articleID},
    //       success: function(){
    //            $('a#fav')
    //                  .addClass('active')
    //                  .attr('title','[-] Remove from favorites')
    //                  .unbind('click')
    //                  .bind('click', removeFav)
    //            ;
    //       }
    //     });
    // }
    
    // function removeFav(){
    //     $.ajax({
    //       url: "/favorites/remove",
    //       data: {"id": articleID},
    //       success: function(){
    //             $('a#fav')
    //                  .removeClass('active')
    //                  .attr('title','[+] Add as favorite')
    //                  .unbind('click')
    //                  .bind('click', addFav)
    //             ;
    //       }
    //     });
    // }
    
    //this will make the link listen to function addFav (you might know this already)
    // $('a#fav').bind('click', addFav);
});