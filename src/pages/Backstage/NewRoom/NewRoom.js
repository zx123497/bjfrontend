import React from 'react'
import {  makeStyles, Card, CardActions, CardContent, Button, TextField } from '@material-ui/core';
import { Link,withRouter } from 'react-router-dom';
import BackPage from '../../../components/BackPage/BackPage'
const useStyles = makeStyles((theme) => ({
    Register: {
        display:"flex",
        color: theme.palette.ultimate.main,
       
        height:"100vh",
        overflow:"hidden",  //解決margin-top塌陷
        alienItems: "center",
        justifyContent:"center",
        
        "& .card":{
            display:"flex",
            flexDirection:"column",
            justifyContent:"center",
            alignItems:"center",
            backgroundColor: theme.palette.background.paper,
            color: theme.palette.ultimate.dark,
            width: "85%",
            height:"470px",
            margin: "auto",
            
            borderRadius: 12,
            boxShadow: '0 0px 12px 0 rgba(0,0,0,0.3)',
        },
        "& .title":{
            color:  theme.palette.primary.main,
            fontSize: 30,
            fontWeight: 900,
        },
        "& .input": {
            display:"flex",
            flexDirection:"column",
            
            alignItems:"center",
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
            backgroundColor: theme.palette.ultimate.main,
            color:theme.palette.background.paper,
        },
        "& .next:hover":{
            
            backgroundColor: theme.palette.ultimate.dark,
            
        },
        [theme.breakpoints.up("md")]: {
            "& .card":{
                width: "400px",
            },
        }
    }
}));

const NewRoom=(props)=> {
    const classes = useStyles();
    return ( 
    <div className = { classes.Register } >
        <BackPage></BackPage>
        <Card className = "card">
            
                <p className = "title">建立房間</p>
                <form className = "input" noValidate autoComplete="off">
                    <TextField id="school" label="房間名稱" type="search" variant="outlined"  size="small" />
                    <TextField id="Id" label="買賣家初始金額" type="search" variant="outlined"  size="small" />
                   
                </form>
            
            
                <Link component={Button} className="next" >建立</Link>
            
        </Card>
        
    </div >
    )
}

export default NewRoom
