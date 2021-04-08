import React from 'react';
import { makeStyles, Card, CardActions, CardContent, Button, TextField } from '@material-ui/core';
import { Link,withRouter } from 'react-router-dom';
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
            height:"470px",
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

    const [values, setValues] = React.useState({
        account: '',
        password:'',
        check_password:'',
    });

    const handleChange = (prop) => (event) => {
        setValues({...values, [prop]: event.target.value });
    };

    const handleSubmit = (event) =>  {
        
        const params = new URLSearchParams()
            params.append('name', 'kiwi')
            params.append('ID', '104022555')
            params.append('username', 'ppdragon')
            params.append('email', 'le05212@gmail.com')
        params.append('password', 'zx1266')
        
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
        });
        event.preventDefault();
    };

    return ( 
    <div className = { classes.Register2 } >
        <BackPage refs="/Register"></BackPage>
        <Card className = "card">
            <CardContent>
                <p className = "title">會員註冊</p>
                <form onSubmit={handleSubmit} className = "input" noValidate autoComplete="off">
                    <TextField id="account" value={values.account} onChange={handleChange('account')} label="帳號 (E-mail)" type="search" variant="outlined"  size="small" />
                    <TextField id="password" value={values.password} onChange={handleChange('password')} label="密碼" type="search" variant="outlined"  size="small" />
                    <TextField id="check_password" value={values.check_password} onChange={handleChange('check_password')} label="密碼確認" type="search" variant="outlined"  size="small" />
                </form>
            </CardContent>
            <CardActions>
                <Link onClick={handleSubmit} component={Button} className="next" to={'/LogIn'}>確認註冊</Link>
            </CardActions>
        </Card>
    </div >
    )
}

export default withRouter(Register2) 