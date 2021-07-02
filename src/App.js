import './App.css';
import React from 'react';
import Blog from './pages/blog';
import Amplify from '@aws-amplify/core';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

import awsExports from "./aws-exports";
Amplify.configure(awsExports);

function App() {
  return (
    <Router>
      <div>
        Build the navbar component here. 
      </div>
      <div>
      <Switch>
        <Route path="/blog" exact component={Blog} />
        <Route path="/users" component={Blog} />
      </Switch>
      </div>
      
    </Router>
    
    
   
  );
}

export default App;
