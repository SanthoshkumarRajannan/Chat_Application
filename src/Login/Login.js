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
            console.log("authdata",result.user);
               dispatch({
                  
                   type : actionTypes.SET_USER,
                   user : result.user,
               })

               const datalogin =[];
              // const hey ="sfDFDF";
               datalogin.push(result.user);
               console.log("datalogin",datalogin[0].displayName);
           const datavalue=[datalogin[0].photoURL,datalogin[0].displayName]
               localStorage.setItem('Authdata',datavalue);


           })
           .catch((error) => alert(error.message));
    }
   
    return (
        <div className="login">
          <div className="login__container">
              {/* <img  src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg"/>
              https://en.wikipedia.org/wiki/File:Chat_bubbles.svg */}
              
              <img  src="https://upload.wikimedia.org/wikipedia/commons/7/7f/Speech_bubble.svg" alt="" />
              <div className="login__text">
                 <h1>Sign in to Chat Application</h1>
              </div>
              <Button  onClick={signIn}>
                  Sign In with Google
              </Button>
          </div>
        </div>
    );
}

export default Login
