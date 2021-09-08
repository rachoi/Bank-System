import React from 'react';

import NavBar from "../Components/NavBar.js";
import SignIn from "../Components/SignIn.js";


const Login = (props) => {

  return (
    <div className="page">
      <div> 
        { 
          <div className="page">
            <NavBar isLoggedIn={false}/>
          </div>  
        }
      </div> 
      <SignIn {...props} />
    </div>
  );
};

export default Login;