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
        
        "& .pay":{
            display:"block",
            alienItems: "center",
            width: "100vw",
            height:"410px",
            margin: "auto",
            textAlign: "center",
        },
        "& .payhide":{
            display:"none"

        },
        "& .switch":{
            position:"fixed",
            right:"10%",
            top:"10.5%",
            color: theme.palette.ultimate.main,
        },
        "& .input":{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent:"center",
            textAlign: "center",
            marginTop:"-30px",
        },
        "& .sub_title":{
            color:  theme.palette.ultimate.main,
            fontSize: 15,
            fontWeight: 400,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            marginTop: "10px",
            marginBottom: "20px",
        },
        "&. bottom":{
            fontSize:"12px",
            alienItems: "center",
            margin:"auto",
            marginLeft:"40%"
        },
        "& .QRshow":{
            margin: "auto",
            marginBottom:"25px",
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
        "& .scan":{
            margin:"auto",
            marginTop:"10px",
            marginBottom:"150px",

        },
    }
}));

const QRCodeSend2 = (props) => {

    const classes = useStyles();
    const [money,setMoney]=useState("0");
    const [showQR,setShowQR]=useState(false);
    const [result,setResult]=useState("No result");

    const [state, setState] = React.useState({
        checked: true,
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

    const previewStyle = {
        height: 240,
        width: 320,
    }

    const handleError=(err)=>{
        console.error(err)
    }

    const handleScan=(data)=>{
        if(data!=null)
        setResult(data);
        console.log(result);
    }

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
        <div className = {`${state.checked ? "pay" : "payhide"}`}>
            <FormControlLabel 
                control={
                    <Switch checked={state.checked} color="ultimate"
                    onChange={handleSwitchChange} name="checked" edge="end" />
                } 
                className="switch" label="付款"/>
            
            <Grid className="input" container spacing={1} alignItems="flex-end">
                <Grid item className="icon"><MonetizationOnIcon /></Grid>
                <Grid item>
                <form onSubmit={handleSubmit}  noValidate autoComplete="off">
                    <TextField disabled id="money" className={`${showQR ? "Tshow" : "Thide"}`} 
                        value={money} onChange={handleOnChange} type="number" 
                        label={
                            <Typography variant="headline" component="h3">轉出</Typography>
                        }
                        InputLabelProps={{
                            shrink: true,
                        }}
                        style={{ width: "100%" }}
                        />

                    <TextField id="money" className = {`${showQR ? "Thide" : "Tshow"}`}
                        value={money} onChange={handleOnChange} type="number" 
                        label={
                            <Typography variant="headline" component="h3">轉出</Typography>
                        }
                        InputLabelProps={{
                            shrink: true,
                        }}
                        fullWidth = "true"
                        />
                </form>
                </Grid>
            </Grid>
            <div className = "sub_title">提醒目前餘額為 $10,000</div>
             <div className="bottom">
                <div><QRCode  className={`${showQR ? "QRshow" : "QRhide"}`} value={`http://${money}.com`} /></div>
                
                <Link component={Button} 
                    style={{
                        margin:"auto",
                        borderRadius:"20px",
                        boxShadow:"none",
                        width:"20%",
                        backgroundColor: "#FFFFFF",
                        color: "#939597",
                    }} 
                    onClick={handleQRShow} className={`${showQR ? "QRhide" : "QRshow"}`} >確定金額</Link>
                <Link component={Button} 
                    style={{
                        margin:"auto",
                        borderRadius:"20px",
                        boxShadow:"none",
                        width:"20%",
                        backgroundColor: "#FFFFFF",
                        color: "#939597",
                    }} 
                    onClick={handleQRHide} className={`${showQR ? "QRshow" : "QRhide"}`} >重設金額</Link>   
            </div> 
        </div>
        <div className = {`${state.checked ? "payhide" : "pay"}`}>
            <FormControlLabel 
                control={
                    <Switch checked={state.checked} color="ultimate"
                    onChange={handleSwitchChange} name="checked" edge="end" />
                } 
                className="switch" label="收款"/>
            <h4>{result}</h4>
            <QrReader className="scan"
                delay={300}
                style={ previewStyle }
                onError={handleError}
                onScan={handleScan}
                
                facingMode={"rear"}/>
        </div>
    </div >
    )
}

export default withRouter(QRCodeSend2) 