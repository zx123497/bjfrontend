import React from 'react'
import { makeStyles, Card, Typography, Select, Icon, FormControl, MenuItem, Grid } from '@material-ui/core';
import { withRouter } from 'react-router-dom';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import Record from './Record';
import Statistic from './Statistic';
import FinalChart from './FinalChart';


const useStyles = makeStyles((theme) => ({
    root: {
        height: "45vh",
        padding: theme.spacing(1),
        paddingRight: theme.spacing(3),
        borderRadius: theme.spacing(2),
        overflow: "scroll",
        "& .row": {
            padding: theme.spacing(1),
            width: "100%",
            "& .MuiInput-root": {
                width: "8rem",
                fontSize: "12px",
                marginLeft: theme.spacing(1)
            }
        },
        "& .label": {
            color: "#00AAA4"
        },
        "& .container": {
            backgroundColor: "#cbcccd",
            marginTop: theme.spacing(1),
            width: "100%",
            height: "12vh",
            overflow: "scroll",
            overflowX: "hidden",
        },
        "& .chartContainer": {
            marginTop: theme.spacing(1),
            marginRight: theme.spacing(2)
        }
    }
}));


const RecordCard = (props) => {

    const classes = useStyles();

    return (
        <>
            <Card className={classes.root}>
                <div className="row">
                    <Typography className="label" variant="caption">選擇回合</Typography>
                    <FormControl>
                        <Select>
                            <MenuItem value="1">第一回合</MenuItem>
                            <MenuItem value="2">第二回合</MenuItem>
                            <MenuItem value="3">第三回合</MenuItem>
                            <MenuItem value="4">第四回合</MenuItem>
                            <MenuItem value="5">第五回合</MenuItem>
                        </Select>
                    </FormControl>
                </div>
                <div className="row">
                    <Typography className="label" variant="caption">交易明細</Typography>
                    <div className="container">
                        <Record />
                    </div>
                </div>
                <div className="row">
                    <Typography className="label" variant="caption">交易統計</Typography>
                    <div className="container">
                        <Statistic />
                    </div>
                </div>
                <div className="row">
                    <Typography className="label" variant="caption">供需曲線</Typography>
                    <div className="chartContainer">
                        <FinalChart />
                    </div>
                </div>
            </Card>
        </>
    )
}

export default withRouter(RecordCard)