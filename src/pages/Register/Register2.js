import React from 'react';
import { makeStyles, Card, CardActions, CardContent, Button, TextField } from '@material-ui/core';
import { Link,withRouter,useHistory } from 'react-router-dom';
import BackPage from '../../components/BackPage/BackPage'
import UserService from '../../service/UserService';
import Noty from 'noty';

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
            height:"430px",
            margin: "auto",
            alienItems: "center",
            borderRadius: 12,
            boxShadow: '0 8px 16px 0 rgba(0,0,0,.3)',
        },
        "& .title":{
            margin: "25px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            color:  theme.palette.primary.main,
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
                marginTop:"25px",
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
            variant:"contained",
            backgroundColor: theme.palette.ultimate.main,
            color:theme.palette.background.paper,
        }
    }
}));

const Register2 = (props) => {
    const history = useHistory();
    const classes = useStyles();

    const [values, setValues] = React.useState({
        email: '',
        password:'',
        check_password:'',
    });

    const handleChange = (prop) => (event) => {
        setValues({...values, [prop]: event.target.value });
    };

    const handleSubmit = (event) =>  {
        
        var message=[];
        message["email"]="";
        message["password"]="";
        message["diffPassword"]="";
        if (values.password !== values.check_password) {
            message["diffPassword"]="密碼不相同\n";
        } 
        if(values.email=="")
            message["email"]="帳號 ";
        if(values.password=="")
            message["password"]="密碼";
        if(values.email==""||values.password==""||values.username=="")
            alert(message["diffPassword"]+"請輸入"+message["email"]+message["password"]);
        else {
          const params = new URLSearchParams()
            params.append('schoolname', localStorage.getItem('schoolname'))
            params.append('ID', localStorage.getItem('ID'))
            params.append('username', localStorage.getItem('username'))
            params.append('email', values.email)
            params.append('password', values.password)
            console.log('hi '+localStorage.getItem('username'));
        
          UserService.postRegister(params).then(res=>{
            new Noty({
                type: 'success',
                layout: 'topRight',
                theme: 'nest',
                text: `成功: ${res}`,
                timeout: '4000',
                progressBar: true,
                closeWith: ['click']
            }).show();
            console.log(res.data);
            if( res.status==200){
                history.push('./login');
            }
          });
        }
        event.preventDefault();
    };

    return ( 
    <div className = { classes.Register2 } >
        <BackPage refs="/Register"></BackPage>
        <Card className = "card">
            <CardContent>
                <p className = "title">會員註冊</p>
                <form onSubmit={handleSubmit} className = "input" noValidate autoComplete="off">
                    <TextField id="email" value={values.email} onChange={handleChange('email')} multiline label="帳號 (E-mail)" type="search" variant="outlined"  size="small" />
                    <TextField id="password" value={values.password} onChange={handleChange('password')} label="密碼" type="search" variant="outlined"  size="small" />
                    <TextField id="check_password" value={values.check_password} onChange={handleChange('check_password')} label="密碼確認" type="search" variant="outlined"  size="small" />
                </form>
            </CardContent>
            <CardActions>
                <Link onClick={handleSubmit} component={Button} className="next" >確認註冊</Link>
            </CardActions>
        </Card>
    </div >
    )
}

export default withRouter(Register2) 