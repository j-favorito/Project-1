$(document).ready(function () {
    // let stateName = $().val().trim();
    // let brewName = $().val().trim();
    // let zipCode = $().val().trim();

    function renderSearchInfo(brewData) {
        console.log(brewData);
        console.log(brewData[0].name);
        for (let i = 0; i < brewData.length; i++) {
            if (brewData[i].street !== "") {
                let rowElement = $("<div>");
                rowElement.addClass("pure-g");
                $(".results-field").append(rowElement);
                let brewery = brewData[i];
                breweryCount = i + 1;
                let brewList = $("<ul>");
                let brewName = $("<h3>");
                let brewAddress = $("<p>");
                let brewPhone = $("<p>");
                let brewUrl = $("<a>");
                brewName.text(brewData[i].name);
                brewAddress.text(brewData[i].street + ", " + brewData[i].city);

                brewPhone.text(brewData[i].phone);
                brewUrl.text(brewData[i].website_url);
                brewUrl.attr("href", brewData[i].website_url);
                brewList.append(brewName, brewAddress, brewPhone, brewUrl);
                brewList.addClass("brew-list");
                brewList.addClass("pure-u-1-4")
                $(rowElement).append(brewList);
            }

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
            .then(function (response) {
                $(".results-field").empty();
                renderSearchInfo(response);
            })



    });








});