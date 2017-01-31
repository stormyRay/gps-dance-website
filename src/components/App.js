import React from "react";
import NavBar from "./NavBar";

class App extends React.Component{
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div className="root-wrapper">
				<div className="gps-logo">LOGO PLACEHOLDER</div>
				<NavBar />
				<div className="content-wrapper">
					{this.props.children}
				</div>
			</div>
		)
	}
}

export default App;