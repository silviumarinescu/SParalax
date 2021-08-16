$(document).ready(function () {
    var Transitions = [];
    var TransitionEvents = [];
    var $box = $("#box1");
    TransitionEvents.push(new $.SParallax.TransitionEvent(function () {
        $box.css("background", "red");
    }, function () {
        $box.css("background", "blue");
    }, 4));
    TransitionEvents.push(new $.SParallax.TransitionEvent(function () {
        $box.css("background", "blue");
    }, function () {
        $box.css("background", "red");
    }, 5));
    Transitions.push(new $.SParallax.Transition("top", 0, 100, "%", $box, 0, 8));
    Transitions.push(new $.SParallax.Transition("margin-top", 0, -20, "px", $box, 0, 8));
    $.SParallax(Transitions, TransitionEvents);
});