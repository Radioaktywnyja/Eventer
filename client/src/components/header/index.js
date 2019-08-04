import React from "react";
import { Link, Route, Switch } from "react-router-dom";
import Entry from "./../entry";
import List from "./../list";
import Edit from "./../edit";
import ErrorNotFound from "./../../utils/ErrorNotFound"

const fontFamily = {
  fontFamily: 'Saira Stencil One',
}

const Header = () => {
    return(
      <div className="col-12 col-12" data-test="headerComponent">
        <div className="page-header text-center pb-1 mb-4 bg-dark text-light">
          <h1 className="font-weight-bold font-italic text-warning" style={fontFamily}>-- Eventer --</h1>
          <h3>Register new participants for our fabulous event!</h3>
          <h5>Choose your date and we will come to you!</h5>
        </div>
        <div className="text-center">
          <Link className="btn btn-info mr-3" to="/" data-test="linkToList">List of participants</Link>&nbsp;
          <Link className="btn btn-info" to="/entry" data-test="linkToEntry">Register</Link>
        </div>
        <Switch>
          <Route exact path="/" component={List} />
          <Route path="/entry" component={Entry} />
          <Route path="/edit/:id" component={Edit} />
          <Route path="*" component={ErrorNotFound} />
        </Switch>
      </div>
    );
}

export default Header;
