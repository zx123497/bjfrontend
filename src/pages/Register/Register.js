import React from 'react';
import { makeStyles, Card, CardActions, CardContent, Button, TextField } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    Register: {
        color: theme.palette.ultimate.main,
        backgroundColor: theme.palette.primary.main,
        height: "100vh",
        alignItems: "center",

        "& .card":{
            backgroundColor: theme.palette.background.paper,
            color: theme.palette.ultimate.dark,
            width: "350px",
            height: "500px",
            alienItems: "center",
            marginTop: "10px",
        },
        "& .title":{
            color:  theme.palette.primary.main,
            fontSize: 30,
            fontWeight: 900,
        },
        "& .input": {
            color: theme.palette.ultimate.main,
            fontSize: 26,
            height: "20px",
        }
    }
}));

const Register = (props) => {
    const classes = useStyles();
    return ( 
    <div className = { classes.Register } >
        <Card className = "card">
            <CardContent>
                <p className = "title">會員註冊</p>
                <form className = "input" noValidate autoComplete="off">
                    <TextField id="outlined-search" label="學校" type="search" variant="outlined" />
                </form>
            </CardContent>
            <CardActions>
                <Button size="small">Learn More</Button>
            </CardActions>
        </Card>
    </div >
    )
}

export default Register