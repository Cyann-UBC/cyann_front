import React from 'react';
import { Router, Route, browserHistory} from 'react-router';

import App from './Components/App';
import Home from './Components/Home';
import Courses from './Components/Courses';
import About from './Components/About';
import Team from './Components/Team';

const routes = (
  <Router history={browserHistory}>
    <Route component={App}>
      <Route path="/" component={Home}></Route>
      <Route path='about' component={About}></Route>
      <Route path='team' component={Team}></Route>
      <Route path='courses' component={Courses}></Route>
    </Route>
  </Router>
);

export default routes;