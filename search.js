$(document).ready(function () {
    // let stateName = $().val().trim();
    // let brewName = $().val().trim();
    // let zipCode = $().val().trim();

    function renderSearchInfo(brewData) {
        console.log(brewData);
        console.log(brewData[0].name);
        let j = 0;
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
                j += 1;
                brewName.text(j + ". " + brewData[i].name);
                brewAddress.text("Address: " + brewData[i].street + ", " + brewData[i].city);
                brewPhone.text("Phone Number: " + brewData[i].phone);
                brewUrl.text(brewData[i].website_url);
                brewType.text("Brewery Type: " + brewData[i].brewery_type);
                brewUrl.attr("href", brewData[i].website_url);
                brewList.append(brewName, brewAddress, brewPhone, brewType, brewUrl);
                brewList.addClass("brew-list");
                brewList.addClass("pure-u-1");
                $(rowElement).append(brewList);
            }

        };
    };
    
    let locationLat = 33.4494
    let locationLng = -112.0740
    //this is for diplaying map
    function initMap() {
        var options = {
            zoom: 4,
            center: { lat: 37.0902, lng: -95.7129 }
        }
        //new map
        var map = new
            google.maps.Map(document.getElementById("map"), options);
        var marker = new google.maps.Marker({
            position: { lat: locationLat, lng: locationLng },
            map: map
        })
    }





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
            initMap();
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



    });








});