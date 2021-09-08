import React from "react";
import { Redirect } from "react-router-dom";

import NavBar from "../Components/NavBar.js";
import SignUp from "../Components/SignUp.js";

const Register = (props) => {

  const user = undefined;

  return (
    <div className="page">
      <div> 
        { 
          user ? ( <Redirect to="/" /> ) : (<div className="page">
          <NavBar isLoggedIn={false}/>
          </div>  )
        }
      </div> 
      <SignUp {...props} />
    </div>
  );
};

export default Register;