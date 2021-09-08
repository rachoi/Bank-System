import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import NavBar from "./NavBar.js";
import CircularProgress from '@material-ui/core/CircularProgress';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/List';
import ListItemText from '@material-ui/core/ListItemText';

const useStyles = makeStyles((theme) => ({
  body: {
    height: '969px'
  },
  flexContainer: {
    display: 'flex',
    alignItems: 'center', 
    justifyContent: 'center',
    marginBottom: "45px"
  },
  innerContainer: {
    color: '#333333',
    margin: 'auto',
    marginTop: "10px",
    fontSize: '1.5rem'
  }, 
  header: {
    color: '#333333',
    margin: '25px', 
    borderBottom: "solid 2px #333333",
  },
  footerFlexContainer: {
    display: 'flex',
    alignItems: 'center', 
    justifyContent: 'center',
    flexDirection: "column"
  }
}))

const currentFeatures = 
[
  "Register new users",
  "Login and log out capabilities",
  "User actions (deposit, withdraw, transfer money)",
  "Display for current user's transaction history",
  "Protected routing for routes that need authentication (user dashboard)",
]


const plannedFeatures = [
  "Protected routing for routes that do not need authentication (home, login/register)",
  "Roles for each user - (ie, admin, normal user)",
  "User deletion capabilities for admins",
  "Request money from other users (?)"
]

const testUsers = [
  "test1",
  "test2"
]

const Home = () => {
  const classes = useStyles();
  const [loading, setLoading] = useState(false);

  useEffect( () => {
    setLoading(true);
  }, []);

  return (
    <div>
      {
        loading === true ? 
        <div className={classes.body}>
          <NavBar isLoggedIn={false}/> 
          <div className={classes.flexContainer}> 
            <Typography variant="h4" className={classes.header}>
              Banking System Features
            </Typography>
          </div>
          
          <div className={classes.flexContainer}>
              <div className={classes.innerContainer}> 
                <Typography variant="h5" >
                  Current features:
                </Typography>
                <List>
                    {currentFeatures.map((text, index) => (
                        <ListItem key={index}>
                            <ListItemText primary={text} />
                        </ListItem>  
                    ))}
                </List>
              </div>
              <div className={classes.innerContainer}> 
                <Typography variant="h5" >
                  Planned features:
                </Typography>
                <List>
                    {plannedFeatures.map((text, index) => (
                        <ListItem key={index}>
                            <ListItemText primary={text} />
                        </ListItem>  
                    ))}
                </List>
              </div>
          </div>
          <footer className={classes.footerFlexContainer}> 
            <Typography>
              Note: You can test user functions by registering a new account or by using existing test accounts.
            </Typography>
            <Typography>
              For demonstration purposes, email validation for registration has been removed.
            </Typography>
            <Typography>
              Current test users (email and password are the same):
              <List className={classes.footerFlexContainer}>
                {testUsers.map((text, index) => (
                    <ListItem key={index}>
                        <ListItemText primary={text} />
                    </ListItem>  
                ))}
              </List>
            </Typography>
          </footer>
        </div>
        
      
        : <div style={{display: "flex", justifyContent: "center", alignItems: "center"}}> <CircularProgress/> </div>
      } 
    </div>
    
  );
}

export default Home;