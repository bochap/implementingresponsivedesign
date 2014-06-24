/**
 * Created by dseet on 6/24/2014.
 */
var Utils = {
    // toggle class utility function
    classToggle: function (element, tclass) {
        var classes = element.className,
            pattern = new RegExp(tclass);
        var hasClass = pattern.test(classes);
        // toggle the class
        classes = hasClass ? classes.replace(pattern, '') : classes + ' ' + tclass;
        element.className = classes.trim();
    }
};

window.onload = function() {
    var nav = document.getElementById('nav');
    var navItem = nav.getElementsByTagName('li');

    // is it floated
    var floated = navItem[0].currentStyle ? el.currentStyle['float'] : document.defaultView.getComputedStyle(navItem[0], null).getPropertyValue('float');

    if(floated != 'left') {
        var collapse = document.getElementById('nav-collapse');
        Utils.classToggle(nav, 'hide');
        Utils.classToggle(collapse, 'active');
        collapse.onclick = function() {
            Utils.classToggle(nav, 'hide');
            return false;
        }
    }
}
