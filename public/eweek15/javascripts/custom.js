$(document).ready(function () {
    "use strict";
    console.log("script.js successfully linked");
    background();
    fixWindowsBackgroundIssues();
    fixIeIssues();
    changeActive();
    scrollSpy();
    eventCollapse();
    changeArrow();
    changeEvents();
    setTransparentHeight();
    /*setFontSize();*/
    windowSizeAdjusted();
    /*remove();*/
});

/*  Functions   */
function background() {
    console.log("backstretch loaded");
    /*$.backstretch("../pictures/royce.jpg");*/
    $.backstretch("http://yalai.bol.ucla.edu/eweek15-2/pictures/court_of_science.jpg");
}

function fixWindowsBackgroundIssues() {
    /* On MS Windows, Chrome displayed issues with background backstretch element */
    $(".backstretch").height("15000px");
    $(window).resize(function() {
        $(".backstretch").height("15000px");
        /*console.log("fix trying");*/
    });
    $(window).scroll(function() {   /* required user to scroll to triger the fixing algorithm */
        $(".backstretch").height("15000px");
    });
}

function fixIeIssues() {
    //  courtesy of StackOverflow
    //  http://stackoverflow.com/questions/19999388/jquery-check-if-user-is-using-ie
    var ua = window.navigator.userAgent;
        var msie = ua.indexOf("MSIE ");

        if (msie > 0 || !!navigator.userAgent.match(/Trident.*rv\:11\./)) {      // If Internet Explorer, return version number
            //  alert("IE");
            //  console.log("It's IE");
            var $winWidth = $(window).width();
            var $pageBackgroundWidth = $(".page-background").width() + 30;
            var $left = ($winWidth - $pageBackgroundWidth) / 2;
            $(".page-background").css("left", $left);
            //  console.log($winWidth + " " + $pageBackgroundWidth + " " + $left);
        }
}

function changeActive() {
    /*Not need*/
    /* Change the nav button that has the class .active */
    console.log("changeActive loaded");

    $('.event-top-nav li a').click(function(link) {
        console.log("click");
        $(".event-top-nav ul li a").removeClass("event-top-nav-active");
        $(this).addClass("event-top-nav-active");
    });
}

function changeArrow() {
    console.log("changeArrow loaded");
    
    $(".event-heading a").click(function() {
        console.log("clicked");
        $(this).find("span").toArray().forEach(function(element) {
            if ($(element).hasClass("arrow-active")) {
                $(element).removeClass("arrow-active");
                $(element).addClass("arrow");
            } else {
                $(element).removeClass("arrow");
                $(element).addClass("arrow-active");
            }
        });
    });
}

function scrollSpy() {
    console.log("scrollSpy loaded");
    
    $('body').scrollspy({ target: '.navbar-top' });
    /*$('body').scrollspy({ target: '.navbar-test' });*/
    
    
    /*$('#Wednesday').on('scrollSpy:enter', function() {
        console.log('enter:', $(this).attr('id'));
    });
    
    $('main').scrollspy({ target: '.event-side-nav' });*/
}

function eventCollapse() {
    console.log("eventCollapse loaded");
    $('.panel-collapse').collapse();
}

function changeEvents() {
    console.log("changeEvents() loaded");
    
    var $Mon = $("#Monday").html();
    var $Tue = $("#Tuesday").html();
    var $Wed = $("#Wednesday").html();
    var $Thu = $("#Thursday").html();
    var $Fri = $("#Friday").html();
    
    $("#Tuesday").remove();
    $("#Wednesday").remove();
    $("#Thursday").remove();
    $("#Friday").remove();
    
    $(".event-top-nav .nav li a").toArray().forEach(function (element) {
        // create a click handler for this element
        $(element).click(function () {
            console.log("event-top-nav li clicked");
            
            $(".days-list").empty();
            
            if ($(element).parent().is(":nth-child(1)")) {
                console.log("Monday clicked");
                $(".days-list").append($Mon);
            } else if ($(element).parent().is(":nth-child(2)")) {
                console.log("Tuesday clicked");
                $(".days-list").append($Tue);
            } else if ($(element).parent().is(":nth-child(3)")) {
                console.log("Wednesday clicked");
                $(".days-list").append($Wed);
            } else if ($(element).parent().is(":nth-child(4)")) {
                console.log("Thursday clicked");
                $(".days-list").append($Thu);
            } else {
                console.log("Friday clicked");
                $(".days-list").append($Fri);
            }
            
            //  call adjustEventsFont() to adjust h2 and h4 in #Events
            adjustEventsFont();
            
        });
    });
}

