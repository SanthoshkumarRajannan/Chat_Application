import React from 'react'
import './Login.css'

import {Button} from '@material-ui/core'


import  {auth,provider} from '../Firebase/Firebase';
import { useStateValue } from '../StateProvider';
import { actionTypes } from '../reducer';
const Login = () => {

    const [{}, dispatch] = useStateValue();
    const signIn =()=>{
       auth.signInWithPopup(provider)
           .then((result) => {
            console.log("authdata",result.user.uid);
               dispatch({
                  
                   type : actionTypes.SET_USER,
                   user : result.user,
               })

               const datalogin =[];
               datalogin.push(result.user.uid);
               console.log("datalogin",datalogin);
               localStorage.setItem('Authdata',datalogin);


           })
           .catch((error) => alert(error.message));
    }
   
    return (
        <div className="login">
          <div className="login__container">
              <img  src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg"/>
              <div className="login__text">
                 <h1>Sign in to WhatsApp</h1>
              </div>
              <Button  onClick={signIn}>
                  Sign In with Google
              </Button>
          </div>
        </div>
    );
}

export default Login
