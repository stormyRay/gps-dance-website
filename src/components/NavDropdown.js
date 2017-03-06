import React from "react";
import ReactDOM from "react-dom";
import NavLink from "./NavLink";
import Overlay from "react-bootstrap/lib/Overlay";
import MenuItem from "react-bootstrap/lib/MenuItem";

class NavDropdown extends React.Component{
	constructor(props) {
		super(props);
		this.state = {
			showDropdown: false
		};
		this.toggleDropdown = this.toggleDropdown.bind(this);
		this.hideDropdown = this.hideDropdown.bind(this);
	}
  	render() {
  		const {tagListItem}= this.props;
  		var dropdown = [];
  		var subList = tagListItem.subList;
		var targetValue = tagListItem.value;
		var navItem = <NavLink onClick={this.toggleDropdown} ref={"target-" + targetValue}>{tagListItem.text}</NavLink>;
  		for (var i = 0; i < subList.length; i++){
  			dropdown.push(
  				<MenuItem eventKey={targetValue + "/" + subList[i].value} key={subList[i].value}>{subList[i].text}</MenuItem>);
  		}
    	return (
    		<li className="dropdown-container" key={"container-" + targetValue}>
    			{navItem}
    			<Overlay show={this.state.showDropdown} rootClose container={this} onHide={this.hideDropdown} placement="bottom" target={() => ReactDOM.findDOMNode(this.refs["target-" + targetValue])}>
    				<ul className="dropdown-menu open">
    					{dropdown}
    				</ul>
    			</Overlay>
    		</li>
			)
  	}

	toggleDropdown(e){
		this.setState({
			
			showDropdown: !this.state.showDropdown
		});
	}

	hideDropdown(e, linkValue){
		this.setState({
			showDropdown: false
		});
	}
}

export default NavDropdown;
