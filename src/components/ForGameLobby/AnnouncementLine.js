// including PIN CODE, member sum, timer, round reminder
import React from 'react';
import { Box, Icon, makeStyles, Typography } from '@material-ui/core';
import { withRouter } from 'react-router-dom';
import VolumeUpIcon from '@material-ui/icons/VolumeUp';

const useStyles = makeStyles((theme) => ({
    root: {
        margin: theme.spacing(3),
        marginTop: theme.spacing(1.5),
        marginBottom: theme.spacing(1.5),
        backgroundColor: "white",
        borderRadius: "2rem",
        padding: "0.5rem 1.2rem",
        lineHeight: "20px",
        fontSize: "15px",
        display: "flex",
        "& .announcementIcon": {
            padding: "0 3px"
        },
        "& .announcementBody": {
            height: "20px",
            marginLeft: "1rem",
            overflowY: "auto"
        }
    }
}));

const AnnouncementLine = (props) => {

    const classes = useStyles();

    return (
        <Box className={classes.root}>
            <Icon className="announcementIcon" color="error">
                <VolumeUpIcon />
            </Icon>
            <div className="announcementBody">
                {props.data.roomAnnoucement}
            </div>
        </Box>
    )
}

export default withRouter(AnnouncementLine)
