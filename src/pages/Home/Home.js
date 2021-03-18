import React,{useState} from 'react'
import { makeStyles } from '@material-ui/core';   //makeStyle import
import Input from '@material-ui/core/Input';
import TextField from '@material-ui/core/TextField';
import DrawerMenu from '../../parts/DrawerMenu/DrawerMenu'
import QRCode from "react-qr-code";
import InputAdornment from '@material-ui/core/InputAdornment';
import Button from '@material-ui/core/Button';
import QrReader from 'react-qr-reader'
const useStyles=makeStyles((theme)=>({   //css這樣寫!! 
    Home:{
        color:theme.palette.ultimate.main,
        backgroundColor:theme.palette.primary.main, 
        height:"100vh",
        display:"flex",
        flexDirection:"column",
        alignItems:"center",
        justifyContent:"center",

        "& .title:hover": {
            color: theme.palette.secondary.dark,
        },
        "& .subtitle": {
            width: "200px",
            color: theme.palette.background.paper,
            backgroundColor: theme.palette.secondary.main,
            borderRadius: "20px",
            boxShadow: "0 0 6px rgba(0,0,0,0.5)",
        },
        "& .subtitle:hover": { //hover 覆蓋background
            backgroundColor: theme.palette.secondary.light,
        },
        "& .text":{
            marginTop:"10px",
            marginBottom:"10px",

        },
        "& .scan":{
            marginTop:"10px",
            marginBottom:"150px",

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

const Home=(props)=> {
    const classes=useStyles(); //自己寫的useStyle hook
    const [money,setMoney]=useState("0");
    const [showQR,setShowQR]=useState(false);
    const [result,setResult]=useState("No result");
    
    const handleOnChange=(event)=>{
        setMoney(event.target.value);
        console.log(event.target.value);
        
    }
    const handleScan=(data)=>{
        if(data!=null)
        setResult(data);
        console.log(result);
    }
    const handleError=(err)=>{
        console.error(err)
      }
      const previewStyle = {
        height: 240,
        width: 320,
      }
      const handleQRShow =()=>{
          setShowQR(true);
      }
      const handleQRHide =()=>{
        setShowQR(false);
    }
    const QRDisable=()=>{
        if(showQR){
            return true;
        }
        else{
            return false;
        }
    }
    return (
        <div className={classes.Home}>  {/*外面包一層DIV */}
        <DrawerMenu></DrawerMenu>
            <h1 className="title">跟保志玩遊戲學經濟!</h1>
            <div className="subtitle">
                <h3 >Front End Group</h3>

            </div>
            
            <TextField className="text" className={`${showQR ? "Tshow" : "Thide"}`} disabled startAdornment={<InputAdornment position="start">$</InputAdornment>} id="standard-basic" value={money} type="text" onChange={handleOnChange} label="轉出金額" variant="outlined" />
            <TextField className="text" className={`${showQR ? "Thide" : "Tshow"}`} startAdornment={<InputAdornment position="start">$</InputAdornment>} id="standard-basic" value={money} type="text" onChange={handleOnChange} label="轉出金額" variant="outlined" />
            
            <div><QRCode  className={`${showQR ? "QRshow" : "QRhide"}`} value={`http://${money}.com`} /></div>
            <Button onClick={handleQRShow} className={`${showQR ? "QRhide" : "QRshow"}`}>確定金額</Button>
            <Button onClick={handleQRHide} className={`${showQR ? "QRshow" : "QRhide"}`}>重設金額</Button>
            <h4>{result}</h4>
            <QrReader
            className="scan"
          delay={300}
          style={previewStyle}
          onError={handleError}
          onScan={handleScan}
          facingMode={"environment"}
          />
          
        </div>
    )
}

export default Home