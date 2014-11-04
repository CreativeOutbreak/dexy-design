console.log('test');

// window.addEvent('domready', function() {
//     console.log('The DOM is ready!');
//     var menu_buttons = $$('.menu-button');
//     menu_buttons.addEvent('click', function(e) {
//       e.stop();
//       var t = this.get('href');
//       var sc = 'selected';
//       var tc = 'target';
//       if(this.hasClass(sc)) {
//         this.removeClass(sc);
//         $$(t).removeClass('target');
//       } else {
//         menu_buttons.removeClass(sc);
//         this.addClass(sc);
//         $$('.holder').removeClass(tc);
//         $$(t).addClass(tc);
//       }
//     });
// });


window.addEvent('domready', function() {
  var menu_buttons = $$('.menu-button');
  var close_buttons = $$('.close-btn');
  var sc = 'selected';
  menu_buttons.addEvent('click', function(e) {
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
    menu_buttons.removeClass(sc);
    window.location = "#nav-open-btn";
  }

});

