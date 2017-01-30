import React from "react";
import {IndexRoute, Route, history} from "react-router";
import {App} from "./components/App";

class routes extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<Route path="/" component={App}>
			</Route>
		)
	}
}

export default routes;