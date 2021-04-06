import React from 'react';
import {  makeStyles, Card, CardActions, CardContent, Button, TextField } from '@material-ui/core';
import { Link,withRouter } from 'react-router-dom';
import BackPage from '../../components/BackPage/BackPage'
import PasswordInput from '../../components/PasswordInput/PasswordInput';

const useStyles = makeStyles((theme) => ({

    LogIn: {
        display:"flex",
        color: theme.palette.ultimate.main,
        backgroundColor: theme.palette.primary.main,
        height:"88.8vh",
        overflow:"hidden",  //解決margin-top塌陷
        alienItems: "center",
        justifyContent:"center",
        
        "& .card":{  
            backgroundColor: theme.palette.background.paper,
            color: theme.palette.ultimate.dark,
            width: "350px",
            height:"410px",
            display:"flex",
            flexDirection:"column",
            margin: "auto",
            alienItems: "center",
            borderRadius: 12,
            boxShadow: '0 8px 16px 0 rgba(0,0,0,.3)',
        },
        "& .title":{
            margin:"25px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            color:  theme.palette.primary.main,
            fontSize: 30,
            fontWeight: 900,
        },
        "& .input": {
            marginTop:"35px",
            color: theme.palette.ultimate.main,
            fontSize: 20,
            height: "15px",
            marginLeft:"17%",

            '& .MuiTextField-root': {
                width: '80%',
                color: theme.palette.ultimate.main,
            },
        },
        "& .next":{
            margin:"auto",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            marginTop:"35px",
            borderRadius:"20px",
            boxShadow:"none",
            width:"50%",
            backgroundColor: theme.palette.ultimate.main,
            color:theme.palette.background.paper,
        },
        "& .btn2":{
            display: "flex",
            flexDirection: "column",
            alignItems: "fiex-end",
            fontSize:"12px",
            textDecoration:"underline",
            marginLeft:"160px",
            marginTop:"95px",
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
            marginTop:"-2px",
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
            margin:"auto",
            marginTop:"-15px"
        },
    }
}));

const LogIn = (props) => {
    const classes = useStyles();

    const [values, setValues] = React.useState({
        account: '',
    });

    const handleChange = (prop) => (event) => {
        setValues({...values, [prop]: event.target.value });
    };

    const handleSubmit = (event) =>  {
        alert('account: ' + values.account + ', password: ' + values.password);
        event.preventDefault();
    };

    return ( 
    <div className = { classes.LogIn } >
        <BackPage></BackPage>
        <Card className = "card">
            <CardContent>
                <div className = "title">會員登入</div>
                <form onSubmit={handleSubmit} className = "input" autoComplete="off">
                    <TextField id="account" value={values.account} onChange={handleChange('account')} label="帳號" type="search" variant="outlined"  size="small" />
                    <PasswordInput field="密碼" onChange={handleChange('password')}></PasswordInput>
                </form>
                <Link component={Button} className="btn2" to={'/ForgetPassword'}>忘記密碼</Link>
                <Link onClick={handleSubmit} component={Button} className="next" to={'/Lobby'}>登入</Link>
            </CardContent>
            <CardActions>
            <div className="bottom">
                還沒有會員嗎?<Link component={Button} className="btn3" to={'/Register'}>立即註冊</Link>
            </div>
            </CardActions>
        </Card>
    </div >
    )
}

export default withRouter(LogIn) 