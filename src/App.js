import React, { Component } from 'react';
import { BrowserRouter, Switch, Route, Redirect} from 'react-router-dom';
import Login from './components/login/Login';
import PrivateRoute from './components/utils/PrivateRoute'
import PublicRoute from './components/utils/PublicRoute';
import ScoreApp from './ScoreApp';
import './App.css';

class App extends Component {
  render() {
    return (
	  <React.Fragment>
      <div className="App">
      <BrowserRouter>
        <div>
          <div className="content">
            <Switch>
              <Route path="/login">
		          <Login />
		        </Route>
		        <PrivateRoute path="/dashboard">
		          <ScoreApp />
		        </PrivateRoute>
		        <Route exact path="/">
		          <Redirect exact from="/" to="dashboard" />
		        </Route>
		        <Route path="*">
		          <Redirect from="/" to="dashboard" />
		        </Route>
            </Switch>
          </div>
        </div>
      </BrowserRouter>
    </div>
    </React.Fragment>
    );
  }
}

export default App;
