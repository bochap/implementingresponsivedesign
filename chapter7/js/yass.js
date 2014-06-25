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
    },
    q: function(query) {
        var res;
        if(document.querySelectorAll(query)) {
            res = document.querySelectorAll(query);
        } else {
            var d = document,
                a = d.styleSheets[0] || d.createStyleSheet();
            a.addRule(query, 'f:b');
            for (var l = d.all, b= 0, c=[], f= l.length; b < f; b++) {
                l[b].currentStyle.f && c.push(l[b]);
                a.removeRule(0);
                var res = c;

            }
        }

        return res;
    },
    getEmbed : function(url){
        var output = '';

        var youtubeUrl = url.match(/watch\?v=([a-zA-Z0-9\-_]+)/);
        var vimeoUrl = url.match(/^http:\/\/(www\.)?vimeo\.com\/(clip\:)?(\d+).*$/);
        if(youtubeUrl){
            output = '<div class="vid-wrapper"><iframe src="http://www.youtube.com/embed/'+youtubeUrl[1]+'?rel=0" frameborder="0" allowfullscreen></iframe></div>';
        } else if(vimeoUrl){
            output =  '<div class="vid-wrapper"><iframe src="http://player.vimeo.com/video/'+vimeoUrl[3]+'" frameborder="0"></iframe></div>';
        }

        return output;

    },
    anchorInclude: function(elem) { // anchorInclude turns a functioning link into a client-side function
        // grab the link's url
        var url = elem.getAttribute('href');
        // grab the target element where our result will appear
        // set on the link using the data-target attribute
        var target = document.getElementById(elem.getAttribute('data-target'));
        // make our ajax request
        // using reqwest.js for demonstration purposes
        reqwest(url, function (resp) {
            // place the result into our target element
            target.innerHTML = resp;
        });

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

    var lazyHeadlines = document.getElementById('lazy');
    if(window.matchMedia("(min-width: 37.5em)").matches) {
        // load in the images
        var lazyMoreImages = Utils.q('[data-src]');
        for (var i = 0; i < lazyMoreImages.length; i++) {
            var source = lazyMoreImages[i].getAttribute('data-src');
            // create the image
            var img = new Image();
            img.src = source;
            // insert it inside of the link
            lazyMoreImages[i].insertBefore(img, lazyMoreImages[i].firstChild);
        }

        var videoLink = document.getElementById('video');
        if(videoLink) {
            var linkHref = videoLink.getAttribute('href')
            var result = Utils.getEmbed(linkHref);
            var parent = videoLink.parentNode;
            var parentHtml = parent.innerHTML;
            parent.innerHTML = result + parentHtml;
            parent.removeChild(document.getElementById('video'));
        }

        Utils.anchorInclude(lazyHeadlines);
    } else {
        // if the screen is less than 600px wude
        // load the headlines only if the link is clicked
        lazyHeadlines.onclick = function() {
            Utils.anchorInclude(lazyHeadlines);
            return false;
        }
    }
}
