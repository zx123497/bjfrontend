import React from "react";
import { makeStyles } from '@material-ui/core';
import Loader from "./Loader";
import Logo from "../../assets/images/logo.png";

const PageLoader = (props) => {
    const classes = useStyles();
    return (
        <div className={classes.Loader}>
            <img src={Logo} alt="page loading"/>
            <Loader />
        </div>
    );
}

export default PageLoader;

const useStyles = makeStyles(theme => ({
    Loader: {
        position: "fixed",
        overflow: "hidden",
        zIndex: 500,
        top: 0,
        left: 0,
        width: "100%",
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: `${theme.palette.background.default}EE`,
        "& img": {
            width: 100,
            paddingLeft: 20,
        },
    },
}));