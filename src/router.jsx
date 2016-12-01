import React from 'react';
import { Router, Route, browserHistory} from 'react-router';

import App from './Components/App';
import Home from './Components/Home';
import Courses from './Components/Courses';
import About from './Components/About';
import Team from './Components/Team';
import prof from './Components/prof';
import Profile from './Components/Profile';

const routes = (
  <Router history={browserHistory}>
      <Route path='/' component={Home}>
        {/* <Route path='/course/:value' component={Courses} /> */}
      </Route>
      <Route path='courses' component={Courses}/>
      <Route path='about' component={About}></Route>
      <Route path='team' component={Team}></Route>
      <Route path='prof' component={prof}></Route>
      <Route path='profile' component={Profile}></Route>
  </Router>
);

export default routes;
