import React, { useEffect } from 'react';
import { Link } from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import axios from "axios";


const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  colors: {
    background: 'white',
    color: '#333333',
    padding: '0 30px',
    // boxShadow: 'none'
  },
  buttonDiv: {
    padding: '5px'
  },
  linkDeco: {
    textDecoration: "none",
    color: '#333333',
  },
}));

const url = 'https://banking-system-rc.herokuapp.com';
// const url = 'http://localhost:3000';
// const url = 'http://localhost:5000';


export default function ButtonAppBar(props) {
  const classes = useStyles();

  const [isLoggedIn, setIsLoggedIn] = React.useState(props);

  useEffect( () => {
      setIsLoggedIn(props);
    }, [props])

   const logOut = () => {
    axios.delete(`${url}/logout`)
    .then( res =>{
      if(res.data.success === true) {
        props.history.push(url);
      }
    })
    .catch((error) => {
      console.log(error);
    });
   
    

  };

  

  return (
    <div className={classes.root}>
      {/* colors for the AppBar passed by className, this overrides the MuiAppBar-colorPrimary property*/}
      <AppBar position="static" className={classes.colors}>
          <Toolbar>
            <Typography variant="h6" className={classes.title}>
              {/* <Link className={classes.linkDeco} to={"/"}> 
                
              </Link> */}
              Banking System
            </Typography>
            
            {/* if isLoggedIn is true, show log out, else show login */}

            {isLoggedIn.isLoggedIn ? 
            (
              <div className={classes.buttonDiv}>
              <Button color="inherit" onClick={logOut}>Logout</Button>
              </div>
            ) : ( 
              <Link className={classes.linkDeco} to={"/user/login"} > 
                <Button color="inherit">Login</Button>
              </Link>
            )}
          </Toolbar>
      </AppBar>
      
    </div>
  );
}