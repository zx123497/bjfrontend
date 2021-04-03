import React from 'react';
import {useState} from 'react'
import {  makeStyles, Button, Grid, TextField, Typography} from '@material-ui/core';
import { Link,withRouter } from 'react-router-dom';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import BackPage from '../../components/BackPage/BackPage'
import MonetizationOnIcon from '@material-ui/icons/MonetizationOn';
import InputAdornment from '@material-ui/core/InputAdornment';
import QrReader from 'react-qr-reader'
import QRCode from "react-qr-code";
import { NextWeek } from '@material-ui/icons';

const useStyles = makeStyles((theme) => ({
    QRCodeSend2: {
        display:"flex",
        backgroundColor: theme.palette.primary.main,
        height:"100vh",
        overflow:"hidden", 
        alienItems: "center",
        justifyContent:"center",
        
        "& .switch":{
            //marginLeft: theme.spacing(1),
            position:"absolute",
            right:"10%",
            top:"10%",
            color: theme.palette.ultimate.main,
        },
        "& .center":{
            width: "100vw",
            height:"410px",
            margin: "auto",
            marginLeft:"0",
            marginRight:"0",
            textAlign: "center",
            alienItems: "center",
        },
        "& .input":{
            textAlign: "center",
            alienItems: "center",
            marginLeft:"42%",
        },
        "& .textfield":{
            width:"30vw",
        },
        "& .sub_title":{
            color:  theme.palette.ultimate.main,
            fontSize: 15,
            fontWeight: 400,
            //width:"20vw",
            //marginLeft:"40%",
        },
        "& .next":{
            borderRadius:"20px",
            boxShadow:"none",
            width:"15%",
            backgroundColor: theme.palette.background.paper,
            color:theme.palette.ultimate.main,
        },
        "&. bottom":{
            fontSize:"12px",
            alienItems: "center",
            margin:"auto",
            marginLeft:"40%"
        },
        "& .QRshow":{
            display:"block"
        },
        "& .QRhide":{
            display:"none"

        },
        "& .Tshow":{
            display:"block",
            marginTop:"10px",
            marginBottom:"10px",
        },
        "& .Thide":{
            display:"none",
            marginTop:"10px",
            marginBottom:"10px",
        },
    }
}));

const QRCodeSend2 = (props) => {

    const classes = useStyles();
    const [money,setMoney]=useState("0");
    const [showQR,setShowQR]=useState(false);
    //const [result,setResult]=useState("No result");

    const [state, setState] = React.useState({
        checkedA: true,
        checkedB: true,
      });
    
    const handleSwitchChange = (event) => {
        setState({ ...state, [event.target.name]: event.target.checked });
      };
    
    const [values, setValues] = React.useState({
        money: '',
    });

    // const handleChange = (prop) => (event) => {
    //     setValues({...values, [prop]: event.target.value });
    // };

    const handleSubmit = (event) =>  {
        //alert('money: ' + values.money);
        event.preventDefault();
    };

    //
    const handleOnChange=(event)=>{
        setMoney(event.target.value);
        console.log(event.target.value);
        
    }
      const handleQRShow =()=>{
          setShowQR(true);
      }
      const handleQRHide =()=>{
        setShowQR(false);
    }

    return ( 
    <div className = { classes.QRCodeSend2 } >
        <BackPage refs="/admin/lobby"></BackPage>
        <div className="center">
            <FormControlLabel control={
                <Switch checked={state.checkedA} color="ultimate"
                 onChange={handleSwitchChange} name="checkedA" edge="end" />
                } className="switch" label="付款"/>
            
            <Grid className="input" container spacing={1} alignItems="flex-end">
                <Grid item><MonetizationOnIcon /></Grid>
                <Grid item>
                <form onSubmit={handleSubmit}  noValidate autoComplete="off">
                    <TextField disabled id="money" className="textfield" className={`${showQR ? "Tshow" : "Thide"}`} 
                        value={money} onChange={handleOnChange} type="number" 
                        label={
                            <Typography variant="headline" component="h3">轉出</Typography>
                        }
                        InputLabelProps={{
                            shrink: true,
                        }}/>

                    <TextField id="money" className="textfield" className = {`${showQR ? "Thide" : "Tshow"}`}
                        value={money} onChange={handleOnChange} type="number" 
                        label={
                            <Typography variant="headline" component="h3">轉出</Typography>
                        }
                        InputLabelProps={{
                            shrink: true,
                        }}/>
                </form>
                </Grid>
            </Grid>
            <p className = "sub_title">提醒目前餘額為 $10,000</p>
            
            {/* <div className="bottom">
                <div><QRCode  className={`${showQR ? "QRshow" : "QRhide"}`} value={`http://${money}.com`} /></div>
                
                <Link component={Button} 
                    style={{
                        borderRadius:"20px",
                        boxShadow:"none",
                        width:"15%",
                        backgroundColor: theme.palette.background.paper,
                        color:theme.palette.ultimate.main,
                    }} 
                    onClick={handleQRShow} className={(classes.next,`${showQR ? "QRhide" : "QRshow"}`)} >確定金額</Link>
                <Link component={Button} 
                    style={{
                        borderRadius:"20px",
                        boxShadow:"none",
                        width:"15%",
                        // backgroundColor: theme.palette.background.paper,
                        // color:theme.palette.ultimate.main,
                    }} 
                    onClick={handleQRHide} className={(classes.next,`${showQR ? "QRshow" : "QRhide"}`)} >重設金額</Link>   
            </div> */}
        </div>
    </div >
    )
}

export default withRouter(QRCodeSend2) 