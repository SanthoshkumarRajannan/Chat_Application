import React, { useState } from 'react';
import './App.css';

import Chat from './Chat/Chat'
import Sidebar from './Sidebar/Sidebar';
import Login from './Login/Login'
//import ProtectedRoute from './ProtectedRoute';
import {BrowserRouter as Router,Switch,Route} from 'react-router-dom'
import { useStateValue } from './StateProvider';

const App=()=> {
  const [{ user} , dispatch] = useStateValue();

//const [user,setLoginUser]=useState("");
  const isAuthdata= localStorage.getItem("Authdata");
   

//    const[Darkmode,setDarkmode] = useState(false);
//  const setMode =()=>{
//    setDarkmode(!Darkmode);
//  }
  //const user =userlogin;

  //console.log("isAuthdata",isAuthdata)
    return (
      <div className= "App">
           {/* {  datauser ==null && isAuthdata !=null ?  setLoginUser(isAuthdata)
            : datauser !=null && isAuthdata ==null ? setLoginUser(datauser)
             : datauser !=null && isAuthdata !=null ? setLoginUser(datauser)
             : setLoginUser("") }   && !isAuthdata*/}
        { !user && !isAuthdata ?  (
         <Login />
        ) : (
          <div className="App_Body">
           
              <Router> 
              
              <Sidebar  />
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
