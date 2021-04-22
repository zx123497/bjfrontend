import React, { useState } from 'react'
import { makeStyles, Card, CardActions, CardContent, Button, TextField } from '@material-ui/core';
import { Link, withRouter } from 'react-router-dom';
import BackPage from '../../../components/BackPage/BackPage';
import Input from '../../../components/Input/Input';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';


const useStyles = makeStyles((theme) => ({
    Register: {

        "& .submit": {
            width: "90%",
            margin: "0.5rem 1rem",
            backgroundColor: theme.palette.background.paper,
            color: theme.palette.text.secondary,
            borderRadius: "10px",
            boxShadow: "0 3px 15px rgba(0,0,0,0.2)",
        },
        "& .contents": {
            color: theme.palette.text.primary,
            backgroundColor: theme.palette.background.paper,
            borderRadius: "10px",
            boxShadow: "0 3px 10px rgba(0,0,0,0.2)",
            padding: "1.5rem",
            margin: "7rem 1rem 2rem 1rem",
        },
        "& .hide": {
            display: "none",
        },
        "& .minute": {
            width: "3rem"
        },
        "& .timer": {
            marginTop: "2rem",
            display: "flex",
            alignItems: "center"

        }


    }
}));

const form = {
    round: {
        id: "round",
        elementType: 'input',
        value: '',
        elementConfig: {
            type: "text",
            placeholder: "填入回合數"
        },
        label: "回合數",
    },
    items: {
        id: "items",
        elementType: 'items',
        value: '',
        elementConfig: {
            type: "text",
            placeholder: "填入物件名稱"
        },
        label: "新增物件",
    },
    minute: {
        id: "items",
        elementType: 'input',
        value: '',
        elementConfig: {
            type: "text",
            placeholder: ""
        },

    },
}

const NewRoom = (props) => {
    const classes = useStyles();
    const [round, setRound] = useState(form.round.value);
    const [minute, setMinute] = useState(0);

    const [item, setItem] = useState(form.items.value);
    const [state, setState] = useState({ checkedA: true, checkedB: true, });
    const handleRoundChanged = async (id, value) => {
        setRound(value);
    }
    const handleChange = (event) => {
        setState({ ...state, [event.target.name]: event.target.checked });
    };
    const handleItemChanged = async (id, value) => {
        setItem(value);
    }
    const handleMinuteChanged = async (id, value) => {
        setMinute(value);
    }
    function valuetext(value) {
        return `${value}:${100 - value}`;
    }
    return (
        <div className={classes.Register} >


            <Button className="submit">建立房間</Button>
        </div >
    )
}

export default NewRoom