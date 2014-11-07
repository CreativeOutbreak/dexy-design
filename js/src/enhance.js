window.addEvent('domready', function() {
  var menu_buttons = $$('.menu-button');
  var close_buttons = $$('.close-btn');
  var sc = 'selected';
  menu_buttons.addEvent('click', function(e) {
    history.go(-1);
    if(this.hasClass(sc)) {
      e.stop();
      closeMenu();
    } else {
      menu_buttons.removeClass(sc);
      this.addClass(sc);
    }
  });

  close_buttons.addEvent('click', function(e) {
    e.stop()
    closeMenu();
  });

  function closeMenu() {
    history.go(-1);
    menu_buttons.removeClass(sc);
    window.location = "#nav-open-btn";
  }

});

