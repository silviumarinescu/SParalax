/*!
 * SParallax v1.0.0
 * http://sparallax.azurewebsites.net
 *
 * Date: 2014-12-28T01:10Z
 */
(function ($) {
    // the previous position of the scroll bar
    var PreviousScroll = 0;
    // the number of screens we will be working with
    var nrOfScreens = 0;
    // the scrolling tag based on the browser
    var scroller;
    // window variable
    var $win = $(window);
    // constructor
    $.SParallax = function (SParallaxTransitions, SParallaxTransitionEvents) {
        // the core of the plugin - effectively applies all the transitions based on the current scroll position
        this.ApplyParallax = function () {
            //top scroll
            var scroll = scroller.scrollTop();
            // window height
            var winHeight = $win.height();
            var activeObjects = [];
            var j = 0;
            if (scroll > PreviousScroll) {
                //scrolling down - do all events in natural order
                for (j = 0; j < SParallaxTransitionEvents.length; j++) {
                    DoPointEvents(SParallaxTransitionEvents[j], scroll, winHeight);
                }
            }
            else {
                //scrolling up - do all events in reverse order
                for (j = SParallaxTransitionEvents.length - 1; j >= 0; j--) {
                    DoPointEvents(SParallaxTransitionEvents[j], scroll, winHeight);
                }
            }
            // do all transitions
            for (var i = 0; i < SParallaxTransitions.length; i++) {
                switch (IsTransitionInScreen(SParallaxTransitions[i], scroll, winHeight)) {
                    //transition is in screen
                    case 1:
                        DoTransition(SParallaxTransitions[i], scroll, winHeight);
                        activeObjects.push(SParallaxTransitions[i].HtmlObject.selector);
                        break;
                    //transition has passed and is up
                    case 2:
                        if ($.inArray(SParallaxTransitions[i].HtmlObject.selector, activeObjects) == -1) {
                            DoTransition(SParallaxTransitions[i], SParallaxTransitions[i].StartParaPoint * winHeight, winHeight);
                        }
                        break;
                    //transition will come if the user continues to scroll down and is down
                    case 3:
                        if ($.inArray(SParallaxTransitions[i].HtmlObject.selector, activeObjects) == -1) {
                            DoTransition(SParallaxTransitions[i], SParallaxTransitions[i].EndParaPoint * winHeight, winHeight);
                        }
                        break;
                }
            }
            PreviousScroll = scroll;
        };
        // applies parallax and recalculates body height
        this.Refresh = function () {
            $("body").height($win.height() * nrOfScreens);
            this.ApplyParallax();
        };
        // the initialize function of the parallax
        this.Init = function () {
            // get the correct scrolling element based on the browser
            if (navigator.userAgent.indexOf("Chrome") > -1) {
                scroller = $('html');
            }
            else {
                if (navigator.userAgent.indexOf("Safari") > -1) {
                    scroller = $('body');
                }
                else {
                    if (navigator.userAgent.indexOf("Opera") > -1) {
                        scroller = $('html');
                    }
                    else {
                        if (navigator.userAgent.indexOf("Firefox") > -1) {
                            scroller = $('html');
                        }
                        else {
                            if (navigator.userAgent.indexOf("MSIE") > -1) {
                                scroller = $('html');
                            }
                            else {
                                scroller = $('html');
                            }
                        }
                    }
                }
            }
            // set the parallax to a variable so we can use it within functions
            var sParallax = this;
            // sort events by trigger point so we can easily search through them
            SParallaxTransitionEvents.sort(SortEvents);
            // get the number of screens based on the last screen that has a transition in it
            for (var j = 0; j < SParallaxTransitions.length; j++) {
                if (SParallaxTransitions[j].EndParaPoint > nrOfScreens) {
                    nrOfScreens = SParallaxTransitions[j].EndParaPoint;
                }
            }
            // increase the number of screens by 1 so that we always have a scrollbar on the screen
            nrOfScreens = nrOfScreens + 1;
            // set the height of the body to the height of the window * window height
            $("body").height($win.height() * nrOfScreens);
            // applies parallax
            sParallax.ApplyParallax();

            $win.scroll(function () {
                // applies parallax on scroll
                sParallax.ApplyParallax();
            }).resize(function () {
                // refreshes the parallax on window resize
                sParallax.Refresh();
            });

            // set the transition speed for all elements
            setTimeout(function () {
                for (var i = 0; i < SParallaxTransitions.length; i++) {
                    SParallaxTransitions[i].HtmlObject.css({
                        "transition": "all 0.3s linear 0s",
                        "transform": "translate3d(0,0,0)",
                        "-webkit-transition": "all 0.3s linear 0s",
                        "-webkit-transform": "translate3d(0,0,0)",
                        "-moz-transition": "all 0.3s linear 0s",
                        "-moz-transform": "translate3d(0,0,0)",
                        "-o-transition": "all 0.3s linear 0s",
                        "-o-transform": "translate3d(0,0,0)",
                        "-ms-transition": "all 0.3s linear 0s",
                        "-ms-transform": "translate3d(0,0,0)"
                    });
                }
            }, 300);
        };
        // call the initialize function of the parallax
        this.Init();
    };
    //region Functions
    // scrolls to a point
    $.SParallax.ScrollTo = function (point, speed) {
        var sp = 300;
        if (typeof(speed) != typeof("undefined")) {
            sp = speed;
        }
        scroller.stop().animate({scrollTop: $win.height() * point}, Math.abs(Math.round(scroller.scrollTop() / $win.height()) - point) * sp);
    };
    $.SParallax.GetCurrentPoint = function () {
        return Math.round(scroller.scrollTop() / $win.height());
    };
    //endregion
    //region Classes
    $.SParallax.Transition = function (cssProp, startVal, endVal, isPro, htmlOb, startParaPt, endParaPt) {
        this.CssProperty = cssProp;
        this.StartValue = startVal;
        this.EndValue = endVal;
        this.IsProcentage = isPro;
        this.HtmlObject = htmlOb;
        this.StartParaPoint = startParaPt;
        this.EndParaPoint = endParaPt;
    };
    $.SParallax.TransitionEvent = function (callbup, callbupdown, callbackPt) {
        this.CallbackUp = callbup;
        this.CallbackDown = callbupdown;
        this.callbackPoint = callbackPt;
    };
    //endregion
    //region Helper Functions
    /**
     * @return {number}
     */
    function SortEvents(a, b) {
        var aPoint = a.callbackPoint;
        var bPoint = b.callbackPoint;
        return ((aPoint < bPoint) ? -1 : ((aPoint > bPoint) ? 1 : 0));
    }

    // check if a transition is in the current screen
    /**
     * @return {number}
     */
    function IsTransitionInScreen(trans, scroll, winHeight) {
        if (((trans.StartParaPoint * winHeight) <= scroll) && ((trans.EndParaPoint * winHeight) >= scroll)) {
            return 1;
        }
        else {
            if ((trans.StartParaPoint * winHeight) > scroll) {
                return 2;
            }
            else {
                return 3;
            }
        }
    }

    // do up/down events if needed
    function DoPointEvents(trans, scroll, winHeight) {
        var pixelPoint = trans.callbackPoint * winHeight;
        if (scroll > PreviousScroll && (pixelPoint <= scroll && pixelPoint >= PreviousScroll)) {
            trans.CallbackDown();
        }
        else {
            if (scroll <= PreviousScroll && (pixelPoint >= scroll && pixelPoint <= PreviousScroll)) {
                trans.CallbackUp();
            }
        }
    }

    // apply a transition
    function DoTransition(trans, scroll, winHeight) {
        trans.HtmlObject.css(trans.CssProperty, (((trans.EndValue - trans.StartValue) * ((scroll - (trans.StartParaPoint * winHeight)) / ((trans.EndParaPoint * winHeight) - (trans.StartParaPoint * winHeight)))) + trans.StartValue).toString() + trans.IsProcentage);
    }

//endregion
}(jQuery));