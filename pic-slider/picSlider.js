//Created by Raymond

/*/////////////////////////////////////////////////////////////
 *  Some pre-defined parameters, which should be defined as options in the app.
 */////////////////////////////////////////////////////////////
var Interval = 20; //interval of move steps
var Duration = 10; // indicate the duration of the moving, but not an exact time value. The lower it is, the faster the pic moves.
var Timer = 0;

/*/////////////////////////////////////////////////////////////
 *  function for moving a div
 *  For initial testing only!
 */////////////////////////////////////////////////////////////
function move(id, position){
    Timer++;
    if(typeof id !== "string" ||
        typeof position !== "number"
        ){
        console.error("Incorrect input type, please check the inputs.")
    }

    var target = document.getElementById(id);
    if(!target) return;
    var nowPos = parseFloat(target.style.left ? target.style.left : 0);
    target.style.left = nowPos + getStep(nowPos, position) + "px";

    if(Math.abs(nowPos - position) < 0.5){
        Timer = 0;
    } else {
        setTimeout(function(){
            move(id, position);
        }, Interval);
    }


}

function getStep(now, target){
    var step = (target - now) / Duration;
    return step;
}

var Class = {
    create: function(){
        return function(){
            this.initialize.apply(this, arguments);
        }
    }
}

Object.prototype.merge = function(source){
    for(var property in source){
        this[property] = source[property];
    }

    return this;
}

Object.prototype.addEvent = function(type, func){
    if (this.addEventListener) {
        this.addEventListener(type, func, false);
    } else if (this.attachEvent) {
        this.attachEvent("on" + type, func);
    } else {
        this["on" + type] = func;
    }
}

var PicSlider = Class.create();
PicSlider.prototype = {
    initialize: function(rootId, options){
        //comtemporary definition
        this.picContainer = document.getElementsByClassName("pic-container")[0];
        this.setOptions(options);
        var picOpts = options.pictures;
        this.buildDOM(container);
        //

        this.container = document.getElementById("rootId");
        this.timer = 0;

        var picList = this.picContainer.children;
        this.setBasicPosition(this.picContainer, picList);
    },
    setOptions: function(opt){
        //default options
        if(!this.options)
            this.options = {
                normalWidth: 75,
                focusRatio: 1.5,
                maxWidth: 300,
                interval: 20,
                duration: 10
            };
        this.options.merge(opt || {});
    },
    buildDOM: function(container){
        //Need to add DOM build up logic here!!!

        this.picContainer.children.map(function(child){
            child.addEvent("mouseover")
        });
        return container;
    },
    setBasicPosition: function(container, children){
        var containerWidth = parseFloat(container.clientWidth);
        var picNumber = children.length;

        var width = containerWidth / picNumber;
        if(width <= this.options.normalWidth){
            width = this.options.normalWidth; 
        } else if(width >= this.options.maxWidth){
            width = this.options.maxWidth;
        }

        var leftPosition = 0, itemWidth = 0;
        for(var i = 0; i < children.length; i++){
            children[i].style.left = leftPosition + width + "px";
        }

    }
}

var slider = new PicSlider("container", {});