import React, {Fragment, useState} from 'react';
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import axios from 'axios';
import './App.css';
import Navbar from "./components/layout/Navbar";
import UsersList from "./components/users/UsersList";
import User from "./components/users/User";
import Search from "./components/users/Search";
import Alert from "./components/layout/Alert";
import About from "./components/pages/About";

import GithubState from './context/github/GithubState';

const App = () => {
  const [users, setUsers] = useState([]);
  const [user, setUser] = useState({});
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [alert, setAlerts] = useState(null);

  const getUser = async (username) => {
    setLoading(true);
    const res = await axios
      .get(`https://api.github.com/users/${username}?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);
    setLoading(false);
    setUser(res.data);
  };

  const getUserRepos = async (username) => {
    setLoading(true);
    const res = await axios
      .get(`https://api.github.com/users/${username}/repos?per_page=5&sort=created:asc&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);
    setRepos(res.data);
    setLoading(false);
  };

  const clearUsers = () => {
    setUsers([]);
    setLoading(false);
  };

  const showAlert = (msg, type) => {
    setAlerts({msg, type});
    setTimeout(() => setAlerts(null), 4000);
  };

  return (
    <GithubState>
      <Router>
        <div className="App">
          <Navbar title='GitHub Finder' icon='fab fa-github'/>
          <div className="container">
            <Alert alert={alert}/>
            <Switch>
              <Route exact path='/' render={() => (
                <Fragment>
                  <Search
                    showClear={users.length > 0}
                    clearUsers={clearUsers}
                    showAlert={showAlert}
                  />
                  <UsersList loading={loading} users={users}/>
                </Fragment>
              )}/>
              <Route exact path='/about' component={About}/>
              <Route exact path='/user/:login' render={props => (
                <User
                  {...props}
                  getUser={getUser}
                  getUserRepos={getUserRepos}
                  user={user}
                  repos={repos}
                  loading={loading}/>
              )}/>
            </Switch>
          </div>
        </div>
      </Router>
    </GithubState>
  );
};

export default App;
