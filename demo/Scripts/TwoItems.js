$(document).ready(function () {
    var Transitions = [];
    var TransitionEvents = [];
    var $box1 = $("#box1");
    var $box2 = $("#box2");
    TransitionEvents.push(new $.SParallax.TransitionEvent(function () {
        $box1.css("transform", "scale(1)");
        $box1.css("background", "red");

        $box2.css("transform", "scale(1)");
        $box2.css("background", "green");
    }, function () {
        $box1.css("transform", "scale(2)");
        $box1.css("background", "blue");

        $box2.css("transform", "scale(2)");
        $box2.css("background", "yellow");
    }, 2));
    TransitionEvents.push(new $.SParallax.TransitionEvent(function () {
        $box1.css("transform", "scale(2)");
        $box1.css("background", "blue");

        $box2.css("transform", "scale(2)");
        $box2.css("background", "yellow");
    }, function () {
        $box1.css("transform", "scale(1)");
        $box1.css("background", "red");

        $box2.css("transform", "scale(1)");
        $box2.css("background", "green");
    }, 5));
    Transitions.push(new $.SParallax.Transition("top", 0, 100, "%", $box1, 0, 8));
    Transitions.push(new $.SParallax.Transition("top", 0, 100, "%", $box2, 0, 8));

    Transitions.push(new $.SParallax.Transition("left", 0, 100, "%", $box1, 0, 1));
    Transitions.push(new $.SParallax.Transition("left", 100, 0, "%", $box1, 1, 2));
    Transitions.push(new $.SParallax.Transition("left", 0, 100, "%", $box1, 2, 3));
    Transitions.push(new $.SParallax.Transition("left", 100, 0, "%", $box1, 3, 4));
    Transitions.push(new $.SParallax.Transition("left", 0, 100, "%", $box1, 4, 5));
    Transitions.push(new $.SParallax.Transition("left", 100, 0, "%", $box1, 5, 6));
    Transitions.push(new $.SParallax.Transition("left", 0, 100, "%", $box1, 6, 7));
    Transitions.push(new $.SParallax.Transition("left", 100, 0, "%", $box1, 7, 8));

    Transitions.push(new $.SParallax.Transition("left", 100, 0, "%", $box2, 0, 1));
    Transitions.push(new $.SParallax.Transition("left", 0, 100, "%", $box2, 1, 2));
    Transitions.push(new $.SParallax.Transition("left", 100, 0, "%", $box2, 2, 3));
    Transitions.push(new $.SParallax.Transition("left", 0, 100, "%", $box2, 3, 4));
    Transitions.push(new $.SParallax.Transition("left", 100, 0, "%", $box2, 4, 5));
    Transitions.push(new $.SParallax.Transition("left", 0, 100, "%", $box2, 5, 6));
    Transitions.push(new $.SParallax.Transition("left", 100, 0, "%", $box2, 6, 7));
    Transitions.push(new $.SParallax.Transition("left", 0, 100, "%", $box2, 7, 8));

    Transitions.push(new $.SParallax.Transition("margin-top", 0, -20, "px", $box1, 0, 8));
    Transitions.push(new $.SParallax.Transition("margin-top", 0, -20, "px", $box2, 0, 8));
    $.SParallax(Transitions, TransitionEvents);
});
