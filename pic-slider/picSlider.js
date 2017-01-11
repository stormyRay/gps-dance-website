//Created by Raymond

/*/////////////////////////////////////////////////////////////
 *  Some pre-defined parameters, which should be defined as options in the app.
 */////////////////////////////////////////////////////////////
var Interval = 20; //interval of move steps
var Step = 0.5; // distance of one step at each time
var Timer = 0;

/*/////////////////////////////////////////////////////////////
 *  function for moving a div
 *  For initial testing only!
 */////////////////////////////////////////////////////////////
function move(id, distance){
	Timer++;
	if(typeof id !== "string" ||
		typeof distance !== "number"
		){
		console.error("Incorrect input type, please check the inputs.")
	}

	var target = document.getElementById(id);
	if(!target) return;
	var nowPos = parseFloat(target.style.left ? target.style.left : 0);
	target.style.left = nowPos + distance * Step / Math.abs(distance) + "px";

	if(distance <= 0){
		Timer = 0;
	} else {
		setTimeout(function(){
			move(id, distance - Step);
		}, Interval);
	}


}