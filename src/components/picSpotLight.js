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

var merge = function(target, source){
    for(var property in source){
        target[property] = source[property];
    }

    return target;
}

var addEvent = function(target, type, func){
    if (target.addEventListener) {
        target.addEventListener(type, func, false);
    } else if (target.attachEvent) {
        target.attachEvent("on" + type, func);
    } else {
        target["on" + type] = func;
    }

    return target;
}

var appendNode = function(target, tagName, opt){
    var node = document.createElement(tagName);
    Object.keys(opt).map(function(prop){
        if(typeof opt[prop] == "function"){
            addEvent(node, prop, opt[prop]);
        } else{
        node.setAttribute(prop, opt[prop]);
        }
    });
    target.appendChild(node);
    return node;
}

var childNodesOfClass = function(target, className){
    var children = target.childNodes;
    var results = [];
    for(var i = 0; i < children.length; i++){
        if(!children[i].classList){
            var classList = children[i].className.split(" ");
            for(var k = 0; k < classList.length; k++){
                if(classList[k] == className){
                    results.push(children[i]);
                    break;
                }
            }
        } else{
            if(children[i].classList.contains(className))
                results.push(children[i]);
        }
    }
    if(results.length == 1)
        return results[0]
    else
        return results;
}

var formStyle = function(opts){
    var str = "";
    var keys = Object.keys(opts);
    for(var i = 0; i < keys.length; i ++){
        str = str + keys[i] + ":" + opts[keys[i]] + ";";
    }
    return str;
}

