$(document).ready(function() {
    let cityName = $().val().trim();
    let stateName = $().val().trim();
    let brewName = $().val().trim();
    let zipCode = $().val().trim();
    
    

    $().on("click", function(){
        let queryURL = "https://api.openbrewerydb.org/breweries";
        let city = "?by_city="
        $.ajax({
            url: queryURL,
            method: "GET"
        })
        .then(function(response){
            console.log(response);
        });

    })

    





});