import React from 'react';
import { makeStyles, Button, Grid, TextField, Typography } from '@material-ui/core';
import { Link, withRouter } from 'react-router-dom';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import BackPage from '../../components/BackPage/BackPage'
import MonetizationOnIcon from '@material-ui/icons/MonetizationOn';

const useStyles = makeStyles((theme) => ({
    QRCodeSend: {
        display: "flex",
        backgroundColor: theme.palette.primary.main,
        height: "100vh",
        overflow: "hidden",
        alienItems: "center",
        justifyContent: "center",

        "& .switch": {
            //marginLeft: theme.spacing(1),
            position: "absolute",
            right: "10%",
            top: "10%",
            color: theme.palette.ultimate.main,
        },
        "& .center": {
            width: "100vw",
            height: "410px",
            margin: "auto",
            marginLeft: "0",
            marginRight: "0",
            textAlign: "center",
            alienItems: "center",
        },
        "& .input": {
            textAlign: "center",
            alienItems: "center",
            marginLeft: "38%",
        },
        "& .textfield": {
            width: "20vw",
        },
        "& .sub_title": {
            color: theme.palette.ultimate.main,
            fontSize: 15,
            fontWeight: 400,
        },
        "& .next": {
            borderRadius: "20px",
            boxShadow: "none",
            width: "15%",
            backgroundColor: theme.palette.background.paper,
            color: theme.palette.ultimate.main,
        },
        "&. bottom": {
            fontSize: "12px",
            alienItems: "center",
            margin: "auto",
        },
    }
}));

const QRCodeSend = (props) => {
    const classes = useStyles();

    const [state, setState] = React.useState({
        checkedA: true,
        checkedB: true,
    });

    const handleSwitchChange = (event) => {
        setState({...state, [event.target.name]: event.target.checked });
    };

    const [values, setValues] = React.useState({
        money: '',
    });

    const handleChange = (prop) => (event) => {
        setValues({...values, [prop]: event.target.value });
    };

    const handleSubmit = (event) => {
        //alert('money: ' + values.money);
        event.preventDefault();
    };

    return ( <
        div className = { classes.QRCodeSend } >
        <
        BackPage refs = "/admin/lobby" > < /BackPage> <
        div className = "center" >
        <
        FormControlLabel control = { <
            Switch checked = { state.checkedA }
            color = "ultimate"
            onChange = { handleSwitchChange }
            name = "checkedA"
            edge = "end" / >
        }
        className = "switch"
        label = "付款" / >
        <
        Grid className = "input"
        container spacing = { 1 }
        alignItems = "flex-end" >
        <
        Grid item > < MonetizationOnIcon / > < /Grid> <
        Grid item >
        <
        form onSubmit = { handleSubmit }
        noValidate autoComplete = "off" >
        <
        TextField id = "money"
        value = { values.account }
        onChange = { handleChange('money') }
        type = "number"
        className = "textfield"
        label = { <
            Typography variant = "headline"
            component = "h3" > 轉出 < /Typography>
        }
        InputLabelProps = {
            {
                shrink: true,
            }
        }
        /> <
        /form> <
        /Grid> <
        /Grid> <
        p className = "sub_title" > 提醒目前餘額為 $10, 000 < /p>

        <
        div className = "bottom" >
        <
        Link component = { Button }
        className = "next"
        to = { '/QRCodeSend2' }
        onClick = { handleSubmit } > 確定 < /Link>    <
        /div> <
        /div> <
        /div >
    )
}

export default withRouter(QRCodeSend)