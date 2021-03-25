import React from 'react'
import {  makeStyles } from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';
import Button from '@material-ui/core/Button';
import Roomcard from './Roomcard';
const useStyles = makeStyles((theme) => ({
    Lobby: {
        padding:"15px 10px 15px 10px",
        '& .account':{
            display:"flex",
            alignItems:"center",
            justifyContent:"center",
        },
        '& .name':{
            flexGrow:1,
            display:"flex",
            flexDirection:"column",
            alignItems:"start",

            borderRadius:"10px",
            margin:theme.spacing(2,1),
            padding:theme.spacing(1,3),
            backgroundColor:theme.palette.background.paper,
            height:"4rem",
            width:"40%",
        },
        '& .nameArea':{
            marginTop:"7px",
            fontSize:"16px",
            width:"100%",
            display:"flex",
            alignItems:"center",
            justifyContent:"center",
        },
        '& .room':{
            width:"100%",
            height:"7em",
            borderRadius:"10px",
            margin:"1.2em 0 0px 0",
            boxShadow:"0 0 10px rgba(0,0,0,0.2)",
            backgroundColor:theme.palette.background.paper,
        },
        '& .pwEdit':{
            width:"100%",
            backgroundColor:theme.palette.secondary.main,
            color:theme.palette.background.paper,
            margin:"0 auto",
        },
        '& .roomTitle':{
            display:"flex",
            alignItems:"center",
        },
        '& .rooms':{
            marginTop:"2rem",
        },
        "& .roomtext":{
            flexGrow:1,
        },
        "& .roombtn":{
            height:"2.5rem",
            width:"6rem",
            backgroundColor:theme.palette.background.paper,
            boxShadow:"0 0 10px rgba(0,0,0,0.2)",
            borderRadius:"10px"
        },
        [theme.breakpoints.up("md")]: {
           
        },
    },
    profile:{
        display:"flex",
        alignItems:"center",
        
        "& .photo":{
            position: 'relative',
            width:"8rem",
            height:"8rem",
            borderRadius:"50%",

        },
        
        "& .image ":{
            display: 'block',
            
            height:"100%",
            width:"100%",
            borderRadius:"50%",
            backfaceVisibility: "hidden"
        },
        "& .photo:hover .image":{
            transition:"0.3s ease",
            opacity:"0.5",
        },
        "& .edit":{
            
            width:"100%",
            transition:' .5s ease',
            opacity: 0,
            position:"absolute",
            top:"50%",
            left:"50%",
            transform: 'translate(-50%, -50%)',
            msTransform:"translate(-50%, -50%);",
            textAlign: 'center',
            
        },
        "& .photo:hover .edit":{
            transition:"0.3s ease",
            opacity:"1",
        },
        "& .icon":{
            backgroundColor:theme.palette.background.paper,
            color:theme.palette.secondary.main,
        },
        '& .name':{
            display:"flex",
            flexDirection:"column",
            alignItems:"start",
            flexGrow:1,
            borderRadius:"10px",
            margin:theme.spacing(2,1,2,3),
            padding:theme.spacing(1,3),
            backgroundColor:theme.palette.background.paper,
            height:"4rem",
            width:"40%",
        },
        '& .nameArea':{
            fontSize:"20px",
            width:"100%",
            display:"flex",
            justifyContent:"center",
        },
        
        

        
    }
}));
const Lobby=()=> {
    const classes=useStyles();
    return (
        <div className={classes.Lobby}>
           <h1>管理者專區</h1> 
           <div className={classes.profile}>
                <div className="photo">
                
                    <img className="image" src="https://www.harleytherapy.co.uk/counselling/wp-content/uploads/16297800391_5c6e812832.jpg">
                    </img>
                    <span className="edit">
                             <IconButton className="icon" aria-label="add an alarm">
                                <EditIcon />
                            </IconButton> 
                    </span>
                    
               </div>
                <div className="name">
                <div >姓名</div>
                <div className="nameArea">HELLY YU</div>
                   
                </div>
           </div>
           <div className="account">
           <div className="name">
                <div >帳號</div>
                <div className="nameArea">HELLY@hmail.vmo</div>
                   
            </div>
            <div className="name">
                <div >密碼</div>
                <div className="nameArea">************</div>
                   
            </div>
           </div>
           <Button className="pwEdit">修改密碼</Button>
           <div className="rooms">
               <div className="roomTitle">
                   <h2 className="roomtext">已建立房間</h2>
               <Button className="roombtn">+建立房間</Button>
            </div>
               <Roomcard title="週一經濟" player="2" round="2" status="未開始"/>
               <Roomcard title="週二經濟" player="2" round="2" status="未開始"/>
               <Roomcard title="週三經濟" player="2" round="2" status="未開始"/>
               <Roomcard title="週一經濟" player="2" round="2" status="未開始"/>
               <Roomcard title="週二經濟" player="2" round="2" status="未開始"/>
               <Roomcard title="週三經濟" player="2" round="2" status="未開始"/>
           </div>
        </div>
    )
}

export default Lobby
