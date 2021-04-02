import React from 'react';
import {  makeStyles, Card, CardActions, CardContent, Button} from '@material-ui/core';
import { Link,withRouter } from 'react-router-dom';
import BackPage from '../../components/BackPage/BackPage'
import PasswordInput from '../../components/PasswordInput/PasswordInput';

const useStyles = makeStyles((theme) => ({
    ForgetPassword2: {
        display:"flex",
        color: theme.palette.ultimate.main,
        backgroundColor: theme.palette.primary.main,
        height:"100vh",
        overflow:"hidden",  
        alienItems: "center",
        justifyContent:"center",

        "& .card":{
            backgroundColor: theme.palette.background.paper,
            color: theme.palette.ultimate.dark,
            width: "350px",
            height:"400px",
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
            marginTop:"150px",
            borderRadius:"20px",
            boxShadow:"none",
            width:"50%",
            backgroundColor: theme.palette.ultimate.main,
            color:theme.palette.background.paper,
        },
    }
}));

const ForgetPassword2 = (props) => {
    const classes = useStyles();
    return ( 
    <div className = { classes.ForgetPassword2 } >
        <BackPage refs="/ForgetPassword"></BackPage>
        <Card className = "card">
            <CardContent>
                <p className = "title">重設密碼</p>
                <form className = "input" noValidate autoComplete="off">
                    <PasswordInput field="新密碼"></PasswordInput>
                    <PasswordInput field="再次輸入新密碼"></PasswordInput>
                </form>
            </CardContent>
            <CardActions>
                <Link component={Button} className="next" to={'/LogIn'}>重設</Link>
            </CardActions>
        </Card>
    </div >
    )
}

export default withRouter(ForgetPassword2) 