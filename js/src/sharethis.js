/********************************
 *       Global Variables       *
 *******************************/
var show_class = "showthis",
    sharethis_class = ".sharethis_box",
    loaded = false,
    $st = $(sharethis_class);

$(document).ready(function() {

    $st.on("transitionend webkitTransitionEnd oTransitionEnd MSTransitionEnd", function(e){
        e.stopPropagation();
        console.log("transition ended");
        if($st.hasClass(show_class)) {
            console.log("Showing!!");
        } else {
            console.log("Not Showing!!");
        }
    });
    

});


$( sharethis_class ).bind('DOMSubtreeModified', function(e) {
    loaded = true;
    $( this ).unbind( e );
    console.log("Loaded ShareThis");
    loadedShareThis();
});


Unison.on('change', function(bp) {
    console.log("BreakPoint Changed to: " + bp.width);
    var bpw = cleanPXString(bp.width);
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

/**
 * Functions
 */

var hideShareThis = function() {
    console.log("hideFunction");
    $st.removeClass(show_class);
}

var showShareThis = function() {
    if(loaded) $st.addClass(show_class);
}

var loadedShareThis = function() {
    var bp = Unison.fetch.now();
    console.log(cleanPXString(bp.width));
}

var cleanPXString = function(str) {
    return Number(str.replace("px", ""));
}
