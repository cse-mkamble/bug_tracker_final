import React from "react";
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";

import BugList from "./Container/BugList";
import BugEdit from "./Container/BugEdit"

class NoPageFound extends React.Component {
    render() {
        return (
            <h1>
                404
            </h1>
        )
    }
}

export default class App extends React.Component {
    render() {
        return (
            <Router>
                <Switch>
                    {/* <Route path="/" component={BugList} />
                    <Route path="/bugs/:id" component={BugEdit} /> */}

                    <Route exact path="/bugs" component={BugList} />
                    <Route path="/bugs/:id" component={BugEdit} />
                    <Redirect from="/" to="/bugs" />
                    <Route path="*" component={NoPageFound} />
                </Switch>
            </Router>
        )
    }
}