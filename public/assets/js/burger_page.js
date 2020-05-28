// Make sure we wait to attach our handlers until the DOM is fully loaded.
$(function () {
    // Create burger form
    $(".create-form").on("submit", function (event) {
        event.preventDefault();

        let newBurger = {
            // Value for burger_name column is id="burger" textarea
            burger_name: $("#burger").val().trim(),
            // Default to checked?????
            devoured: 0
        };

        // Send the POST request.
        $.ajax("/api/burgers", {
            type: "POST",
            data: newBurger
        }).then(
            function () {
                console.log("Created new burger");
                // Reload the page to get the updated list
                // location.reload();
            }
        );
    });
});