var PicSpotLight = Class.create();
PicSpotLight.prototype = {
    initialize: function(rootId, options){
        //Initialize the options
        this.viewportLeftOffset = 0;
        this.movingViewport = false;
        this.timer = 0;
        this.lastUpdate = 0;
        this.expandedIndex = -1;
        this.positions = {};
        this.basicOffsets = {};
        this.showScroll = false;

        //temporary definition
        this.setOptions(options);
        var picOpts = options.images;
        this.container = document.getElementById(rootId);
        this.buildDOM(this.container);
        //
        this.setBasicPosition(this.picContainer, this.picList);
        addEvent(window, "resize", function(){
        	this.setBasicPosition(this.picContainer, this.picList);
        }.bind(this));
    },
    setOptions: function(opt){
        //default options
        if(!this.options)
            this.options = {
                normalWidth: 75,
                focusIncrease: 10,
                infoLeft: 0.4,
                maxWidth: 300,
                interval: 20,
                duration: 20,
                srcPath: "img/",
                introAttr: "information"
            };
        merge(this.options, opt || {});
    },
    buildDOM: function(container){
        //Need to add DOM build up logic here!!!
        this.viewport = appendNode(container, "div", {
            id: "pic_slider_viewport",
            class: "slider-viewport"
        });


        this.picContainer = appendNode(this.viewport, "div",{
            id: "pic_slider_container",
            class: "pic-container",
            mouseover: function(e) { 
                if(this.expandedIndex < 0)
                    this.showHideHandlers(true);
            }.bind(this),
            mouseout: function(e){
                this.showHideHandlers(false);
                this.launchMove();
            }.bind(this)
        })

        var images = this.options.images;
        this.picNumber = images.length;
        for(var i = 0; i < images.length; i ++){
            var picWrapper = appendNode(this.picContainer, "div", {
                id: "pic_wrapper_" + images[i].name,
                class: "pic-wrapper",
                mouseover: function(index, e){
                    this.launchMove(index);
                }.bind(this, i),
                click: function(index, e){
                    this.handleClick(index);
                }.bind(this, i)
            });

            var offset = (this.options.normalWidth / 2 - images[i].center);
            var image = appendNode(picWrapper, "img", {
                id: "pic_" + images[i].name,
                class: "image",
                src: this.options.srcPath + images[i].img,
                style: formStyle({
                    left: offset +"px"
                })
            });

            this.positions[image.id] = offset;
            this.basicOffsets[image.id] = offset;
        }

        this.picList = childNodesOfClass(this.picContainer, "pic-wrapper");

        this.picIntro = appendNode(this.picContainer, "div", {
            id: "pic_information",
            class: "pic-intro"
        });
        this.previousHandler = appendNode(this.picContainer, "div", {
            id: "previous",
            class: "handling previous",
            mousedown: function(e){
                this.movingViewport = true;
                this.moveViewport("previous");
            }.bind(this),
            mouseup: function(e){
                this.movingViewport = false;
            }.bind(this),
            mouseleave: function(e){
                this.movingViewport = false;
            }.bind(this)
        });


        this.nextHandler = appendNode(this.picContainer, "div", {
            id: "next",
            class: "handling next",
            mousedown:  function(button, e){
                this.movingViewport = true;
                this.moveViewport("next");
            }.bind(this),
            mouseup: function(e){
                this.movingViewport = false;
            }.bind(this),
            mouseleave:  function(e){
                this.movingViewport = false;
            }.bind(this)
        });

        this.nextHandler.style.display = "none";        
        this.previousHandler.style.display = "none";

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
            this.positions[children[i].id] = leftPosition;
            leftPosition += width;
            var imageTarget = childNodesOfClass(children[i], "image");
            var imageLeft = (width / 2 - this.options.images[i].center);
            imageTarget.style.left = imageLeft+ "px";
            this.positions[imageTarget.id] = imageLeft;
        }

        var introLeft = Math.max(this.picNumber * this.options.normalWidth, container.clientWidth);
        this.showScroll = (this.picNumber * this.options.normalWidth > container.clientWidth);
        if(this.picNumber * this.options.normalWidth + this.viewportLeftOffset <= container.clientWidth){
            this.viewportLeftOffset = 0;
            this.picContainer.style.left = "0px";
        }

            this.nextHandler.style.right = 20 + this.viewportLeftOffset + "px";
            this.previousHandler.style.left = 20 - this.viewportLeftOffset + "px";
        this.picIntro.style.left = introLeft + "px";
        this.positions[this.picIntro.id] = introLeft;
    },
    updateIntro: function(data){
    	var introData = data[this.options.introAttr];
    	if(introData){
    		var introDOM = this.options.formIntro(introData);
    		this.picIntro.innerHTML = "";
    		this.picIntro.appendChild(introDOM);
    	}
    },
    launchMove: function(index){
        if(this.expandedIndex >= 0)
            return;
        this.lastUpdate = 0 + this.timer;
        var pos = 0;// Mark the right side of the previous one
        for(var i = 0; i < this.picNumber; i++){
            var movingTarget = this.picList[i];
            var now = parseFloat(movingTarget.style.left ? movingTarget.style.left : 0);
            if(now != pos)
                this.positions[movingTarget.id] = pos;
                //this.move(movingTarget, pos, this.lastUpdate);

            var width = this.options.basicWidth;
            if(typeof index ==="number"){
                if(i == index)
                    width += this.options.focusIncrease * (this.picNumber -1);
                else{
                    width -= this.options.focusIncrease;
                }
            }
            var imageTarget = childNodesOfClass(movingTarget, "image");
            this.positions[imageTarget.id] = (width / 2 - this.options.images[i].center)
            pos += width;
        }
        this.positions["pic_information"] = Math.max(this.picNumber * this.options.normalWidth, this.container.clientWidth);

        this.moveGroup(this.positions, this.lastUpdate);
    },
    collapse: function(index) {
        this.expandedIndex = -1;
        this.launchMove(index);
        this.showHideHandlers(true);
    },
    handleClick: function(index){
        if(this.expandedIndex >= 0){
            this.collapse(index);
            return;
        }
        this.lastUpdate = 0 + this.timer;
        var containerWidth = parseFloat(this.picContainer.clientWidth);
        for(var i = 0; i < this.picNumber; i++){
            var movingTarget = this.picList[i];
            var pos;
            if(i < index){
                pos = -1 * this.viewportLeftOffset;
            } else if (i == index){
                pos = -1 * this.viewportLeftOffset;
                var imageTargetId = childNodesOfClass(movingTarget, "image").id;
                this.positions[imageTargetId] = 0;
            } else{
                pos = -1 * this.viewportLeftOffset + containerWidth;
            }
            this.positions[movingTarget.id] = pos;
            //this.move(movingTarget, pos, this.lastUpdate);
        }
        //this.positions["pic_information"] = -1 * this.viewportLeftOffset + containerWidth - this.picIntro.clientWidth;
        this.positions["pic_information"] = -1 * this.viewportLeftOffset + this.options.infoLeft * containerWidth;
        this.updateIntro(this.options.images[index]);
        this.moveGroup(this.positions, this.lastUpdate);
        this.expandedIndex = index;
        this.showHideHandlers(false);
    },
    move: function(target, position, time){
        this.timer++;
        if(time != this.lastUpdate){
            return;
        }

        var nowPos = parseFloat(target.style.left ? target.style.left : 0);
        target.style.left = nowPos + this.getStep(nowPos, position) + "px";

        var imgTarget = childNodesOfClass(target, "image");

        if(Math.abs(nowPos - position) < 0.5){
            this.timer = 0;
        } else {
            setTimeout(function(){
                this.move(target, position, time);
            }.bind(this), this.interval);
        }
    },
    moveGroup: function(positions, time){
        this.timer++;
        if(time != this.lastUpdate){
            return;
        }

        var targets = Object.keys(positions);
        var offset = 0; // signal of all the components are in good position
        for(var i = 0; i < targets.length; i++){
            var targetId =  targets[i];
            var target = document.getElementById(targetId);
            var position = positions[targetId];
            var nowPos = parseFloat(target.style.left ? target.style.left : 0);
            target.style.left = nowPos + this.getStep(nowPos, position) + "px";

            var distance = Math.abs(nowPos - position)
            offset = Math.max(offset, distance);
        }

        if(offset < 0.5){
                this.timer = 0;
        } else {
            setTimeout(function(){
                this.moveGroup(positions, time);
            }.bind(this), this.interval);
        }
    },
    getStep: function(now, target){
        var step = (target - now) / this.options.duration;
        return step;
    },
    moveViewport: function(button) {
            this.nextHandler.style.right = 20 + this.viewportLeftOffset + "px";
            this.previousHandler.style.left = 20 - this.viewportLeftOffset + "px";
        if(!this.movingViewport || this.expandedIndex >= 0)
            return;
        if((this.viewportLeftOffset >= 0 && button == "previous")||
            (this.viewportLeftOffset <= -1 * this.picNumber * this.options.normalWidth + this.viewport.clientWidth && button == "next"))
            return;
        setTimeout(function(){
            if(button == "previous"){
                var offset = 5;
            } else if (button == "next"){
                var offset = -5;
            }
            this.viewportLeftOffset += offset;
            this.picContainer.style.left = this.viewportLeftOffset + "px";
            this.moveViewport(button);
        }.bind(this), this.options.interval);
    },
    showHideHandlers: function(show){
    	if(this.showScroll){
    	    this.nextHandler.style.display = show ? "block" : "none";
            this.previousHandler.style.display =  show ? "block" : "none";
        }
    }
}

export default PicSpotLight;