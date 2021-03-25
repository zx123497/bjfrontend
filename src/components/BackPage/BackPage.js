import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import React from 'react'
import { Button, makeStyles } from '@material-ui/core';
import { Link,withRouter } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
    btn:{
        position:"absolute",
        top:"40px",
        left:"15px"
    }
}));

const BackPage=(props)=> {
    const classes=useStyles();

    return (
        <div>
            <Link className={classes.btn} component={Button} to={props.refs}><ArrowBackIosIcon/>上一頁</Link>
        </div>
    )
}

export default withRouter(BackPage)
