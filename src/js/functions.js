/* Joakim Rosqvist - Mittuniversitetet - 2019 */

let animationEvent = 'webkitAnimationEnd oanimationend msAnimationEnd animationend';
// Lägger till och tar bort klassen on från lägg till-diven
$('.add-button').click(function () {
    // Lägger till on-klassen
    $("#added-div").addClass('on');
    // Tar bort klassen efter animationseventet är slut
    $("#added-div").one(animationEvent, function (event) {
        $("#added-div").removeClass('on')
    });
});

// Lägger till och tar bort klassen on från uppdatera-diven
$('.form-update-button').click(function () {
    // Lägger till on-klassen
    $("#updated-div").addClass('on');
    // Tar bort klassen efter animationseventet är slut
    $("#updated-div").one(animationEvent, function (event) {
        $("#updated-div").removeClass('on')
    });
});