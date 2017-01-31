import React from "react";
import NavLink from "./NavLink";

class NavBar extends React.Component{
	constructor(props) {
		super(props);
	}

	render(){
		const tagList = [{
			text: "DANCERS", value: "dancers"
		}, {
			text: "TRAINING", value: "training"
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
			NavList.push(
				<li key={tagList[i].value}><NavLink key={tagList[i].value} to={"/" + tagList[i].value}>{tagList[i].text}</NavLink></li>);
		}
		return (
			<ul className="nav-bar" role="nav">
				{NavList}
			</ul>
		)
	}
}

export default NavBar;