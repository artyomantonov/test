
var example10 = new Mg({
    reference: "example10",
    click: {
        activated: [6],
        cycle: true,
        interactive: true,
        multiLess: 7, multiPlus: 7,
        scrollWheel: true, dragWheel: true
    }
});

example10.click.onEvent = function () {
    var arr = this.multiActivated;
    var alpha = Math.PI * 2 / (arr.length);


    for (var i = 0; i < arr.length; i++) {
        var path = $("#" + this.reference + "-item-" + arr[i]);
        if (arr[i] == this.activated) {
            var depth = 0;
        } else {
            var depth = example10.mapDistanceReverse(this.multiPlus, i, arr.length, 0);
        }
        //
        var theta = alpha * (this.activated - arr[i] - depth / 6) + 1.6; // -depth/6 will give additional distance based on depth: it gives space for activated
        var x = 20 + xradius2 + Math.cos(theta) * xradius2;
        var y = yradius2 + Math.sin(theta) * yradius2;
        var w = h = y / 4;
        var scale = 0.2 + y / 140;
        if (arr[i] == this.activated) {
            scale = 1.5;
            y -= 30;
        }
        path.clearQueue().stop().css("z-index", Math.round(y / 10));
        if (perspective && transition) {
            path.css(transition.css, transform.css + " 1.3s cubic-bezier(" + bezcss + ")");
            path.css(transform.css, "translate3d(" + x + "px," + y + "px,0) scale(" + scale + ")");
        } else {
            path.animate({transformJ: 'translate(' + x + ',' + y + ') scale(' + scale + ')'}, {
                queue: true,
                duration: 1300,
                specialEasing: {transformJ: bez}
            });
        }
    }
    $("#" + this.reference + "-item-" + this.deactivated).removeClass("active");
    $("#" + this.reference + "-item-" + this.activated).addClass("active").css("z-index", 100);
};

example10.click.scrollClick = function () {
    var path = $("#" + this.reference + "-click-scrollIn");
    path.addClass("active");
};
example10.click.scrollMove = function () {
    var path = $("#" + this.reference + "-click-scrollIn");
    if (perspective && transition) {
        path.css(transition.css, transform.css + " 0s");
        path.css(transform.css, "translate3d(" + this.scrollPosition + "px,0,0)");
    } else {
        path.clearQueue().stop().animate({left: this.scrollPosition}, {
            queue: true,
            duration: 0,
            specialEasing: {left: bez}
        });
    }
};
example10.click.scrollRelease = function () {
    var path = $("#" + this.reference + "-click-scrollIn");
    path.removeClass("active");
    if (perspective && transition) {
        path.css(transition.css, transform.css + " 1.2s cubic-bezier(" + bezcss + ") 0s");
        path.css(transform.css, "translate3d(" + this.scrollPosition + "px,0,0)");
    } else {
        path.clearQueue().stop().animate({left: this.scrollPosition}, {
            queue: true,
            duration: 300,
            specialEasing: {left: bez}
        });
    }
};
example10.click.dragMove = function () {
    var path = $("#" + this.reference + "-click-dragIn");
    if (perspective && transition) {
        path.css(transition.css, transform.css + " 0s");
        path.css(transform.css, "translate3d(" + this.dragPosition + "px,0,0)");
    } else {
        path.clearQueue().stop().animate({left: this.dragPosition}, {
            queue: true,
            duration: 0,
            specialEasing: {left: bez}
        });
    }
};
example10.click.dragRelease = function () {
    var path = $("#" + this.reference + "-click-dragIn");
    if (perspective && transition) {
        path.css(transition.css, transform.css + " 1.2s cubic-bezier(" + bezcss + ") 0s");
        path.css(transform.css, "translate3d(" + this.dragPosition + "px,0,0)");
    } else {
        path.clearQueue().stop().animate({left: this.dragPosition}, {
            queue: true,
            duration: 300,
            specialEasing: {left: bez}
        });
    }
};

example10.init();

var car1 = $(document).find('#car1');
var car2 = $(document).find('#car2');

