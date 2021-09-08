import React, {useEffect} from 'react';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
// import IconButton from '@material-ui/core/IconButton';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import MailIcon from '@material-ui/icons/Mail';
import AccountBalanceIcon from '@material-ui/icons/AccountBalance';
import PaymentIcon from '@material-ui/icons/Payment';
// import MenuIcon from '@material-ui/icons/Menu';
// import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles, useTheme } from '@material-ui/core/styles';

import Navbar from './NavBar';
import UtilityForm from './UtilityForm';


const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  drawer: {
    [theme.breakpoints.up('sm')]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  appBar: {
    [theme.breakpoints.up('sm')]: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
    },
    background: 'white',
    color: '#333333',
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up('sm')]: {
      display: 'none',
    },
  },
  // necessary for content to be below app bar
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
}));

function ResponsiveDrawer(props) {
  const { window } = props;
  const classes = useStyles();
  const theme = useTheme();
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [user, setUser] = React.useState(props);
  const [utilityType, setUtilityType] = React.useState("");

  useEffect( () => {
    setUser(props.user);
  }, [props.user])  

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleUtilitySummary = (e) =>{
    e.preventDefault();
    // console.log("Setting utility to: Summary");
    setUtilityType("summary");
  }

  const handleUtilityTransfer = (e) =>{
    e.preventDefault();
    // console.log("Setting utility to: Transfer");
    setUtilityType("transfer");
  }

  const handleUtilityDeposit = (e) =>{
    e.preventDefault();
    // console.log("Setting utility to: Deposit");
    setUtilityType("deposit");
  }

  const handleUtilityWithdraw = (e) =>{
    e.preventDefault();
    // console.log("Setting utility to: Withdraw");
    setUtilityType("withdraw");
  }

  const drawer = (
    <div>
      <div className={classes.toolbar} />
      <Divider />
        {/* <List>
          {['Summary', 'Transfer', 'Deposit', 'Withdraw'].map((text, index) => (
            <ListItem button key={text}>
              <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
              <ListItemText onClick={handleUtilityChange} primary={text} />
            </ListItem>
          ))}
        </List> */}
        <List>
            <ListItem button key={"Summary"}>
              <ListItemIcon> <AccountBalanceIcon /> </ListItemIcon>
              <ListItemText onClick={handleUtilitySummary} primary={"Summary"} />
            </ListItem>

            <ListItem button key={"Transfer"}>
              <ListItemIcon> <MailIcon /> </ListItemIcon>
              <ListItemText onClick={handleUtilityTransfer} primary={"Transfer"} />
            </ListItem>

            <ListItem button key={"Deposit"}>
              <ListItemIcon> <InboxIcon /> </ListItemIcon>
              <ListItemText onClick={handleUtilityDeposit} primary={"Deposit"} />
            </ListItem>

            <ListItem button key={"Withdraw"}>
              <ListItemIcon> <PaymentIcon /> </ListItemIcon>
              <ListItemText onClick={handleUtilityWithdraw} primary={"Withdraw"} />
            </ListItem>
        </List>
      <Divider />
      {/* <List>
        {['All mail', 'Trash', 'Spam'].map((text, index) => (
          <ListItem button key={text}>
            <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List> */}
    </div>
  );

  const container = window !== undefined ? () => window().document.body : undefined;

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="fixed" className={classes.appBar}>
        <Navbar {...props} isLoggedIn={true}/>
      </AppBar>
      <nav className={classes.drawer} aria-label="mailbox folders">
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Hidden smUp implementation="css">
          <Drawer
            container={container}
            variant="temporary"
            anchor={theme.direction === 'rtl' ? 'right' : 'left'}
            open={mobileOpen}
            onClose={handleDrawerToggle}
            classes={{
              paper: classes.drawerPaper,
            }}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
          >
            {drawer}
          </Drawer>
        </Hidden>
        <Hidden xsDown implementation="css">
          <Drawer
            classes={{
              paper: classes.drawerPaper,
            }}
            variant="permanent"
            open
          >
            {drawer}
          </Drawer>
        </Hidden>
      </nav>
      <main className={classes.content}>
        <div className={classes.toolbar} />
        <Typography variant="h4">
            Welcome back, {user.firstName} 
        </Typography>
        <Typography variant="subtitle1">
          Balance: ${user.balance} USD
        </Typography>
        <div>
          <UtilityForm {...props} user={user} utilityType={utilityType}/>
        </div>  
      </main>
    </div>
  );
}

export default ResponsiveDrawer;
