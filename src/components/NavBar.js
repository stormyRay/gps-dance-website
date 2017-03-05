import React from "react";
import NavLink from "./NavLink";
import Dropdown from "react-bootstrap/lib/Dropdown";
import MenuItem from "react-bootstrap/lib/MenuItem";

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
				var dropdown = [];
				var subList = tagList[i].subList;
				var navItem = <NavLink key={"nav-" + tagList[i].value} to={"/" + tagList[i].value} bsRole="toggle">{tagList[i].text}</NavLink>;
				for (var i = 0; i < subList.length; i++){
					dropdown.push(
						<MenuItem eventKey={tagList[i].value + "/" + subList[i].value} key={subList[i].value}>{subList[i].text}</MenuItem>);
				}

				NavList.push(
					<Dropdown rootCloseEvent="click" id="training-dropdown">
						{navItem}
						<div className="dropdown-menu" bsRole="menu">
							<ul>
								{dropdown}
							</ul>
						</div>
					</Dropdown>);
				
			} else {
				var navItem = <li key={tagList[i].value}><NavLink key={tagList[i].value} to={"/" + tagList[i].value}>{tagList[i].text}</NavLink></li>;
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