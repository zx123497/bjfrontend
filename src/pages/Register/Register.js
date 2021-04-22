import React from 'react';
import {  makeStyles, Card, CardActions, CardContent, Button, TextField } from '@material-ui/core';
import { Link,withRouter } from 'react-router-dom';
import BackPage from '../../components/BackPage/BackPage'
import { useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
    Register: {
        display:"flex",
        alienItems: "center",
        justifyContent:"center",
        color: theme.palette.ultimate.main,
        backgroundColor: theme.palette.primary.main,
        height:"100vh",
        overflow:"hidden",  //解決margin-top塌陷,

        "& .card":{
            backgroundColor: theme.palette.background.paper,
            color: theme.palette.ultimate.dark,
            width: "350px",
            height:"430px",
            margin: "auto",
            alienItems: "center",
            borderRadius: 12,
            boxShadow: '0 8px 16px 0 rgba(0,0,0,.3)',
        },
        "& .title": {
            margin: "25px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            color: theme.palette.primary.main,
            fontSize: 30,
            fontWeight: 900,
        },
        "& .input": {
            marginTop: "-10px",
            color: theme.palette.ultimate.main,
            fontSize: 20,
            height: "15px",
            marginLeft: "17%",
            '& .MuiTextField-root': {
                marginTop: "25px",
                width: '80%',
                color: theme.palette.ultimate.main,
            },
        },
        "& .next":{
            margin:"auto",
            marginTop:"200px",
            borderRadius:"20px",
            boxShadow:"none",
            width:"50%",
            backgroundColor: theme.palette.ultimate.main,
            color:theme.palette.background.paper,
        },
    }
}));

const Register = (props) => {
    const history = useHistory();
    const classes = useStyles();

    const [values, setValues] = React.useState({
        schoolname: '',
        ID:'',
        username:'',
    });

    const handleChange = (prop) => (event) => {
        setValues({...values, [prop]: event.target.value });
    };

    const handleSubmit = (event) =>  {
        var message=[];
        message["schoolname"]="";
        message["ID"]="";
        message["username"]="";
        if(values.schoolname=="")
            message["schoolname"]="學校 ";
        if(values.ID=="")
            message["ID"]="學號 ";
        if(values.username=="")
            message["username"]="使用者名稱";
        if(values.schoolname==""||values.ID==""||values.username=="")
            alert("請輸入"+message["schoolname"]+message["ID"]+message["username"]);
        else{
            localStorage.setItem('schoolname',values.schoolname);
            localStorage.setItem('ID',values.ID);
            localStorage.setItem('username',values.username);
            history.push('./register2');
        }
        event.preventDefault();
    };



    return ( 
    <div className = { classes.Register } >
        <BackPage refs="/LogIn"></BackPage>
        <Card className = "card">
            <CardContent>
                <p className = "title">會員註冊</p>
                <form onSubmit={handleSubmit} className = "input" autoComplete="off">
                    <TextField id="schoolname" value={values.schoolname} onChange={handleChange('schoolname')} label="學校" type="search" variant="outlined"  size="small" />
                    <TextField id="ID" value={values.ID} onChange={handleChange('ID')} label="玩家ID" type="search" variant="outlined"  size="small" />
                    <TextField id="name" value={values.username} onChange={handleChange('username')} label="姓名" type="search" variant="outlined"  size="small" />
                </form>
            </CardContent>
            <CardActions>
                <Link onClick={handleSubmit} component={Button} className="next">下一步</Link>
            </CardActions>
        </Card>
    </div >
    )
}

export default withRouter(Register) 