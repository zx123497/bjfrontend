import React from 'react';
import {  makeStyles, Card, CardActions, CardContent, Button, TextField } from '@material-ui/core';
import { Link,withRouter } from 'react-router-dom';
import BackPage from '../../components/BackPage/BackPage'
import IconButton from '@material-ui/core/IconButton';
import Input from '@material-ui/core/Input';
import FilledInput from '@material-ui/core/FilledInput';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';

const useStyles = makeStyles((theme) => ({
    LogIn: {
        display:"flex",
        color: theme.palette.ultimate.main,
        backgroundColor: theme.palette.primary.main,
        height:"100vh",
        overflow:"hidden",  //解決margin-top塌陷
        alienItems: "center",
        justifyContent:"center",
        
        "& .card":{
            backgroundColor: theme.palette.background.paper,
            color: theme.palette.ultimate.dark,
            width: "350px",
            height:"410px",
            margin: "auto",
            alienItems: "center",
            borderRadius: 12,
            boxShadow: '0 8px 16px 0 rgba(0,0,0,.3)',
        },
        "& .title":{
            color:  theme.palette.primary.main,
            fontSize: 30,
            fontWeight: 900,
        },
        "& .input": {
            color: theme.palette.ultimate.main,
            fontSize: 20,
            height: "15px",
            '& .MuiTextField-root': {
                margin: theme.spacing(1.8),
                width: '20ch',
                color: theme.palette.ultimate.main,
            },
        },
        "& .next":{
            margin:"auto",
            marginTop:"8px",
            borderRadius:"20px",
            boxShadow:"none",
            width:"50%",
            backgroundColor: theme.palette.ultimate.main,
            color:theme.palette.background.paper,
        },
        "& .btn2":{
            fontSize:"12px",
            textDecoration:"underline",
            marginLeft:"160px",
            marginTop:"110px",
            boxShadow:"none",
            background:"none",
            color:theme.palette.ultimate.main,
        },
        "& .btn2:hover":{
            color:theme.palette.ultimate.dark,
        },
        "& .btn2:active":{
            background:"none",
            color:theme.palette.ultimate.dark,
        },
        "& .btn3":{
            fontSize:"12px",
            textDecoration:"underline",
            boxShadow:"none",
            background:"none",
            color:theme.palette.secondary.main,
        },
        "& .btn3:hover":{
            color:theme.palette.secondary.light,
        },
        "& .btn2:active, .btn3:active":{
            background:"none",
            color:theme.palette.secondary.light,
        },
        "& .bottom":{
            fontSize:"12px",
            marginLeft:"0",
        },
    }
}));

const LogIn = (props) => {
    const classes = useStyles();

    return ( 
    <div className = { classes.LogIn } >
        <BackPage></BackPage>
        <Card className = "card">
            <CardContent>
                <p className = "title">會員登入</p>
                <form className = "input" noValidate autoComplete="off">
                    <TextField id="account" label="帳號" type="search" variant="outlined"  size="small" />
                    <TextField id="password" label="密碼" type="search" variant="outlined"  size="small" />
                </form>
                <Link component={Button} className="btn2" to={'/ForgetPassword'}>忘記密碼</Link>
            </CardContent>
            <CardActions>
                <Link component={Button} className="next" to={'/Lobby'}>登入</Link>
            </CardActions>
            <div className="bottom">
                還沒有會員嗎?<Link component={Button} className="btn3" to={'/Register'}>立即註冊</Link>
            </div>
        </Card>
    </div >
    )
}

export default withRouter(LogIn) 