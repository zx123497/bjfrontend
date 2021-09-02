import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
    Container:{
        margin: "0 auto",
        padding: "0 15px",
        width: "100%",
        boxSizing: "border-box",
        "@media (min-width: 768px)": {
            maxWidth: "720px"
        },
        "@media (min-width: 992px)": {
            maxWidth: "960px"
        },
        "@media (min-width: 1200px)": {
            maxWidth: "1140px"
        },
        "@media (min-width: 1400px)": {
            maxWidth: "1320px"
        }
    }
});

const Container = (props) => {
    const classes = useStyles(props);
    return (
        <div className={classes.Container + ' ' + props.className}>
            {props.children}
        </div>
    );
}

export default Container;