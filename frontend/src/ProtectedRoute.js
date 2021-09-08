import React, { useState, useEffect, useRef } from 'react';
import {Route, Redirect} from 'react-router-dom'
import axios from 'axios';
import CircularProgress from '@material-ui/core/CircularProgress';

const url = 'https://banking-system-rc.herokuapp.com';
// const url = 'http://localhost:3000';
// const url = 'http://localhost:5000';

export const ProtectedRoute = ({ component: Component, user, ...rest}) =>{

    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [loading, setLoading] = useState(false);

    const mountedRef = useRef(true);

    useEffect( () => {
        // Attempting a get request/getting authenticated user 
       axios.get(`${url}/auth/user`).then(res => {
            if(res.data) {
                // console.log("Authentication verified");
                setIsLoggedIn(true);
                setLoading(true);
            }
            else{
                // console.log("Not authenticated, no response");
            }
            
        })
        .catch((error) => {
            console.log(error);
            setLoading(true);
        });


        return () => {
            mountedRef.current = false
        }

    }, []); 
    



    return (
        <div>
            {
               loading ? <div> 
                   <Route {...rest} render={ (props) => {
                        if(isLoggedIn === true) {
                            return <Component {...rest} {...props}/>
                        }
                        else{
                            return <Redirect to={
                                {
                                    pathname: "/",
                                    state: {
                                        from: props.location
                                    }
                                }
                            } />
                        }    
                    }
                        
                    }/>
                </div> : 
                <div style={{display: "flex", justifyContent: "center", alignItems: "center"}}> 
                    <CircularProgress/> 
                </div>
            }
        </div>
    )
}