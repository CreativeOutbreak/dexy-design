/********************************
 *       Global Variables       *
 *******************************/
var show_class = "showthis",
    show_btn_class = "showbtn",
    transition_class = "transition",
    right_icon = "fa-angle-double-right",
    left_icon = "fa-angle-double-left",
    sharethis_class = ".sharethis_box",
    btn_class = ".toggle_sharethis",
    $btn = $(btn_class),
    $st = $(sharethis_class),
    loaded = false,
    usn_all,
    usn_medium,
    bpw,
    fsm = new NI.FSM(),
    debug = true;

$(document).ready(function() {
    $btn.on("click", toggleClick);
});






/**
 * Functions
 */

var shareThis_toggle = function() {
    console.log("shareThis_toggle function");
    if(bpw > usn_medium) {
        dbug("a");
        fsm.transitionState("show");
    } else {
        dbug("b");
        fsm.transitionState("hide");
    }
}

var shareThis_loaded = function() {
    loaded = true;
    setTimeout(function() { // Set 1s delay on load as sharethis doesn't fire callback on load and look odd if not loaded.
        $st.addClass(transition_class);
        $btn.addClass(transition_class);
        shareThis_toggle();
    }, 1000);
}

/**
 * Static state function
 */

var switchBtnIcon = function(sh) {
    // This function's a little obscure so I'll explain it.
    // if you send it true it switches the button icon to right >> (close),
    // and if false it switches it to left  << (open).
    var $i = $("i", $btn);
    sh ? $i.removeClass(left_icon).addClass(right_icon) : $i.removeClass(right_icon).addClass(left_icon);
}

/**
 * Transition state functions
 */

var shareThis_showClosable = function() {
    var state = fsm.getState();
    fsm.listeners["transition-end"].call(this, $st, function($elm) {
        if($btn.hasClass(show_btn_class)) {
            fsm.setState("open-closable");
            dbug(fsm.getState());
        }
        else {
            fsm.listeners["transition-end"].call(this, $btn, function($elm) {
                fsm.setState("open-closable");
                dbug(fsm.getState());
            });
            $btn.addClass(show_btn_class);
            switchBtnIcon(true);
        }
    });
    if(loaded) $st.addClass(show_class);
}

var shareThis_hide = function() {
    var state = fsm.getState();
    if($st.hasClass(show_class)) {
        fsm.listeners["transition-end"].call(this, $st, function($elm) {
            if($btn.hasClass(show_btn_class)) {
                fsm.setState("closed");
                dbug(fsm.getState());
            }
            else {
                fsm.listeners["transition-end"].call(this, $btn, function($elm) {
                    fsm.setState("closed");
                    dbug(fsm.getState());
                });
                $btn.addClass(show_btn_class);
                switchBtnIcon(false);
            }
        });
        $st.removeClass(show_class);
    } else {
        if($btn.hasClass(show_btn_class)) {
            fsm.setState("closed");
            dbug(fsm.getState());
        }
        else {
            fsm.listeners["transition-end"].call(this, $btn, function($elm) {
                fsm.setState("closed");
                dbug(fsm.getState());
            });
            $btn.addClass(show_btn_class);
            switchBtnIcon(false);
        }
    }

}

var shareThis_show = function() {
    var state = fsm.getState();
    fsm.listeners["transition-end"].call(this, $st, function($elm) {
        if($btn.hasClass(show_btn_class)) {
            fsm.listeners["transition-end"].call(this, $btn, function($elm) {
                fsm.setState("open");
                dbug(fsm.getState());
            });
            $btn.removeClass(show_btn_class);
        } else {
            fsm.setState("open");
            dbug(fsm.getState());
        }
    });
    if(loaded) $st.addClass(show_class);

}


/**
 * Util functions
 */

var cleanPXString = function(str) {
    return Number(str.replace("px", ""));
}

var dbug = function(msg) {
    if(debug) console.log(msg);
}

/**
 * Event function
 */

var toggleClick = function(e) {
    var state = fsm.getState();
    if(state != "closed") {
        fsm.transitionState("hide");
    } else {
        fsm.transitionState("show-closable");
    }
    dbug("button clicked!");
    dbug(state);
}

var transitionListener = function($elm, callback) {
    $elm.on("transitionend webkitTransitionEnd oTransitionEnd MSTransitionEnd", function(e){
        e.stopPropagation();
        dbug("transition ended");
        $elm.off("transitionend webkitTransitionEnd oTransitionEnd MSTransitionEnd");
        callback.call(this, $elm);
    });
}



/**
 * State Building
 */

//var fsm = new NI.FSM();
//fsm.extendStates({ "open-closable": shareThis_openClosable, "closed": shareThis_closed, "open": shareThis_open});
fsm.extendTransitions({ "show" : shareThis_show, "hide" : shareThis_hide, "show-closable" : shareThis_showClosable });
fsm.extendListeners({ "transition-end" : transitionListener });
//fsm.transitionState("show");

/**
 * Event Binding
 */

$( sharethis_class ).bind('DOMSubtreeModified', function(e) {
    $( this ).unbind( e );
    usn_all = Unison.fetch.all();
    var bp_now = Unison.fetch.now();
    usn_medium = cleanPXString(usn_all['usn-medium']);
    bpw = cleanPXString(bp_now.width);
    shareThis_loaded();
});


Unison.on('change', function(bp) {
    dbug("BreakPoint Changed to: " + bp.width);
    bpw = cleanPXString(bp.width);
    shareThis_toggle();
});
