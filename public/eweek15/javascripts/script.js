$(document).ready(function () {
    "use strict";
    console.log("script.js successfully linked");
    changeActive();
    scrollSpy();
    eventCollapse();
    changeArrow();
    changeEvents();
});

/*  Functions   */
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
    $('.collapse').collapse();
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
            
        });
    });
}
