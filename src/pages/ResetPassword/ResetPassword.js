import React from 'react';
import { makeStyles, TextField, Card, CardActions, CardContent, Button} from '@material-ui/core';
import { Link,withRouter,useHistory } from 'react-router-dom';
import BackPage from '../../components/BackPage/BackPage'
//import PasswordInput from '../../components/PasswordInput/PasswordInput';
import UserService from '../../service/UserService';
import Noty from 'noty';
const useStyles = makeStyles((theme) => ({
    ResetPassword: {
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
            backgroundColor: theme.palette.ultimate.main,
            color:theme.palette.background.paper,
        },
    }
}));

const ResetPassword = (props) => {
    
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
        message["oldpassword"]="";
        message["password"]="";
        message["check_password"]="";
        message["diffPassword"]="";
        if (values.password !== values.check_password) {
            message["diffPassword"]="密碼不相同\n";
        } 
        if(values.oldpassword=="")
            message["oldpassword"]="舊密碼 ";
        if(values.password=="")
            message["password"]="新密碼 ";
        if(values.check_password=="")
            message["check_password"]="確認密碼";
        if(values.oldpassword==""||values.password==""||values.check_password=="")
            alert(message["diffPassword"]+"請輸入"+message["oldpassword"]+message["password"]+message["check_password"]);
        else {
          const params = new URLSearchParams()
            //params.append('oldpassword', values.oldpassword)
            params.append('password', values.password)
        
          UserService.postResetPassword(params).then(res=>{
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
    <div className = { classes.ResetPassword } >
        <BackPage refs="/"></BackPage>
        <Card className = "card">
            <CardContent>
                <p className = "title">更改密碼</p>
                {/* <form className = "input" noValidate autoComplete="off">
                    <PasswordInput field="舊密碼" ></PasswordInput>
                    <PasswordInput field="新密碼" ></PasswordInput>
                    <PasswordInput field="重新輸入新密碼" ></PasswordInput>
                </form> */}
                <form onSubmit={handleSubmit} className = "input" noValidate autoComplete="off">
                    <TextField id="oldpassword" value={values.oldpassword} onChange={handleChange('oldpassword')} multiline label="舊密碼" type="search" variant="outlined"  size="small" />
                    <TextField id="password" value={values.password} onChange={handleChange('password')} label="新密碼" type="search" variant="outlined"  size="small" />
                    <TextField id="check_password" value={values.check_password} onChange={handleChange('check_password')} label="重新輸入新密碼" type="search" variant="outlined"  size="small" />
                </form>
            </CardContent>
            <CardActions>
                <Link onClick={handleSubmit} component={Button} className="next">更改</Link>
            </CardActions>
        </Card>
    </div >
    )
}

export default withRouter(ResetPassword) 