import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
import store from './store';
import Navbar from './components/default components/navbar';
import Footer from './components/default components/footer';
import User from './components/users/users'
import Profile from './components/profile/profile';
import UpdateUser from './components/update users/updateUsers';
import Home from './components/home/home';
import Activities from './components/activities/activities'

class App extends Component {

  state = {
    logged: true,
    load: true,
    user: null
  }

  componentDidMount() {

    try {
      if (localStorage.getItem('token')) {

        this.setState({
          logged: this.state.logged,
          load: !this.state.load,
          user: localStorage.getItem('role')
        })
      }

    } catch{
      this.setState({
        logged: false,
        load: !this.state.load
      })
    }
  }

  render() {

    return (
      <Provider store={store}>
        <Router>
          <div className="App">
            <Navbar />
            <Route path="/" exact render={() => <Home logged={this.state.logged} />} />
            <Route path="/activities" render={() => (this.state.user === 'manager' ? <Activities props={this.state.user} /> : <Activities />)} />
            <Route path="/profile" render={() => (this.state.logged ? <Profile /> : <Redirect to='/' />)} />
            <Route path="/updateTeachers" render={() => (this.state.logged && this.state.user === 'manager' ? <UpdateUser props='teacher' /> : <User props='teacher' />)} />
            <Route path="/updateManagers" render={() => (this.state.logged && this.state.user === 'manager' ? <UpdateUser props='manager' /> : <User props='manager' />)} />
            <Route path="/updateStudents" render={() => (this.state.logged && (this.state.user === 'teacher' || this.state.user === 'manager') ? <UpdateUser props='student' /> : <Redirect to='/' />)} />
            <Route path="/myClass" render={() => (this.state.logged && (this.state.user === 'teacher' || this.state.user === 'student') ? <User props='student' /> : <Redirect to='/' />)} />
            <Route path="/teachers" render={() => (!this.state.logged ? <User props='teacher' /> : <Redirect to='/' />)} />
            <Route path="/managers" render={() => (!this.state.logged ? <User props='manager' /> : <Redirect to='/' />)} />
            <Footer />
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
