window.addEvent('domready', function() {
  var menu_buttons = $$('.menu-button');
  var close_buttons = $$('.close-btn');
  var menu_holders = $$('.holder');
  var sc = 'selected';
  var tc = 'target';
  menu_buttons.addEvent('click', function(e) {
    e.stop();
    if(this.hasClass(sc)) {
      closeMenu();
    } else {
      menu_buttons.removeClass(sc);
      this.addClass(sc);
      var ref = this.get('href');
      $(ref).addClass(tc);
    }
  });

  close_buttons.addEvent('click', function(e) {
    e.stop()
    closeMenu();
  });

  function closeMenu() {
    menu_buttons.removeClass(sc);
    //window.location = "#nav-open-btn";
    menu_holders.removeClass(tc);
  }

});

