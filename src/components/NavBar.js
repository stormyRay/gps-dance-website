import React from "react";
import ReactDOM from "react-dom";
import NavLink from "./NavLink";
import Overlay from "react-bootstrap/lib/Overlay";
import Clearfix from "react-bootstrap/lib/Clearfix";
import MenuItem from "react-bootstrap/lib/MenuItem";

class NavBar extends React.Component{
	constructor(props) {
		super(props);
		this.state = {
			showDropdown: {
				training: false
			}
		};
		this.toggleDropdown = this.toggleDropdown.bind(this);
		this.hideDropdown = this.hideDropdown.bind(this);
	}

	render(){
		const tagList = [{
			text: "DANCERS", value: "dancers"
		}, {
			text: "TRAINING", value: "training", subList: [{
				text: "KIDS", value: "kids"
			}, {
				text: "TEENS", value: "teens"
			}, {
				text: "ADULTS", value: "adults"
			}]
		}, {
			text: "LESSONS", value: "lessons"
		}, {
			text: "BUSINESS CASE", value: "business+case"
		}, {
			text: "BRAND", value: "brand"
		}, {
			text: "ABOUT US", value: "about+us"
		}];
		var NavList = [];
		for(var i = 0; i < tagList.length; i++){
			
			if(tagList[i].value == "training"){
				//USE Overlay!!!!!
				var dropdown = [];
				var subList = tagList[i].subList;
				var targetValue = tagList[i].value;
				var navItem = <NavLink key={"nav-" + targetValue} 
									onClick={(e) => this.toggleDropdown(e, targetValue)}
									ref={"target-" + targetValue}>
									{tagList[i].text}
								</NavLink>;
				for (var i = 0; i < subList.length; i++){
					dropdown.push(
						<MenuItem eventKey={targetValue + "/" + subList[i].value} key={subList[i].value}>{subList[i].text}</MenuItem>);
				}

				NavList.push(
					<li className="dropdown-container" key={"container-" + targetValue}>
						{navItem}
						<Overlay show={this.state.showDropdown[targetValue]} rootClose container={this} onHide={(e) => this.toggleDropdown(e, targetValue)} key={"overlay-" + targetValue} placement="bottom" target={() => ReactDOM.findDOMNode(this.refs["target-" + targetValue])}>
							<ul className="dropdown-menu open" key={"ul-" + targetValue}>
								{dropdown}
							</ul>
						</Overlay>
					</li>);
				
			} else {
				var navItem = <li key={"li-" + tagList[i].value}><NavLink key={"nav-" + tagList[i].value} to={"/" + tagList[i].value}>{tagList[i].text}</NavLink></li>;
				NavList.push(navItem);
			}
		}
		return (
			<ul className="nav-bar" role="nav">
				{NavList}
			</ul>
		)
	}

	toggleDropdown(e, linkValue){
		var dropdownState = Object.assign({}, this.state.showDropdown);
		dropdownState[linkValue] = !dropdownState[linkValue];
		this.setState({
			showDropdown: dropdownState
		});
	}

	hideDropdown(e, linkValue){
		var dropdownState = Object.assign({}, this.state.showDropdown);
		dropdownState[linkValue] = false;
		this.setState({
			showDropdown: dropdownState
		});
	}
}

export default NavBar;