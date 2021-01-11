import React from 'react'
import './Login.css'

import {Button} from '@material-ui/core'

import LOGO from '.././Assets/Logo.png';
import  {auth,provider} from '../Firebase/Firebase';
import { useStateValue } from '../StateProvider';
import { actionTypes } from '../reducer';
const Login = () => {

    const [{}, dispatch] = useStateValue();
    const signIn =()=>{
       auth.signInWithPopup(provider)
           .then((result) => {
                console.log("authdata",result.user);
                const datalogin =[];
                datalogin.push(result.user);
                const datavalue=[datalogin[0].photoURL,datalogin[0].displayName]

               // localStorage.setItem('Authdata', JSON.stringify(datalogin));
                localStorage.setItem('Authdata',datavalue);
                dispatch({
                    
                    type : actionTypes.SET_USER,
                    user : result.user,
                })

               
            })
           .catch((error) => 
                alert(error.message));
            }
   
    return (
        <div className="login">
          <div className="login__container">
              <img  src={LOGO} alt="" />
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
