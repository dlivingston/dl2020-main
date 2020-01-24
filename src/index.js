import React from "react";
import ReactDOM from "react-dom";
import { Route, Link, Switch, BrowserRouter as Router } from 'react-router-dom';
import Home from './routes/Home';
import Portfolio from './routes/Portfolio';

const user = {
    name: 'Don',
    email: 'donlivingston@gmail.com'
}

const Index = (props) => {
    return <div className="foo">Hello {props.name}!</div>;
}

const routing = (
    <Router>
        <div>
            <div>
                <nav>
                    <Link to="/">Home</Link>
                    <Link to="/portfolio">Portfolio</Link>
                </nav>
            </div>
            <Switch>
                <Route exact path="/">
                    <Home />
                </Route>
                <Route path="/portfolio">
                    <Portfolio />
                </Route>
            </Switch>
        </div>
    </Router>
)

ReactDOM.render(routing, document.getElementById("main"));