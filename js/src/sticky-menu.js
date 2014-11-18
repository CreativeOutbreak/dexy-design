var breakpoint = "740";

var menu = document.querySelector('.sticky');
var hgroup = document.querySelector('.hgroup').cloneNode(true);
var container = menu.querySelector('.container');
console.log(container);
var menuDim = menu.getBoundingClientRect();
var menuPosition = "110"; // set to static number, as it can cause bugs with responsive design.  you can usually use:  menu.getBoundingClientRect(); and then access menuPosition.top
var placeholder = document.createElement('div');
placeholder.style.width = menuDim.width + 'px';
placeholder.style.height = menuDim.height + 'px';
var isAdded = false;

window.addEventListener('scroll', function() {
    if(window.innerWidth > breakpoint) {
        if (window.pageYOffset >= menuPosition && !isAdded) {
            menu.classList.add('fixed-top');
            menu.parentNode.insertBefore(placeholder, menu);
            container.appendChild(hgroup);
            isAdded = true;
        } else if (window.pageYOffset < menuPosition && isAdded) {
            removeSticky();   
        }
    }
});


if(window.attachEvent) {
    window.attachEvent('onresize', function() {
        if(window.innerWidth < breakpoint && isAdded) {
            removeSticky();
        }
    });
}
else if(window.addEventListener) {
    window.addEventListener('resize', function() {
        if(window.innerWidth < breakpoint && isAdded) {
            removeSticky();
        }
    }, true);
}
else {
    //The browser does not support Javascript event binding
}

function removeSticky() {
    menu.classList.remove('fixed-top');
    menu.parentNode.removeChild(placeholder);
    container.removeChild(hgroup);
    isAdded = false;
}

