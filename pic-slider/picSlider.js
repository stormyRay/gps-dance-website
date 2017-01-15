//Created by Raymond

/*/////////////////////////////////////////////////////////////
 *  Some pre-defined parameters, which should be defined as options in the app.
 */////////////////////////////////////////////////////////////
var Interval = 20; //interval of move steps
var Duration = 10; // indicate the duration of the moving, but not an exact time value. The lower it is, the faster the pic moves.
var Timer = 0;

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
        //temporary definition
        this.setOptions(options);
        var picOpts = options.pictures;
        this.container = document.getElementById("rootId");
        this.buildDOM(container);
        //

        this.timer = 0;
        this.setBasicPosition(this.picContainer, this.picList);
    },
    setOptions: function(opt){
        //default options
        if(!this.options)
            this.options = {
                normalWidth: 75,
                focusRatio: 1.5,
                maxWidth: 300,
                interval: 20,
                duration: 50
            };
        this.options.merge(opt || {});
    },
    buildDOM: function(container){
        //Need to add DOM build up logic here!!!

        this.picContainer = document.getElementsByClassName("pic-container")[0];
        this.picList = this.picContainer.children;
        this.picNumber = this.picList.length;
        var list = this.picList
        for(var i = 0; i < list.length; i++){
            list[i].addEvent("mouseover", function(index, e){
                this.launchMove(index);
            }.bind(this, i));
        }

        this.picContainer.addEvent("mouseout", function(e){
            this.launchMove()
        }.bind(this));

        return container;
    },
    setBasicPosition: function(container, children){
        var containerWidth = parseFloat(container.clientWidth);

        var width = containerWidth / this.picNumber;
        if(width <= this.options.normalWidth){
            width = this.options.normalWidth; 
        } else if(width >= this.options.maxWidth){
            width = this.options.maxWidth;
        }

        this.options.basicWidth = width;
        var leftPosition = 0, itemWidth = 0;
        for(var i = 0; i < children.length; i++){
            children[i].style.left = leftPosition+ "px";
            leftPosition += width;
        }

    },
    launchMove: function(index){
        this.lastUpdate = 0 + this.timer;
        var pos = 0;// Mark the right side of the previous one
        for(var i = 0; i < this.picNumber; i++){
            var movingTarget = this.picList[i];
            var now = parseFloat(movingTarget.style.left ? movingTarget.style.left : 0);
            if(now != pos)
                this.move(movingTarget, pos, this.lastUpdate);

            var width = this.options.basicWidth;
            if(index && i == index)
                width *= this.options.focusRatio;
            pos += width;
        }
    },
    move: function(target, position, time){
        this.timer++;
        if(time != this.lastUpdate){
            return;
        }

        var nowPos = parseFloat(target.style.left ? target.style.left : 0);
        target.style.left = nowPos + this.getStep(nowPos, position) + "px";

        if(Math.abs(nowPos - position) < 0.5){
            this.timer = 0;
        } else {
            setTimeout(function(){
                this.move(target, position, time);
            }.bind(this), this.interval);
        }
    },
    getStep: function(now, target){
        var step = (target - now) / this.options.duration;
        return step;
    }
}

var slider = new PicSlider("container", {});