function my_func() {
    car2.toggleClass('car1');
    car2.toggleClass('car2');
    car1.toggleClass('car1');
    car1.toggleClass('car2');

    xradius2 = 180;
    yradius2 = 70;
    xradius1 = 360;
    yradius1 = 150;


    example10.click.onEvent = function () {
        var arr = this.multiActivated;
        var alpha = Math.PI * 2 / (arr.length);


        for (var i = 0; i < arr.length; i++) {
            var path = $("#" + this.reference + "-item-" + arr[i]);
            if (arr[i] == this.activated) {
                var depth = 0;
            } else {
                var depth = example10.mapDistanceReverse(this.multiPlus, i, arr.length, 0);
            }
            //
            var theta = alpha * (this.activated - arr[i] - depth / 6) + 1.6; // -depth/6 will give additional distance based on depth: it gives space for activated
            var x = 20 + xradius2 + Math.cos(theta) * xradius2;
            var y = yradius2 + Math.sin(theta) * yradius2;
            var w = h = y / 4;
            var scale = 0.2 + y / 140;
            if (arr[i] == this.activated) {
                scale = 1.5;
                y -= 30;
            }
            path.clearQueue().stop().css("z-index", Math.round(y / 10));
            if (perspective && transition) {
                path.css(transition.css, transform.css + " 1.3s cubic-bezier(" + bezcss + ")");
                path.css(transform.css, "translate3d(" + x + "px," + y + "px,0) scale(" + scale + ")");
            } else {
                path.animate({transformJ: 'translate(' + x + ',' + y + ') scale(' + scale + ')'}, {
                    queue: true,
                    duration: 1300,
                    specialEasing: {transformJ: bez}
                });
            }
        }
        $("#" + this.reference + "-item-" + this.deactivated).removeClass("active");
        $("#" + this.reference + "-item-" + this.activated).addClass("active").css("z-index", 100);
    };
    example9.click.onEvent = function () {


        var arr = this.multiActivated;
        var alpha = Math.PI * 2 / (arr.length);



        for (var i = 0; i < arr.length; i++) {
            var path = $("#" + this.reference + "-item-" + arr[i]);
            if (arr[i] == this.activated) {
                var depth = 0;
            } else {
                var depth = example9.mapDistanceReverse(this.multiPlus, i, arr.length, 0);
            }
            //
            var theta = alpha * (this.activated - arr[i] - depth / 6) + 1.6; // -depth/6 will give additional distance based on depth: it gives space for activated
            var x = 20 + xradius1 + Math.cos(theta) * xradius1;
            var y = yradius1 + Math.sin(theta) * yradius1;
            var w = h = y / 4;
            var scale = 0.2 + y / 140;
            if (arr[i] == this.activated) {
                scale = 1.5;
                y -= 30;
            }
            path.clearQueue().stop().css("z-index", Math.round(y / 10));
            if (perspective && transition) {
                path.css(transition.css, transform.css + " 1.3s cubic-bezier(" + bezcss + ")");
                path.css(transform.css, "translate3d(" + x + "px," + y + "px,0) scale(" + scale + ")");
            } else {
                path.animate({transformJ: 'translate(' + x + ',' + y + ') scale(' + scale + ')'}, {
                    queue: true,
                    duration: 1300,
                    specialEasing: {transformJ: bez}
                });
            }
        }
        $("#" + this.reference + "-item-" + this.deactivated).removeClass("active");
        $("#" + this.reference + "-item-" + this.activated).addClass("active").css("z-index", 100);
    }

    example9.init();
    example10.init();

    $(document).find('.active').removeClass('addactive');

}
function my_func1() {
    car2.toggleClass('car1');
    car2.toggleClass('car2');
    car1.toggleClass('car1');
    car1.toggleClass('car2');

    xradius2 = 360;
    yradius2 = 150;
    xradius1 = 180;
    yradius1 = 70;


    example10.click.onEvent = function () {
        var arr = this.multiActivated;
        var alpha = Math.PI * 2 / (arr.length);

        //var xradius2 = 420;
        //var yradius2 = 150;


        for (var i = 0; i < arr.length; i++) {
            var path = $("#" + this.reference + "-item-" + arr[i]);
            if (arr[i] == this.activated) {
                var depth = 0;
            } else {
                var depth = example10.mapDistanceReverse(this.multiPlus, i, arr.length, 0);
            }
            //
            var theta = alpha * (this.activated - arr[i] - depth / 6) + 1.6; // -depth/6 will give additional distance based on depth: it gives space for activated
            var x = 20 + xradius2 + Math.cos(theta) * xradius2;
            var y = yradius2 + Math.sin(theta) * yradius2;
            var w = h = y / 4;
            var scale = 0.2 + y / 140;
            if (arr[i] == this.activated) {
                scale = 1.5;
                y -= 30;
            }
            path.clearQueue().stop().css("z-index", Math.round(y / 10));
            if (perspective && transition) {
                path.css(transition.css, transform.css + " 1.3s cubic-bezier(" + bezcss + ")");
                path.css(transform.css, "translate3d(" + x + "px," + y + "px,0) scale(" + scale + ")");
            } else {
                path.animate({transformJ: 'translate(' + x + ',' + y + ') scale(' + scale + ')'}, {
                    queue: true,
                    duration: 1300,
                    specialEasing: {transformJ: bez}
                });
            }
        }
        $("#" + this.reference + "-item-" + this.deactivated).removeClass("active");
        $("#" + this.reference + "-item-" + this.activated).addClass("active").css("z-index", 100);
    };
    example9.click.onEvent = function () {
        //var xradius1 = 150;
        //var yradius1 = 80;
        /*
         if($("#car1").hasClass("car1")){

         var xradius = 420;
         var yradius = 150;
         xradius2 = 150;
         yradius2 = 80;
         $("#car1").removeClass("car1");
         $("#car1").addClass("car2");
         $("#car2").removeClass("car2");
         $("#car2").addClass("car1");
         }
         else{

         var xradius = 150;
         var yradius = 80;
         xradius2 = 420;
         yradius2 = 150;

         $("#car1").removeClass("car2");
         $("#car1").addClass("car1");
         $("#car2").removeClass("car1");
         $("#car2").addClass("car2");
         } */


        var arr = this.multiActivated;
        var alpha = Math.PI * 2 / (arr.length);



        for (var i = 0; i < arr.length; i++) {
            var path = $("#" + this.reference + "-item-" + arr[i]);
            if (arr[i] == this.activated) {
                var depth = 0;
            } else {
                var depth = example9.mapDistanceReverse(this.multiPlus, i, arr.length, 0);
            }
            //
            var theta = alpha * (this.activated - arr[i] - depth / 6) + 1.6; // -depth/6 will give additional distance based on depth: it gives space for activated
            var x = 20 + xradius1 + Math.cos(theta) * xradius1;
            var y = yradius1 + Math.sin(theta) * yradius1;
            var w = h = y / 4;
            var scale = 0.2 + y / 140;
            if (arr[i] == this.activated) {
                scale = 1.5;
                y -= 30;
            }
            path.clearQueue().stop().css("z-index", Math.round(y / 10));
            if (perspective && transition) {
                path.css(transition.css, transform.css + " 1.3s cubic-bezier(" + bezcss + ")");
                path.css(transform.css, "translate3d(" + x + "px," + y + "px,0) scale(" + scale + ")");
            } else {
                path.animate({transformJ: 'translate(' + x + ',' + y + ') scale(' + scale + ')'}, {
                    queue: true,
                    duration: 1300,
                    specialEasing: {transformJ: bez}
                });
            }
        }
        $("#" + this.reference + "-item-" + this.deactivated).removeClass("active");
        $("#" + this.reference + "-item-" + this.activated).addClass("active").css("z-index", 100);
    }

    example9.init();
    example10.init();
    $(document).find('.active').removeClass('addactive');
}


car1.find('div').click(function() {
    var my_id = $(this).parent('div').attr('id');
    var my_class = $(this).parent('div').attr('class');
    if(my_id.localeCompare(my_class) == 0) {
        my_func();
    }
});

car2.find('div').click(function() {
    var my_id = $(this).parent('div').attr('id');
    var my_class = $(this).parent('div').attr('class');
    // alert(my_id);
    // alert(my_class);
    if(my_id.localeCompare(my_class) != 0) {
        my_func1();
    }
});