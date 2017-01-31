import React from "react";
import PicSlider from "../components//picSlider";
import { connect } from 'react-redux'
import { getDancers } from '../actions/index'
//import Dancers from '../components/Dancers'

class Dancers extends React.Component{
	constructor(props) {
		super(props);
	}

	componentDidMount() {
		const {dispatch} = this.props;
		dispatch(getDancers());
	}

	componentWillReceiveProps(nextProps) {
		const {dancers} = nextProps;
		var dancerSlider = new PicSlider("dancers_wrapper",{
			images: dancers,
			normalWidth: 80,
			focusIncrease: 7,
			formIntro: function(data){
				var _div = document.createElement("div");
				_div.innerHTML = data.name + data.danceType;
				return _div;
			}
		})
	}

	render() {
		return (
			<div id="dancers_wrapper" className="dancers">
			</div>
		)
	}
}

Dancers.propTypes = {
	updateDancers: React.PropTypes.func,
	dansers: React.PropTypes.array,
	dispatch: React.PropTypes.func
}
const mapStateToProps = (state, ownProps) => {
  return {
    dancers: state.dancers
  }
}

const DancersContainer = connect(
  mapStateToProps
)(Dancers)

export default DancersContainer;