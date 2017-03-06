import React from "react";
import ReactDOM from "react-dom";
import NavLink from "./NavLink";
import NavDropdown from "./NavDropdown";

class NavBar extends React.Component{
	constructor(props) {
		super(props);
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
				NavList.push(<NavDropdown key={"dropdown-" + tagList[i].value} tagListItem={tagList[i]}></NavDropdown>);
				
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

}

export default NavBar;