$(document).ready(function() {
    // let stateName = $().val().trim();
    // let brewName = $().val().trim();
    // let zipCode = $().val().trim();
    
    function renderSearchInfo (brewData) {
        console.log(brewData);
        console.log(brewData[0].name);
        for (let i = 0; i < brewData.length; i++) {
            let brewery = brewData[i];
            breweryCount = i + 1; 
            let brewList = $("<ul>");
            

        };
    };
        
    
    
    
    $("#submit").on("click", function(e){
        e.preventDefault();
        
        let cityName = $("#city").val().trim();
        console.log(cityName)
        let city = "?by_city=" + cityName;
        let queryURL = "https://api.openbrewerydb.org/breweries" + city;
        $.ajax({
            url: queryURL,
            method: "GET"
        })
        .then(renderSearchInfo);

    });


    





});