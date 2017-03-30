import React from "react";
import picSpotLight from "../components/picSpotLight";
import { connect } from "react-redux";
import { getDancers } from "../actions/index";

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
		var dancerSlider = new picSpotLight("dancers_wrapper",{
			images: dancers,
			focusIncrease: 25,
			normalWidth: 80,
			focusIncrease: 7,
			formIntro: function(data){
				var _div = document.createElement("div");
				_div.setAttribute("class", "info-wrapper");
				//_div.innerHTML = data.name + data.danceType;
				var resumesHTML =``;
				if(data.resumes){
					for(var i = 0; i < data.resumes.length; i ++){
						resumesHTML += `<div class="resume-item">${data.resumes[i]}</div>`
					} 
				}
				_div.innerHTML = `
					<div class="description-wrapper">
						<div class="name-wrapper">
							<div class="name">${data.name}</div>
							<div class="english-name">${data.eName}</div>.
						</div>
						<div class="desc-line">
							<div class="desc-label">擅长舞蹈风格</div>
							<div class="desc-content">${data.danceType}</div>
						</div>
						<div class="desc_label resume_label">个人履历</div>
						<div class="resume-area">${resumesHTML}</div>
					</div>`;
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