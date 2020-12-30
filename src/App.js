import React, { useState } from 'react';
import './App.css';

import Chat from './Chat/Chat'
import Sidebar from './Sidebar/Sidebar';

import {BrowserRouter as Router,Switch,Route} from 'react-router-dom'
const App=()=> {
  
  const [user,setUser] = useState("santhosh");
    return (
      <div className="App">

        {!user ? (
          <h1>LOGIN</h1>
        ) : (
          <div className="App_Body">
              <Router> 
              <Sidebar />
                <Switch>   
                <Route path="/rooms/:roomId">  
                    <Chat />
                  </Route>
                <Route path="/">
                    {/* <Chat />  */}
                  </Route>
                </Switch>
              </Router>
            
        </div>
        )}


      </div>
    );
  
}

export default App;
