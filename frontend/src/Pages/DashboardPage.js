import axios from 'axios';
import React, {useState, useEffect} from 'react';
import Dashboard from "../Components/Dashboard.js";

//props needed for pages that require redirection with push
const DashboardPage = (props) => {
  const [user, setUser] = useState({});

  const url = 'https://banking-system-rc.herokuapp.com';
  // const url = 'http://localhost:3000';
  // const url = 'http://localhost:5000';

  useEffect( () => {
    // Making a get request for dashboard (getting user data)

    //only runs when authenticated because server is checking for auth before it allows request to be made
    axios.get(`${url}/auth/user`)
    .then(res => {
      if(res.data) {
        // User received, authenticated
        setUser(res.data);
      }
      else{
        // No user found
        props.history.push("/");
      }
    })
    .catch((error) => {
      console.log(error);
    });
    
  }, [props.history]); //empty array at the end makes it only run on mount and unmount 

  return (
    <div> 
      {/* When rendered we are logged in, 
      and we pass down user retrieved from our get request */}
      <Dashboard {...props} user={user}/>
    </div> 
  );
}

export default DashboardPage;