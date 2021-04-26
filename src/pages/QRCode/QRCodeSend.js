import React from 'react';
import {useState} from 'react'
import {  makeStyles, Button, Grid, TextField, Typography, StylesProvider} from '@material-ui/core';
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
    QRCodeSend: {
        display:"flex",
        color:  theme.palette.ultimate.main,
        backgroundColor: theme.palette.primary.main,
        height:"100vh",
        overflow:"hidden", 
        alienItems: "center",
        justifyContent:"center",
        
        "& .switch":{
            color: theme.palette.ultimate.main,
        },
        "& .input":{
            margin:"auto",
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent:"center",
            textAlign: "center",
        },
        "& .switchlimit":{
            marginLeft:"0px",
            marginTop:"3%",
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent:"center",
        },
        "& .num":{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent:"center",
        },
        "& .people":{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent:"center",       
        },
        "& .grid-container":{
            justifyContent:"center",
            marginTop:"130px",
            display: "grid",
            gridTemplateRows: "10% 20% 10%",
            gridTemplateColumns: "400px",  
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
        "& .limit":{
            display:"block",
            alienItems: "center",
            margin: "auto",
            textAlign: "center",
        },
        "& .unlimit":{
            display:"none"
        },
        "& .center-text":{
            display:"block",
            alienItems: "center",
            margin: "auto",
            textAlign: "center",
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
        numpeople:'',
    });

    const handleChange = (prop) => (event) => {
         setValues({...values, [prop]: event.target.value });
    };

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

    //const handleOnChange=(event)=>{
    //    setMoney(event.target.value);
    //    console.log(event.target.value);
    //}
    const handleQRShow =()=>{
        setShowQR(true);
    }
    const handleQRHide =()=>{
        setShowQR(false);
    }

    return ( 
    <div className = { classes.QRCodeSend } >
        <BackPage refs="/admin/lobby"></BackPage> 
        <div className="grid-container">
        <div className="grid-item">
        <Grid className="input" container spacing={1} alignItems="flex-end">
            <Grid item className="icon"><MonetizationOnIcon style={{ color: "black" }}/></Grid>
            <Grid item>
            <form onSubmit={handleSubmit}  noValidate autoComplete="off">
                <TextField disabled id="money" className={`${showQR ? "Tshow" : "Thide"}`} 
                    value={values.money} onChange={handleChange('money')} type="number" 
                    label={
                        <Typography variant="headline" component="h3">轉出</Typography>
                    }
                    InputLabelProps={{
                        shrink: true,
                    }}
                    style={{ width: "100%" }}
                />
                <TextField id="money" className = {`${showQR ? "Thide" : "Tshow"}`}
                    value={values.money} onChange={handleChange('money')} type="number" 
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
        </div>
        <div className="grid-item">
        <Grid className="switchlimit" container spacing={1} alignItems="flex-end">
            <Grid item>
                <div className = {`${state.checked ? "limit" : "unlimit"}`}>
                人數限制 &ensp;
                {showQR?
                    <FormControlLabel 
                        control={
                            <Switch 
                                checked={state.checked} color="default"
                                onChange={handleSwitchChange} name="checked" edge="end" />
                        } 
                        className="switch" disabled label="開"/>:
                    <FormControlLabel 
                        control={
                            <Switch 
                                checked={state.checked} color="default"
                                onChange={handleSwitchChange} name="checked" edge="end" />
                        } 
                        className="switch" label="開"/>
                }
                    <div className="num" container>
                        <form className="people" onSubmit={handleSubmit}  noValidate autoComplete="off">
                            人數上限&ensp;&ensp;
                            <TextField disabled id="numpeople" className={`${showQR ? "Tshow" : "Thide"}`}     
                                value={values.numpeople} onChange={handleChange('numpeople')} type="number" 
                                style={{width: "32%", }}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                            />
                            <TextField id="numpeople" className = {`${showQR ? "Thide" : "Tshow"}`} 
                                value={values.numpeople} onChange={handleChange('numpeople')} type="number" 
                                style={{width: "32%", }}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                            />
                        </form>
                    </div>
                </div>   
                <div className = {`${state.checked ? "unlimit" : "limit"}`}>
                人數限制 &ensp;
                {showQR?
                    <FormControlLabel 
                        control={
                            <Switch 
                                checked={state.checked} color="default"
                                onChange={handleSwitchChange} name="checked" edge="end" />
                        } 
                        className="switch" disabled label="關"/>:
                    <FormControlLabel 
                        control={
                            <Switch 
                                checked={state.checked} color="default"
                                onChange={handleSwitchChange} name="checked" edge="end" />
                        } 
                        className="switch" label="關"/>
                }
                </div> 
            </Grid>
        </Grid>
        </div>
        <div className="grid-item">
        <div className="bottom">
            <div>
                <QRCode  className={`${showQR ? "QRshow" : "QRhide"}`} 
                    value={`${values.money}`} />
            </div>
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
        </div>       
    </div >
    )
}

export default withRouter(QRCodeSend2) 