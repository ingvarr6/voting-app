import React, {Component} from 'react'
import { Provider } from 'react-redux'
import store from '../store/index'
import '../assets/styles/bootstrap.css'
import Vote from '../containers/Vote'
import Polls from '../containers/Polls'
import Auth from '../containers/Auth'
import Header from '../components/Header'
import Logout from '../containers/Logout'
import UserPolls from '../containers/UserPolls'
import CreatePoll from '../containers/CreatePoll'

import {BrowserRouter as Router, Route, Redirect} from 'react-router-dom'

class App extends Component {
  render() {
    return (
      <Provider key={ module.hot ? Date.now() : store} store={store}>
        <Router>
          <div>
            <Header />
            <Route exact path="/" component={Vote}/>
            <Route path="/vote/:_id" component={Polls}/>
            <Route path="/login/twitter/return" component={Auth} />
            <Route isAuth={store.getState().authReducer} path="/mypolls" component={UserPolls} />
            <Route path="/logout" component={Logout} />
            <Route path="/newpoll" component={CreatePoll} />
          </div>
        </Router>
      </Provider>
    )
  }
}

export default App
