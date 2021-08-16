$(document).ready(function () {
    var Transitions = [];
    var TransitionEvents = [];
    var $box = $("#box1")
    TransitionEvents.push(new $.SParallax.TransitionEvent(function () {
        $box.css("transform", "scale(1)");
        $box.css("background", "red");
    }, function () {
        $box.css("transform", "scale(2)");
        $box.css("background", "blue");
    }, 2));
    TransitionEvents.push(new $.SParallax.TransitionEvent(function () {
        $box.css("transform", "scale(2)");
        $box.css("background", "blue");
    }, function () {
        $box.css("transform", "scale(1)");
        $box.css("background", "red");
    }, 5));
    Transitions.push(new $.SParallax.Transition("top", 0, 100, "%", $box, 0, 8));
    Transitions.push(new $.SParallax.Transition("left", 0, 100, "%", $box, 0, 1));
    Transitions.push(new $.SParallax.Transition("left", 100, 0, "%", $box, 1, 2));
    Transitions.push(new $.SParallax.Transition("left", 0, 100, "%", $box, 2, 3));
    Transitions.push(new $.SParallax.Transition("left", 100, 0, "%", $box, 3, 4));
    Transitions.push(new $.SParallax.Transition("left", 0, 100, "%", $box, 4, 5));
    Transitions.push(new $.SParallax.Transition("left", 100, 0, "%", $box, 5, 6));
    Transitions.push(new $.SParallax.Transition("left", 0, 100, "%", $box, 6, 7));
    Transitions.push(new $.SParallax.Transition("left", 100, 0, "%", $box, 7, 8));
    Transitions.push(new $.SParallax.Transition("margin-top", 0, -20, "px", $box, 0, 8));
    $.SParallax(Transitions, TransitionEvents);
});
