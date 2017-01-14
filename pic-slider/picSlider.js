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