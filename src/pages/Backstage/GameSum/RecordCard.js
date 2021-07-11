import React, { useState } from 'react'
import { makeStyles, Card, Typography, Select, Icon, FormControl, MenuItem, Grid, Chip, TextField } from '@material-ui/core';
import { withRouter } from 'react-router-dom';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import Autocomplete from '@material-ui/lab/Autocomplete';
import Record from './Record';
import Statistic from './Statistic';
import FinalChart from './FinalChart';


const useStyles = makeStyles((theme) => ({
    root: {
        padding: theme.spacing(3),
        paddingRight: theme.spacing(2),
        borderRadius: theme.spacing(2),
        overflow: "hidden",
        "& .row": {
            padding: theme.spacing(1),
            width: "100%",
            "& .MuiInput-root": {
                width: "93%",
                fontSize: "12px",
                marginLeft: theme.spacing(1),
                paddingRight: theme.spacing(2)
            }
        },
        "& .label": {
            color: "#00AAA4"
        },
        "& .chartContainer": {
            height: "53vh",
            marginTop: theme.spacing(1),
            marginRight: theme.spacing(2)
        }
    }
}));


const RecordCard = (props) => {

    const classes = useStyles();


    const round = [];
    for(let i=0;i<props.data.length;i++) {
        let temp = {title: `Round${i+1}`, value: i}
        round.push(temp)
    }

    console.log(props.data)
    const [selected, setSelected] = useState({
        selected: []
    })


    return (
        <>
            <Card className={classes.root}>
                <div className="row">
                    <Typography className="label" variant="caption">選擇回合</Typography>
                    <Autocomplete
                        multiple
                        id="selectRound"
                        options={round}
                        getOptionLabel={(options) => options.title}
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                variant="standard"
                            />
                        )}
                        onChange={(event, value) => {
                            setSelected({selected: value})
                        }}
                        
                    />
                </div>

                <div className="row">
                    <Typography className="label" variant="caption">供需曲線</Typography>
                    <div className="chartContainer">
                        <FinalChart data={{selected: selected.selected, chartData: props.data}} />
                    </div>
                </div>
            </Card>
        </>
    )
}

export default withRouter(RecordCard)