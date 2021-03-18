import React from 'react';
import { makeStyles, Card, CardActions, CardContent, Button, TextField } from '@material-ui/core';
import BackPage from '../../components/BackPage/BackPage'

const useStyles = makeStyles((theme) => ({
    Register2: {
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
            height:"470px",
            margin: "auto",
            alienItems: "center",
            borderRadius: 12,
            boxShadow: '0 8px 16px 0 #BDC9D7',
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
            marginTop:"200px",
            borderRadius:"20px",
            boxShadow:"none",
            width:"50%",
            variant:"contained",
            backgroundColor: theme.palette.ultimate.main,
            color:theme.palette.background.paper,
        }
    }
}));

const Register2 = (props) => {
    const classes = useStyles();
    return ( 
    <div className = { classes.Register2 } >
        <BackPage refs="/Register"></BackPage>
        <Card className = "card">
            <CardContent>
                <p className = "title">會員註冊</p>
                <form className = "input" noValidate autoComplete="off">
                    <TextField id="account" label="帳號" type="search" variant="outlined"  size="small" />
                    <TextField id="password" label="密碼" type="search" variant="outlined"  size="small" />
                    <TextField id="check_password" label="密碼確認" type="search" variant="outlined"  size="small" />
                </form>
            </CardContent>
            <CardActions>
                <Button className="next">確認註冊</Button>
            </CardActions>
        </Card>
    </div >
    )
}

export default Register2