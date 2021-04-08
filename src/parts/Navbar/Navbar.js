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

    "& .bar": {
      backgroundColor: theme.palette.ultimate.main,
      boxShadow: "0 5px 6px rgba(0,0,0,0.2)",
    },
    "& .tool": {
      display: "flex",
      justifyContent: "center",
=======
    
"& .bar":{
    backgroundColor:theme.palette.ultimate.main,
    boxShadow: "0 5px 6px rgba(0,0,0,0.2)",
},
    "& .tool":{
      display:"flex",
      justifyContent:"center",
>>>>>>> 006034c6319165103e0ec0915f38e924f75e174d
    },
    "& .PersonalMenuToggler": {
      color: theme.palette.background.paper,
    },
    "& .login": {
      border: `1px ${theme.palette.background.paper} solid`,
      color: theme.palette.background.paper,
      borderRadius: "20px",
      width: "80px",
    },
<<<<<<< HEAD
    "& .logo": {
      flexGrow: 1,
      textAlign: "center",
      color: theme.palette.background.paper,
=======
    "& .logo":{
      flexGrow:1,
      textAlign:"center",
      color:theme.palette.background.paper,
>>>>>>> 006034c6319165103e0ec0915f38e924f75e174d
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
      <AppBar className="bar">

        <Toolbar className="tool">
<<<<<<< HEAD
          <Menu className="menu" />
          <h4 className="logo">跟寶治學經濟LOGO</h4>
          <Button className="login" color="inherit" component={Link} to="/login"><PersonIcon />登入</Button>



=======
        <Menu className="menu"/>
        <h4 className="logo">跟寶治學經濟LOGO</h4>
        <Button className="login" color="inherit" component={Link} to="/login"><PersonIcon/>登入</Button>
        
          
          
>>>>>>> 006034c6319165103e0ec0915f38e924f75e174d
        </Toolbar>
      </AppBar>
    </div>
  );
}
export default withRouter(ButtonAppBar);