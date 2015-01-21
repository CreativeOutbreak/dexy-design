/********************************
 *       Global Variables       *
 *******************************/
var $st;
var show_class = "showthis";
var sharethis_class = ".sharethis_box";

$(document).ready(function() {

    $st = $(sharethis_class);
    
    $st.on("transitionend webkitTransitionEnd oTransitionEnd MSTransitionEnd", function(e){
        e.stopPropagation();
        console.log("transition ended");
        if($st.hasClass(show_class)) {
            console.log("Showing!!");
        } else {
            console.log("Not Showing!!");
        }
    });

    Unison.on('usn-x-small', function() {
        console.log('usn-x-small');
        hideShareThis();
    });


    Unison.on('usn-small', function() {
        console.log('usn-small');
        hideShareThis();
    });


    Unison.on('usn-small-medium', function() {
        console.log('usn-small-medium');
        hideShareThis();
    });

    Unison.on('usn-medium', function() {
        console.log('usn-medium');
        showShareThis();
    });


    Unison.on('usn-large-medium', function() {
        console.log('usn-large-medium');
        showShareThis();
    });


    Unison.on('usn-large', function() {
        console.log('usn-large');
        showShareThis();
    });

    Unison.on('usn-x-large', function() {
        console.log('usn-x-large');
        showShareThis();
    });


});

var hideShareThis = function() {
    console.log("hideFunction");
    $st.removeClass(show_class);
}

var showShareThis = function() {
    $st.addClass(show_class);
}
