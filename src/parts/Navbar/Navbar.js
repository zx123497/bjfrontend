import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import { Link, withRouter } from 'react-router-dom';
import PersonIcon from '@material-ui/icons/Person';
import Menu from './Menu'
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
<<<<<<< HEAD

    "& .bar":{
      backgroundColor:theme.palette.ultimate.main,
      boxShadow: "0 5px 6px rgba(0,0,0,0.2)",
    },
=======
<<<<<<< HEAD

    "& .bar": {
      backgroundColor: "transparent",
      boxShadow: "none",
    },
    "& .tool": {
      justifyContent: "flex-end",
=======
    
"& .bar":{
    backgroundColor:theme.palette.ultimate.main,
    boxShadow: "0 5px 6px rgba(0,0,0,0.2)",
},
>>>>>>> 23696d60a033b21c0d45cde12bb95ef8f5418fd1
    "& .tool":{
      display:"flex",
      justifyContent:"center",
    },
    "& .PersonalMenuToggler":{
      color:theme.palette.background.paper,
    },
    "& .login":{
      border:`1px ${theme.palette.background.paper} solid`,
      color:theme.palette.background.paper,
      borderRadius:"20px",
      width:"80px",
    },
    "& .logo":{
      flexGrow:1,
      textAlign:"center",
      color:theme.palette.background.paper,
>>>>>>> 9b522550c966b0fb685448bfd964cb7ad113cf39
    }
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {

  },
}));

const ButtonAppBar = (props) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
<<<<<<< HEAD
      <AppBar  className="bar">      
=======
      <AppBar className="bar">

>>>>>>> 23696d60a033b21c0d45cde12bb95ef8f5418fd1
        <Toolbar className="tool">
<<<<<<< HEAD
          <Button color="inherit" component={Link} to="/login">Login</Button>


          <Menu />
=======
        <Menu className="menu"/>
        <h4 className="logo">跟寶治學經濟LOGO</h4>
<<<<<<< HEAD
        <Button className="login" color="inherit" component={Link} to="/login"><PersonIcon/>登入</Button>     
=======
        <Button className="login" color="inherit" component={Link} to="/login"><PersonIcon/>登入</Button>
        
          
          
>>>>>>> 9b522550c966b0fb685448bfd964cb7ad113cf39
>>>>>>> 23696d60a033b21c0d45cde12bb95ef8f5418fd1
        </Toolbar>
      </AppBar>
    </div>
  );
}
export default withRouter(ButtonAppBar);