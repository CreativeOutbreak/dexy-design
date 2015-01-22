var Fsm = function() {
    // Varibles
    var self = this;
    self.state = false;
    self.states = {};
    // Functions
    self.changeState = function(s, arg) {
        if(typeof self.states[s] === "function") {
            self.state = s;
            if(typeof arg !== undefined) {
                self.states[s].apply(self, arg);
            }
            else {
                self.states[s].call(self);
            }
        } else {
            console.log("The doesn't seem to be a function set for " + s + " state.  Here is the states object:");
            console.log(self.states);
        }
    }

    self.extendStates = function(obj) {
        $.extend(self.states, obj);
    }

    self.getState = function() {
        return self.state;
    }
}

var NI = {
    FSM: Fsm,
}

