

(function($) {
    $.fn.slideshow = function(options) {

        var settings = $.extend({
            // These are the defaults.
            interval: 3000,
            width: 400,
            height: 300,
            margin: 20,
            speed: 1000,
            startIndex: 0,
            loop: true,
            elements: 'figure'
        }, options),
                elements = $(settings.elements, this), //All elements
                lastIndex = elements.length - 1, //Last index
                index = settings.startIndex >= 0 || settings.startindex <= lastIndex ? settings.startIndex : 0, //Start index
                intervalId = null; //Id of the interval

        //If width or height has been changed, recalculate the dimensions
        if(settings.width!==400 || settings.height !== 300) {
            $('.slideshow_inner, figure, img',this).css('width',settings.width + 'px')
                .css('heigth',settings.height + 'px');
            $('.slideshow',this).css('width',(settings.width + settings.margin) + 'px')
                .css('height',(settings.height + settings.margin) + 'px');
            $('figcaption',this).css('width',settings.width);
        }               
        
        //Hide all elements exept the start-element
        elements.eq(index).siblings().hide();

        // Function to rotate images
        var rotateImages = function() {
            if (index > 0) {
                elements.eq(index--).fadeOut(settings.speed).prev().show();
            } else {
                if (settings.loop) {
                    elements.eq(lastIndex).fadeIn(settings.speed, function() {
                        elements.first().hide();
                    });
                    index = lastIndex;
                } else {
                    clearInterval(intervalId)
                }
            }
        };

        intervalId = setInterval(function() {
            rotateImages();
        }, settings.interval);

        return this;
    };
}(jQuery));


