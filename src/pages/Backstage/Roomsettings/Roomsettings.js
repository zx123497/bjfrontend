import React, {useState} from 'react'
import {  makeStyles, Card, CardActions, CardContent, Button, TextField } from '@material-ui/core';
import { Link,withRouter } from 'react-router-dom';
import BackPage from '../../../components/BackPage/BackPage';
import Input from '../../../components/Input/Input';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';



const useStyles = makeStyles((theme) => ({
    Register: {
       
        "& .submit":{
            width:"90%",
            margin:"0.5rem 1rem",
            backgroundColor:theme.palette.background.paper,
            color:theme.palette.text.secondary,
            borderRadius:"10px",
            boxShadow:"0 3px 15px rgba(0,0,0,0.2)",
        },
        "& .contents":{
            color:theme.palette.text.primary,
        backgroundColor:theme.palette.background.paper,
        borderRadius:"10px",
        boxShadow:"0 3px 10px rgba(0,0,0,0.2)",
        padding:"1.5rem",
        margin:"7rem 1rem 2rem 1rem",
        },
        "& .hide":{
            display:"none",
        },
        "& .minute":{
            width:"3rem"
        },
        "& .timer":{
            marginTop:"2rem",
            display:"flex",
            alignItems:"center"
            
        }
           
        
    }
}));

const form = {
    round:{
        id:"round",
        elementType: 'input',
        value: '',
        elementConfig: {
            type: "text",
            placeholder: "填入回合數"
        },
        label: "回合數",
    },
    items:{
        id:"items",
        elementType: 'items',
        value: '',
        elementConfig: {
            type: "text",
            placeholder: "填入物件名稱"
        },
        label: "新增物件",
    },
    minute:{
        id:"items",
        elementType: 'input',
        value: '',
        elementConfig: {
            type: "text",
            placeholder: ""
        },
        
    },
}

const NewRoom=(props)=> {
    const classes = useStyles();
    const [round,setRound] = useState(form.round.value);
    const [minute,setMinute] = useState(0);
    
    const [item,setItem] = useState(form.items.value);
    const [state, setState] = useState({checkedA: true,checkedB: true,});
    const handleRoundChanged = async(id,value)=>{
        setRound(value);
     }
     const handleChange = (event) => {
        setState({ ...state, [event.target.name]: event.target.checked });
      };
     const handleItemChanged = async(id,value)=>{
        setItem(value);
     }
     const handleMinuteChanged = async(id,value)=>{
        setMinute(value);
     }

    return ( 
    <div className = { classes.Register } >
        <BackPage></BackPage>
        
            
            <div className="contents">
            <h1 className = "title">回合設定</h1>
            <Input
              className="input"
                 key={form.round.id}
                 id={form.round.id}
                 elementType={form.round.elementType}
                 onChange={handleRoundChanged} 
                 elementConfig={form.round.elementConfig}
                 value={round} 
                label={form.round.label}                    
              />
              
              <span style={{margin:"80px 10px 0px 0px"}}>是否新增物件?</span>
              <FormControlLabel
        control={
          <Switch
            checked={state.checkedB}
            onChange={handleChange}
            name="checkedB"
            color="primary"
          />
        }
        label=""
      />
              <Input
              className={`${state.checkedB ? "" : "hide"}`}
                 key="item"
                 id="item"
                 elementType={form.round.elementType}
                 onChange={handleItemChanged} 
                 elementConfig={form.items.elementConfig}
                 value={item} 
                label={"新增物件"}                    
              />
              <div className="timer">
                    <span style={{margin:"0px 10px 0px 0px"}}>回合時間</span>
                    <Input
              className="time"
                 key="minute"
                 id="minute"
                 elementType={form.minute.elementType}
                 onChange={handleMinuteChanged} 
                 elementConfig={form.minute.elementConfig}
                 value={minute} 
                                  
              />
              <span style={{margin:"0px 10px 0px 10px"}}>分</span>
              <Input
              className="time"
                 key="minute"
                 id="minute"
                 elementType={form.minute.elementType}
                 onChange={handleMinuteChanged} 
                 elementConfig={form.minute.elementConfig}
                 value={minute} 
                                  
              />
              <span style={{margin:"0px 10px 0px 10px"}}>秒</span>
              </div>
             
            </div>
        <Button className="submit">建立房間</Button>
    </div >
    )
}

export default NewRoom