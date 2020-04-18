$(document).ready(function () {
    var locations = [];
    var labels = [];
    let saveData = [];
    let favoriteData = [];

    //function to create brewery list
    function renderSearchInfo(brewData) {
        saveData = [];
        let k = 0;
        let j = 0;
        let rowElement = $("<div>");
        rowElement.addClass("pure-g");
        let mapElement = $("<div>");
        mapElement.attr("id", "map");
        $(".results-field").append(mapElement, rowElement);
        for (let i = 0; i < brewData.length; i++) {
            if (brewData[i].street !== "" && brewData[i].city == $(".city-search").val().trim()) {
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
                    id: "button_" + j
                })
                if (brewData[i].latitude !== null) {
                    locations[k] = { lat: parseFloat(brewData[i].latitude), lng: parseFloat(brewData[i].longitude) }
                    let num = j + 1;
                    labels[k] = num.toString();
                    k += 1;
                }
                let brewInfo = {
                    name: brewData[i].name,
                    address: "Address: " + brewData[i].street + ", " + brewData[i].city,
                    phone: "Phone Number: " + brewData[i].phone,
                    url: brewData[i].website_url,
                    type: "Brewery Type: " + brewData[i].brewery_type
                }
                saveData.push(brewInfo);
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
        initMap();
        for (let i = 0; i < j; i++) {
            save(i);
        };
    };
    //placeholder center of map
    let locationLat = 39.8283;
    let locationLng = -98.5795;

    //this is for diplaying map
    function initMap() {
        var options = {
            zoom: 10,
            center: { lat: locationLat, lng: locationLng }
        }
        //new map
        console.log("this is Map function")
        var map = new
            google.maps.Map(document.getElementById("map"), options);

        var markers = locations.map(function (location, i) {
            return new google.maps.Marker({
                position: location,
                label: labels[i % labels.length]
            });
        });

        // Add a marker clusterer to manage the markers.
        var markerCluster = new MarkerClusterer(map, markers,
            { imagePath: "https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m" });
    }
    //executes ajax call on button press
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
            method: "GET",
            async: false
        }).then(function (response) {
            locationLat = response.results[0].geometry.location.lat
            locationLng = response.results[0].geometry.location.lng
        });


        //sends city name to brewery api
        let cityName = $(".city-search").val().trim();
        let city = "?by_city=" + cityName;
        let queryURL = "https://api.openbrewerydb.org/breweries" + city;
        $.ajax({
            url: queryURL,
            method: "GET"
        })
            .then(function (response) {
                renderSearchInfo(response);
            })
    });

    //save function
    function save(button) {
        $("#button_" + button).on("click", function () {
            let storedData = JSON.parse(localStorage.getItem("favorites"));
            if (storedData !== null) {
                favoriteData = storedData;
            }
            favoriteData.push(saveData[button]);



            localStorage.setItem("favorites", JSON.stringify(favoriteData));
        });
    };

    //creates favorite page on button click
    $(".favorite-btn").on("click", function () {
        $(".results-field").empty();
        let storedData = JSON.parse(localStorage.getItem("favorites"));
        let rowElement = $("<div>");
        rowElement.addClass("pure-g");
        $(".results-field").append(rowElement);
        for (let i = 0; i < storedData.length; i++) {
            let brewList = $("<ul>");
            let brewName = $("<h3>");
            let brewAddress = $("<p>");
            let brewPhone = $("<p>");
            let brewType = $("<p>");
            let brewUrl = $("<a>");
            brewName.text(storedData[i].name);
            brewAddress.text(storedData[i].address);
            brewPhone.text(storedData[i].phone);
            brewType.text(storedData[i].type);
            brewUrl.text(storedData[i].url);
            brewUrl.attr("href", storedData[i].url);
            brewList.append(brewName, brewAddress, brewPhone, brewType, brewUrl);
            brewList.addClass("brew-list");
            brewList.addClass("pure-u-1");
            rowElement.append(brewList);
        }

    });
    //allows you to go to start page on jumbotron click
    $(".jumbo").on("click", function () {
        $(".city-question").empty();
        $(".results-field").empty();
        let h2Element = $("<h2>");
        h2Element.addClass("city-question");
        h2Element.text("What city are you in?");
        $(".results-field").append(h2Element);
    })

});