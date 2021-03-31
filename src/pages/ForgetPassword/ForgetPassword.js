import React from 'react';
import {  makeStyles, Card, CardActions, CardContent, Button, TextField } from '@material-ui/core';
import { Link,withRouter } from 'react-router-dom';
import BackPage from '../../components/BackPage/BackPage'

const useStyles = makeStyles((theme) => ({
    ForgetPassword: {
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
            height:"330px",
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
        "& .detail":{
            fontSize:"12px",
            marginTop:"10px",
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
            marginTop:"80px",
            borderRadius:"20px",
            boxShadow:"none",
            width:"50%",
            backgroundColor: theme.palette.ultimate.main,
            color:theme.palette.background.paper,
        },
    }
}));

const ForgetPassword = (props) => {
    const classes = useStyles();

    const [values, setValues] = React.useState({
        email: '',
    });

    const handleChange = (prop) => (event) => {
        setValues({...values, [prop]: event.target.value });
    };

    const handleSubmit = (event) =>  {
        alert('email: ' + values.email);
        event.preventDefault();
    };

    return ( 
    <div className = { classes.ForgetPassword } >
        <BackPage refs="/LogIn"></BackPage>
        <Card className = "card">
            <CardContent>
                <p className = "title">忘記密碼</p>
                <div className="detail">
                    請至電子信箱收取信件以重新設定密碼
                </div>
                <form onSubmit={handleSubmit} className = "input" noValidate autoComplete="off">
                    <TextField id="email" value={values.email} onChange={handleChange('email')} label="電子信箱" type="search" variant="outlined"  size="small" />
                </form>
            </CardContent>
            <CardActions>
                <Link component={Button} onClick={handleSubmit} className="next" to={'/ForgetPassword2'}>發送</Link>
            </CardActions>
        </Card>
    </div >
    )
}

export default withRouter(ForgetPassword) 