var Fsm = function() {
    "use strict";
    // Varibles
    var self = this;
    self.state = false;
    self.new_state = false;
    self.prev_state = false;
    self.current_state = false;
    self.transitions = {};
    self.listeners = {};
    // Functions
    self.transitionState = function(s, arg) {
        if(typeof self.transitions[s] === "function") {
            self.prev_state = self.state;
            self.new_state = s;
            self.state = { "transitioning" : { "from" : self.prev_state, "to" : self.new_state } };  
            if(typeof arg !== undefined) {
                self.transitions[s].apply(self, arg);
            }
            else {
                self.transitions[s].call(self);
            }
        } else {
            console.log("The doesn't seem to be a function set for " + s + " state.  Here is the states object:");
            console.log(self.states);
        }
    }

    self.extendTransitions = function(obj) {
        $.extend(self.transitions, obj);
    }

    self.extendListeners = function(obj) {
        $.extend(self.listeners, obj);
    }

    self.getState = function() {
        return self.state;
    }

    self.setState = function(state) {
        self.state = state;
    }
}

var NI = {
    FSM: Fsm,
}

