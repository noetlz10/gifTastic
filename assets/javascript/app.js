var topics = ["Cristiano Ronaldo", "Eden Hazard", "Lebron James", "Dez Bryant", "Michael Jordan", "Tim Duncan"];
var gifKey = "&api_key=dc6zaTOxFJmzC";
var gInput = "";
var rating = "";

//Functions
//===============================================
// Render the buttons before the document is loaded so they can appear on the page at initial load
function renderButtons() {


    for (var i = 0; i < topics.length; i++) {
        var gifButtons = $("<button>");
        gifButtons.addClass("btn btn-primary gifButtons");
        gifButtons.attr("data-name", topics[i]);
        gifButtons.text(topics[i]);
        $("#buttons").append(gifButtons);
        //console.log(gifButtons);

    }
}

// Start the document ready function and run the code
$(document).ready(function() {
    renderButtons();


    $("#addButton").on("click", function(event) {
        event.preventDefault();
        //console.log("you cliked me!");
        gInput = $("#buttonInput").val().trim();

        var newButton = $("<button>");
        newButton.addClass("btn btn-primary gifButtons newBtn");
        newButton.attr("data-name", gInput);
        newButton.text(gInput);
        $("#buttons").append(newButton);
        $("#buttonInput").val("");//clears the context in the textbox

    });

    $("body").on("click", "button", function() {
        //console.log("this new gif button was clicked!");
        $("#gifsAppear").empty();
        var searchInput = $(this).attr("data-name");
        //URL to search Giphy API
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
            searchInput + "&api_key=dc6zaTOxFJmzC&limit=10";
        //Performing our AJAX GET request
        $.ajax({
                url: queryURL,
                method: "GET"
            })
            // After the data comes back from the API
            .done(function(response) {
                //Store the array of results in the results variable
                var results = response.data;

                // Looping over every result item
                for (var i = 0; i < results.length; i++) {

                    //only takes action if the photo has an appropriate rating
                    if (results[i].rating !== "r" && results[i].rating !== "pg-13") {
                        //Create div with the class "yourGif"
                        var gifDiv = $("<div class='yourGif'>");

                        //Storing the result of yourGif"s rating
                        var rating = results[i].rating;

                        //Creating paragraph tag with the result yourGif"s rating
                        var p = $("<p>").text("Rating: " + rating);

                        // Creating an image tag &
                        // Giving the image tag an src attribute of a property pulled off
                        // the yourGif result

                        var gifImage = $("<img>");
                        gifImage.attr("src", results[i].images.fixed_height_still.url);
                        gifImage.attr("data-state", "still");
                        gifImage.attr("data-still", results[i].images.fixed_height_still.url);
                        gifImage.attr("data-animate", results[i].images.fixed_height.url);
                        gifImage.addClass("gifImages");

                        //Appending the paragraph and gifImage we created to the "gifDiv" div 
                        // we created
                        gifDiv.append(p);
                        gifDiv.append(gifImage);

                        //Prepending the gifDiv to the "#gifsAppear" div in the HTML
                        $("#gifsAppear").prepend(gifDiv);
                    }
                }
            });
    });

    $("body").on("click", ".gifImages", function(event) {


        var imgState = $(this).attr("data-state");
        if (imgState == "still") {
            $(this).attr("src", $(this).data("animate"));
            $(this).attr("data-state", "animate");
        } else {
            $(this).attr("src", $(this).data("still"));
            $(this).attr("data-state", "still");
        }
    });

    //Clears the most recent buttons
    $("#clearButton").on("click", function() {
    $("#buttons").empty();
    renderButtons();
});

}); //dom close
