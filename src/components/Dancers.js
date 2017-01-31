import React from "react";
import PicSlider from "./picSlider";

class Dancers extends React.Component{
	constructor(props) {
		super(props);
	}

	componentDidMount() {
		const {updateDancers} = this.props;
		updateDancers();
	}

	componentWillReceiveProps(nextProps) {
		const {dancers} = this.nextProps;
		// var dancerSlider = PicSlider("dancers_wrapper",{
		// 	images: dancers,
		// 	normalWidth: 80,
		// 	focusIncrease: 5,
		// 	formIntro: function(data){
		// 		return (<div>{data.name + data.danceType}</div>)
		// 	}
		// })
	}

	render() {
		return (
			<div id="dancers_wrapper" className="dancers">
				Dancers
			</div>
		)
	}
}

Dancers.propTypes = {
	updateDancers: React.PropTypes.func,
	dansers: React.PropTypes.array
}

export default Dancers;