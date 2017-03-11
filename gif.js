$(document).ready(function() {

	var topics = ["Kitten", "Puppy", "Bear", "Otter", "Deer", "Piglet", "Hedgehog", "Panda", "Bunny", "Dolphin"];
	var apiKey = "dc6zaTOxFJmzC";


// ajax call to the giphy API and creates gif divs dynamically
	function displayAnimalInfo() {
		var animal = $(this).attr("data-name");
		var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + animal + "&api_key=" + apiKey + "&limit=10&rating"

		$.ajax({
			url: queryURL,
			method: "GET"
		}).done(function(response) {

			$("#animalGifs").empty();
			var results = response.data;

			for (i = 0; i < results.length; i++) {
				var gifDiv = $("<div class='item'>");

				var rating = results[i].rating;

				var p = $("<p>").text("Rating; " + rating);

				var imgGif = $("<img>");
				imgGif.attr("src", results[i].images.fixed_width_still.url);
				imgGif.attr("data-still", results[i].images.fixed_width_still.url);
				imgGif.attr("data-animate", results[i].images.fixed_width.url);
				imgGif.attr("data-state", "still");	
				imgGif.addClass("gif");	
				gifDiv.prepend(p)
				gifDiv.prepend(imgGif);
				$("#animalGifs").prepend(gifDiv);
			}		
		});
	}
 
	//  user clicks on image and gif will animate and pause when clicked again
	$(document.body).on("click", ".gif", function() {
		var state = $(this).attr("data-state");
		if (state === "still") {
	        $(this).attr("src", $(this).attr("data-animate"));
	        $(this).attr("data-state", "animate");
      	} else {
	        $(this).attr("src", $(this).attr("data-still"));
	        $(this).attr("data-state", "still");
      	}
	});
	
	// renders buttons on page load and when user inputs new animal 
	function renderButtons() {
		$("#animalButtons").empty();
		for (var i = 0; i < topics.length; i++) {
			var a = $("<Button>");
			a.addClass("animal btn btn-default");
			a.attr("data-name", topics[i]);
			a.text(topics[i]);
			$("#animalButtons").append(a);
		}
	}

	// prevents the submit button from creating a new button with an empty field
	$("#addAnimal").prop('disabled',true);
    $("#animal-input").keyup(function(){
        $("#addAnimal").prop('disabled', this.value == "" ? true : false);     
    })

    // adds a new animal button when user enters an animal in text field
	$("#addAnimal").on("click", function(event) {	
			event.preventDefault();
			var animal = $("#animal-input").val().trim();
			topics.push(animal);
			renderButtons();
			$("input:text").val("");
	});

	// event listener for the animal buttons which will display gifs when animal button is clicked
	$(document).on("click", ".animal", displayAnimalInfo);

	// call function to render buttons on page load
	renderButtons();

});