function setTransparentHeight() {
    console.log("setTransparentHeight() loaded");
    /*var $pageHeight = $(".page").height() - 190;
    console.log($pageHeight);
    $(".page-background").height($pageHeight);*/
    $(window).scroll(function () {  /* should try to fix this?? */
        /*console.log("resized");*/
        var $pageHeight = $(".page").height() + 50;
        /*console.log($pageHeight);*/
        $(".page-background").height($pageHeight);
    });
    $(window).resize(function() {
        /*console.log("resized");*/
        var $pageHeight = $(".page").height() + 50;
        console.log("page height is " + $pageHeight);
        $(".page-background").height($pageHeight);
    });
}

function windowSizeAdjusted() {
    console.log("windowSizeAdjusted() loaded");
    /* onload initilization */
    adjustFontAndHr();
    
    /* window resize adjustment */
    $(window).resize(function() {
        console.log("resized");
        adjustFontAndHr();
        fixIeIssues();
        
        /*  Development console check
        var $h1Size = parseInt($("h1").css("font-size"));
        console.log("h1 is " + $h1Size);
        var $h2Size = parseInt($("h2").css("font-size"));
        console.log("h2 is " + $h2Size);
        var $h3Size = parseInt($("h3").css("font-size"));
        console.log("h3 is " + $h3Size);
        var $h4Size = parseInt($("h4").css("font-size"));
        console.log("h4 is " + $h4Size);
        */
    });
}

function adjustFontAndHr() {
    var $pageWidth = $(".page").width();
    console.log("page width is " + $pageWidth);
    if ($pageWidth < 500) {
        $("h1").css("font-size", "28px");
        $("h2").css("font-size", "25px");
        $("h3").css("font-size", "21px");
        $("h4").css("font-size", "12px");
    } else if ($pageWidth <= 550) {
        $("h1").css("font-size", "35px");
        $("h2").css("font-size", "25px");
        $("h3").css("font-size", "21px");
        $("h4").css("font-size", "15px");
    } else if ($pageWidth <= 820) {
        $("h1").css("font-size", "45px");
        $("h2").css("font-size", "35px");
        $("h3").css("font-size", "28px");
        $("h4").css("font-size", "25px");
    } else {
        $("h1").css("font-size", "55px");
        $("h2").css("font-size", "42px");
        $("h3").css("font-size", "36px");
        $("h4").css("font-size", "32px");
    }
    
    /*adjust hr */
    $("hr").width($pageWidth);
    $("hr").css("margin-left", "-15px");
}

function adjustEventsFont() {
    //  adjust h2 and h4 in the #Events section
    var $pageWidth = $(".page").width();
    //  console.log("page width is " + $pageWidth);
    if ($pageWidth < 500) {
        $("h2").css("font-size", "25px");
        $("h4").css("font-size", "12px");
    } else if ($pageWidth <= 550) {
        $("h2").css("font-size", "25px");
        $("h4").css("font-size", "15px");
    } else if ($pageWidth <= 820) {
        $("h2").css("font-size", "35px");
        $("h4").css("font-size", "25px");
    } else {
        $("h2").css("font-size", "42px");
        $("h4").css("font-size", "32px");
    }
}
    