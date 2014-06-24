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

    if(window.matchMedia("(min-width: 37.5em)").matches) {
        // load in the images
        var lazy = Utils.q('[data-src]');
        for (var i = 0; i < lazy.length; i++) {
            var source = lazy[i].getAttribute('data-src');
            // create the image
            var img = new Image();
            img.src = source;
            // insert it inside of the link
            lazy[i].insertBefore(img, lazy[i].firstChild);

        }

        var videoLink = document.getElementById('video');
        if(videoLink) {
            var linkHref = videoLink.getAttribute('href')
            var result = Utils.getEmbed(linkHref);
            var parent = videoLink.parentNode;
            parent.innerHTML = result + videoLink.parentNode.innerHtml;
            parent.removeChild(document.getElementById('video'));
        }
    }


}
