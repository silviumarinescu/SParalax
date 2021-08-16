//region helper functions
function FitImage(ImageToFit) {
    var TheRatio = 0;
    ImageToFit.obj.style.position = "absolute";
    if ($(ImageToFit.obj).parent().innerHeight() / ImageToFit.height > $(ImageToFit.obj).parent().innerWidth() / ImageToFit.width) {
        TheRatio = $(ImageToFit.obj).parent().innerHeight() / ImageToFit.height;
        ImageToFit.obj.style.left = (-1 * Math.abs(($(ImageToFit.obj).parent().innerWidth() - (TheRatio * ImageToFit.width)) / 2)) + "px";
        ImageToFit.obj.style.top = "0px";
    }
    else {
        TheRatio = $(ImageToFit.obj).parent().innerWidth() / ImageToFit.width;
        ImageToFit.obj.style.top = (-1 * Math.abs(($(ImageToFit.obj).parent().innerHeight() - (TheRatio * ImageToFit.height)) / 2)) + "px";
        ImageToFit.obj.style.left = "0px";
    }
    var NewW = (TheRatio * ImageToFit.width) + "px";
    var NewH = (TheRatio * ImageToFit.height) + "px";

    ImageToFit.obj.style.width = NewW;
    ImageToFit.obj.style.height = NewH;
}
function StretchImg(obj, width, height) {
    this.obj = obj;
    this.width = width;
    this.height = height;
}
function DoFitImage(selector) {
    $(selector).each(function () {
        if (this.complete)
            FitImage(new StretchImg(this, this.width, this.height));
        else
            this.onload = function () {
                FitImage(new StretchImg(this, this.width, this.height));
            }
    });
}
function getRandom(from, to) {
    return Math.floor((Math.random() * to) + from);
}
function FitMainImages(){
    $(".MainImageHolder").each(function () {
        $(this).height($(window).height());
    });
    DoFitImage(".MainImageHolder > img");
}
//endregion
$(document).ready(function () {
    FitMainImages();
    //region SParallax Usage
    var Transitions = [];
    var TransitionEvents = [];

    var $bouble = $("#bauble");
    var $boubleText = $("#bauble > span");
    var $snowContainer = $("#snowContainer");
    var $MainImage1 = $("#MainImage1");
    var $MainImage2 = $("#MainImage2");
    var $MainImage3 = $("#MainImage3");
    var $MainImage4 = $("#MainImage4");
    var $MainImage5 = $("#MainImage5");
    var snowArray = [];
    for (var i = 1; i <= 15; i++) {
        snowArray.push($("#snow" + i));
    }

    TransitionEvents.push(new $.SParallax.TransitionEvent(function () {
        $boubleText.html("Gifts to the world");
        $bouble.css({"color": "#29264E", "background": "#64BD4F"});

    }, function () {
        $boubleText.html("Since it started to snow");
        $bouble.css({"color": "#404040", "background": "#82AFF9"});
    }, 0.5));

    TransitionEvents.push(new $.SParallax.TransitionEvent(function () {
        $boubleText.html("Since it started to snow");
        $bouble.css({"color": "#404040", "background": "#82AFF9"});
    }, function () {
        $boubleText.html("Candy cane from santa");
        $bouble.css({"color": "#000", "background": "#FF5732"});
    }, 2.5));


    TransitionEvents.push(new $.SParallax.TransitionEvent(function () {
        $boubleText.html("Candy cane from santa");
        $bouble.css({"color": "#000", "background": "#FF5732"});
    }, function () {
        $boubleText.html("Frosty the snowman");
        $bouble.css({"color": "#82AFF9", "background": "#29264E"});
    }, 4.5));


    TransitionEvents.push(new $.SParallax.TransitionEvent(function () {
        $boubleText.html("Frosty the snowman");
        $bouble.css({"color": "#F9D08B", "background": "#29264E"});
    }, function () {
        $boubleText.html("Gather round the christmas tree");
        $bouble.css({"color": "#000", "background": "#F97D81"});
    }, 6.5));


    TransitionEvents.push(new $.SParallax.TransitionEvent(function () {
        $snowContainer.show()
    }, function () {
        $snowContainer.hide()
    }, 1));

    TransitionEvents.push(new $.SParallax.TransitionEvent(function () {
        $snowContainer.hide()
    }, function () {
        $snowContainer.show()
    }, 2));

    TransitionEvents.push(new $.SParallax.TransitionEvent(function () {
        $snowContainer.show()
    }, function () {
        $snowContainer.hide()
    }, 3));

    TransitionEvents.push(new $.SParallax.TransitionEvent(function () {
        $snowContainer.hide()
    }, function () {
        $snowContainer.show()
    }, 4));

    TransitionEvents.push(new $.SParallax.TransitionEvent(function () {
        $snowContainer.show()
    }, function () {
        $snowContainer.hide()
    }, 5));

    TransitionEvents.push(new $.SParallax.TransitionEvent(function () {
        $snowContainer.hide()
    }, function () {
        $snowContainer.show()
    }, 6));


    Transitions.push(new $.SParallax.Transition("top", -100, 0, "%", $MainImage2, 0, 1));
    Transitions.push(new $.SParallax.Transition("top", 0, 50, "%", $MainImage1, 0, 1));
    Transitions.push(new $.SParallax.Transition("right", 50, 0, "%", $bouble, 0, 1));
    Transitions.push(new $.SParallax.Transition("top", 100, 0, "%", $bouble, 0, 1));
    Transitions.push(new $.SParallax.Transition("margin-right", -100, 0, "px", $bouble, 0, 1));
    Transitions.push(new $.SParallax.Transition("margin-top", -200, 0, "px", $bouble, 0, 1));

    for (var i = 0; i < 15; i++) {
        Transitions.push(new $.SParallax.Transition("top", getRandom(0, -50), getRandom(100, 150), "%", snowArray[i], 0, 1));
        Transitions.push(new $.SParallax.Transition("left", getRandom(0, -50), getRandom(100, 150), "%", snowArray[i], 0, 1));
        Transitions.push(new $.SParallax.Transition("margin-top", -256, 0, "px", snowArray[i], 0, 1));
        Transitions.push(new $.SParallax.Transition("margin-left", -256, 0, "px", snowArray[i], 0, 1));
    }

    Transitions.push(new $.SParallax.Transition("right", -100, 0, "%", $MainImage3, 2, 3));
    Transitions.push(new $.SParallax.Transition("left", 0, -50, "%", $MainImage2, 2, 3));
    Transitions.push(new $.SParallax.Transition("right", 100, 0, "%", $bouble, 1, 3));
    Transitions.push(new $.SParallax.Transition("margin-right", -200, 0, "px", $bouble, 1, 3));

    for (var i = 0; i < 15; i++) {
        Transitions.push(new $.SParallax.Transition("top", getRandom(100, 150), getRandom(0, -50), "%", snowArray[i], 2, 3));
        Transitions.push(new $.SParallax.Transition("left", getRandom(0, -50), getRandom(100, 150), "%", snowArray[i], 2, 3));
        Transitions.push(new $.SParallax.Transition("margin-top", 0, -256, "px", snowArray[i], 2, 3));
        Transitions.push(new $.SParallax.Transition("margin-left", -256, 0, "px", snowArray[i], 2, 3));
    }


    Transitions.push(new $.SParallax.Transition("bottom", -100, 0, "%", $MainImage4, 4, 5));
    Transitions.push(new $.SParallax.Transition("top", 0, -50, "%", $MainImage3, 4, 5));
    Transitions.push(new $.SParallax.Transition("right", 0, 100, "%", $bouble, 3, 5));
    Transitions.push(new $.SParallax.Transition("margin-right", 0, -200, "px", $bouble, 3, 5));
    Transitions.push(new $.SParallax.Transition("top", 0, 50, "%", $bouble, 3, 5));
    Transitions.push(new $.SParallax.Transition("margin-top", 0, -100, "px", $bouble, 3, 5));

    for (var i = 0; i < 15; i++) {
        Transitions.push(new $.SParallax.Transition("top", getRandom(0, -50), getRandom(100, 150), "%", snowArray[i], 4, 5));
        Transitions.push(new $.SParallax.Transition("left", getRandom(0, -50), getRandom(100, 150), "%", snowArray[i], 4, 5));
        Transitions.push(new $.SParallax.Transition("margin-top", -256, 0, "px", snowArray[i], 4, 5));
        Transitions.push(new $.SParallax.Transition("margin-left", -256, 0, "px", snowArray[i], 4, 5));
    }

    Transitions.push(new $.SParallax.Transition("left", -100, 0, "%", $MainImage5, 6, 7));
    Transitions.push(new $.SParallax.Transition("left", 0, 50, "%", $MainImage4, 6, 7));
    Transitions.push(new $.SParallax.Transition("right", 100, 50, "%", $bouble, 5, 7));
    Transitions.push(new $.SParallax.Transition("margin-right", -200, -100, "px", $bouble, 5, 7));


    for (var i = 0; i < 15; i++) {
        Transitions.push(new $.SParallax.Transition("top", getRandom(100, 150), getRandom(0, -50), "%", snowArray[i], 6, 7));
        Transitions.push(new $.SParallax.Transition("left", getRandom(0, -50), getRandom(100, 150), "%", snowArray[i], 6, 7));
        Transitions.push(new $.SParallax.Transition("margin-top", 0, -256, "px", snowArray[i], 6, 7));
        Transitions.push(new $.SParallax.Transition("margin-left", -256, 0, "px", snowArray[i], 6, 7));
    }


    $.SParallax(Transitions, TransitionEvents);
    //endregion
    //region SParallax menu
    $(".navmenu > div").on("click", function () {
        $.SParallax.ScrollTo($(this).find("div").attr("data-point"), 1000);
    });

    var initilaPosition = 0;
    setTimeout(function () {
        initilaPosition = $.SParallax.GetCurrentPoint();
        while ($($(".navmenu > div")[initilaPosition]).hasClass("fake")) {
            initilaPosition--;
        }
        $($(".navmenu > div")[initilaPosition]).addClass("selected");
    }, 300);


    $(window).scroll(function () {
        if ($.SParallax.GetCurrentPoint() != initilaPosition) {
            initilaPosition = $.SParallax.GetCurrentPoint();
            $(".navmenu > div").removeClass("selected");
            while ($($(".navmenu > div")[initilaPosition]).hasClass("fake")) {
                initilaPosition--;
            }
            $($(".navmenu > div")[initilaPosition]).addClass("selected");
        }
    });
    //endregion
});
$(window).resize(function () {
    FitMainImages();
});