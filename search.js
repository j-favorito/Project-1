$(document).ready(function () {
    // let stateName = $().val().trim();
    // let brewName = $().val().trim();
    // let zipCode = $().val().trim();

    function renderSearchInfo(brewData) {
        console.log(brewData);
        console.log(brewData[0].name);
        for (let i = 0; i < brewData.length; i++) {
            let brewery = brewData[i];
            breweryCount = i + 1;
            let brewList = $("<ul>");
            let brewAddress = $("<p>");

            let brewPhone = $("<p>");
            let brewUrl = $("<a>");
            brewList.text(brewData[i].name);
            if (brewData[i].street !== "") {
                brewAddress.text(brewData[i].street + ", " + brewData[i].city);

            }; 
            
            brewPhone.text(brewData[i].phone);
            brewUrl.text(brewData[i].website_url);
            brewUrl.attr("href", brewData[i].website_url);
            brewList.append(brewAddress, brewPhone, brewUrl);
            $(".results-field").append(brewList);


        };
    };




    $(".search-btn").on("click", function (e) {
        e.preventDefault();



        let cityName = $(".city-search").val().trim();
        console.log(cityName)
        let city = "?by_city=" + cityName;
        let queryURL = "https://api.openbrewerydb.org/breweries" + city;
        $.ajax({
            url: queryURL,
            method: "GET"
        })
        .then(function (response){
            $(".results-field").empty();
            renderSearchInfo(response);
        })

        

    });








});