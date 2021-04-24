import React, { useState, useEffect } from 'react';
import { makeStyles, Card, CardActions, CardContent, Button, TextField } from '@material-ui/core';
import { Link, withRouter } from 'react-router-dom';
import BackPage from '../../components/BackPage/BackPage'
import { socket } from '../../service/socket'
import axios from 'axios';

const useStyles = makeStyles((theme) => ({
    GameIn: {
        display: "flex",
        color: theme.palette.ultimate.main,
        backgroundColor: theme.palette.primary.main,
        height: "100vh",
        overflow: "hidden",  //解決margin-top塌陷
        alienItems: "center",
        justifyContent: "center",

        "& .card": {
            backgroundColor: theme.palette.background.paper,
            color: theme.palette.ultimate.dark,
            width: "350px",
            height: "290px",
            margin: "auto",
            alienItems: "center",
            borderRadius: 12,
            boxShadow: '0 8px 16px 0 rgba(0,0,0,.3)',
        },
        "& .title": {
            margin: "25px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            color: theme.palette.primary.main,
            fontSize: 30,
            fontWeight: 900,
        },
        "& .input": {
            color: theme.palette.ultimate.main,
            fontSize: 20,
            height: "15px",
            marginLeft: "17%",
            marginTop: "15px",
            '& .MuiTextField-root': {
                width: '80%',
                color: theme.palette.ultimate.main,
            },
        },
        "& .next": {
            margin: "auto",
            marginTop: "50px",
            borderRadius: "20px",
            boxShadow: "none",
            width: "50%",
            backgroundColor: "#B21A0F",
            color: theme.palette.background.paper,
        },
    }
}));

const GameIn = (props) => {

    const [connected, setConnected] = useState(false);

    useEffect(() => {
        socket.emit('enterRoom', { roomNum: "9487" });
        // hint
        //  $.ajax({
        //     type: 'POST',
        //     url: '/enterRoom',
        //     body: {
        //         roomNum: '9487',
        //         ID: '123337',
        //         schoolname: 'Ncu',
        //         username: '123337'
        //     },
        //     success: success,
        //     dataType: 'json'
        // });

        POST = () => {
            const input = {
                roomNum: '9487',
                ID: '123337',
                schoolname: 'Ncu',
                username: '123337'
            };
            axios.post("/enterRoom", input);
        }
    }, []);

    const classes = useStyles();

    const [values, setValues] = React.useState({
        pincode: '',
    });

    const handleChange = (prop) => (event) => {
        setValues({ ...values, [prop]: event.target.value });
    };

    const handleSubmit = (event) => {
        alert('pincode: ' + values.pincode);
        event.preventDefault();
    };

    return (
        <div className={classes.GameIn} >
            <BackPage refs="/LogIn"></BackPage>
            <Card className="card">
                <CardContent>
                    <p className="title">房間PIN Code</p>
                    <form onSubmit={handleSubmit} className="input" noValidate autoComplete="off">
                        <TextField id="pincode" value={values.pincode} onChange={handleChange('pincode')} type="search" variant="outlined" size="small" />
                    </form>
                </CardContent>
                <CardActions>
                    <Link component={Button} onClick={handleSubmit} className="next" to={'/ForgetPassword2'}>開始遊戲</Link>
                </CardActions>
            </Card>
        </div >
    )
}

export default withRouter(GameIn)