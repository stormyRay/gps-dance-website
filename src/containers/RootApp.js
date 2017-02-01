import React from "react";
import {Provider} from "react-redux";
import App from "../components/App";
import { Router, Route, IndexRedirect, browserHistory } from "react-router";
import {createStore, applyMiddleware} from "redux";
import thunkMiddleware from "redux-thunk";
import reducers from "../reducers/index";
import DancersContainer from "./DancersContainer";
import Training from "../components/Training";
import BusinessCase from "../components/BusinessCase";
import Lessons from "../components/Lessons";
import Brand from "../components/Brand";
import AboutUs from "../components/AboutUs";

const store = createStore(reducers, {dancers: []},
    applyMiddleware(thunkMiddleware)
    );

class RootApp extends React.Component{
	constructor(props) {
		super(props);
	}

	render(){
		return(
			<Provider store={store} key="provider">
		    	<Router history={browserHistory}>
		    		<Route path="/" component={App}>
		    			<IndexRedirect to="/dancers" />
		    			<Route path="/dancers" component={DancersContainer} />
		    			<Route path="/training" component={Training} />
		    			<Route path="/business+case" component={BusinessCase} />
		    			<Route path="/lessons" component={Lessons} />
		    			<Route path="/brand" component={Brand} />
		    			<Route path="/about+us" component={AboutUs} />
					</Route>
		    	</Router>
			</Provider>
			)
	}
}

export default RootApp;