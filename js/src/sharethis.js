/********************************
 *       Global Variables       *
 *******************************/
var show_class = "showthis",
    transition_class = "transition",
    sharethis_class = ".sharethis_box",
    loaded = false,
    $st = $(sharethis_class),
    usn_all,
    usn_medium,
    bpw,
    debug = true;

$(document).ready(function() {

    $st.on("transitionend webkitTransitionEnd oTransitionEnd MSTransitionEnd", function(e){
        e.stopPropagation();
        dbug("transition ended");
        if($st.hasClass(show_class)) {
            dbug("Showing!!");
        } else {
            dbug("Not Showing!!");
        }
    });
});






/**
 * Functions
 */

var toggleShareThis = function() {
    if(bpw > usn_medium) {
        if(loaded) $st.addClass(show_class);
    } else {
        $st.removeClass(show_class);
    }
}

var hideShareThis = function() {
    dbug("hideFunction");
    $st.removeClass(show_class);
}

var showShareThis = function() {
    if(loaded) $st.addClass(show_class);
}

var loadedShareThis = function() {
    loaded = true;
    setTimeout(function() { // Set 1s delay on load as sharethis doesn't fire callback on load and look odd if not loaded.
        $st.addClass(transition_class);
        toggleShareThis();
    }, 1000);
}

var cleanPXString = function(str) {
    return Number(str.replace("px", ""));
}



var dbug = function(msg) {
    if(debug) console.log(msg);
}

/**
 * State Building
 */

var fsm = new NI.FSM();
fsm.extendStates({"open" : showShareThis, "close" : hideShareThis});
fsm.changeState("open");
dbug(fsm.states);

/**
 * Event Binding
 */

$( sharethis_class ).bind('DOMSubtreeModified', function(e) {
    $( this ).unbind( e );
    usn_all = Unison.fetch.all();
    var bp_now = Unison.fetch.now();
    usn_medium = cleanPXString(usn_all['usn-medium']);
    bpw = cleanPXString(bp_now.width);
    loadedShareThis();
});


Unison.on('change', function(bp) {
    dbug("BreakPoint Changed to: " + bp.width);
    bpw = cleanPXString(bp.width);
    toggleShareThis();
});
