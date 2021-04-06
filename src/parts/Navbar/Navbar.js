import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import { Link, withRouter } from 'react-router-dom';
import Menu from './Menu'
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,

    "& .bar": {
      backgroundColor: "transparent",
      boxShadow: "none",
    },
    "& .tool": {
      justifyContent: "flex-end",
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
          <Button color="inherit" component={Link} to="/login">Login</Button>


          <Menu />
        </Toolbar>
      </AppBar>
    </div>
  );
}
export default withRouter(ButtonAppBar);