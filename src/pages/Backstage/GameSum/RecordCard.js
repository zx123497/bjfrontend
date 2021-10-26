import React, { useState, useEffect } from 'react'
import { makeStyles, Card, Typography, Select, Icon, FormControl, MenuItem, Grid, Chip, TextField } from '@material-ui/core';
import { withRouter } from 'react-router-dom';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import Autocomplete from '@material-ui/lab/Autocomplete';
import FinalChart from './FinalChart';
import { socket } from '../../../service/socket';

const useStyles = makeStyles((theme) => ({
    root: {
        padding: theme.spacing(3),
        paddingRight: theme.spacing(2),
        borderRadius: theme.spacing(2),
        overflow: "hidden",
        "& .row": {
            float: "left",
            padding: theme.spacing(1),
            marginBottom: theme.spacing(3),
            width: "100%",
            "& .MuiAutocomplete-root ": {
                width: "97%",
                fontSize: "12px",
                marginLeft: theme.spacing(1),
                paddingRight: theme.spacing(2)
            },
            "& .chart": {
                float: "left",
                width: "60%"
            },
            "& .record": {
                float: "right",
                height: "50vh",
                marginRight: theme.spacing(5),
                width: "30%",
                "& .recordContainer": {
                    height: "53vh",
                    marginTop: theme.spacing(2),
                    overflow: "scroll",
                    overflowX: "hidden",
                    "& .gridrow": {
                        display: "flex",
                        alignItems: "center",
                        padding: "0.5rem"
                    },
                    "& .element": {
                        textAlign: "center",
                        fontSize: "1.2rem"
                    },
                    "& .amount": {
                        fontSize: "1.5rem",
                        fontWeight: "bold"
                    }
                }
            }
        },
        "& .label": {
            color: "#00AAA4"
        },
        "& .chartContainer": {
            height: "53vh",
            marginTop: theme.spacing(2),
            // marginRight: theme.spacing(2)
        }
    }
}));


const RecordCard = (props) => {

    const classes = useStyles();


    const round = [];

    if(props.data != null) {
        for(let i=0;i<props.data.length;i++) {
            let temp = {label: `Round${i+1}`, value: i}
            round.push(temp)
        }
    }

    const [selected, setSelected] = useState({
        selected: []
    })

    const [record, setRecord] = useState({})


    useEffect(() => {
        socket.on('getmultiRecordsResponse', function (obj) {
            console.log(obj)
            if(obj && (!obj.s)) {
                console.log(obj)
                let temp = []
                let i = 0
                if(round != [] && obj) {
                    obj.forEach((round) => {
                        round.forEach((element) => {
                            console.log(element)
                            temp.push(
                                <Grid container className="row" key={i}>
                                    <Grid item className="element buyer" xs={3}>{element.buyer}</Grid>
                                    <Grid item className="element icon" xs={1}>
                                        <Icon fontSize="large"><NavigateNextIcon /></Icon>
                                    </Grid>
                                    <Grid item className="element seller" xs={3}>{element.seller}</Grid>
                                    <Grid item className="element amount" xs={5}>$ {element.price}</Grid>
                                </Grid>
                            )
                            i++
                        })
                    })
                    setRecord(temp);
                }
            }
            // console.log(records)
        });
    }, [])

    useEffect(() => {
        console.log(selected)
        setRecord({records: []})
        let temp = []
        selected.selected.forEach((element) => {
            temp.push(element.value)
        })

        if(temp == []) {
            setRecord({record: []})
        } else {
            console.log(props.match.params.id)
            console.log(temp)
            var newtemp = []
            temp.forEach((element) => {
                newtemp.push(element + 1)
            })
            socket.emit('send_multiRecords_req', { roomNum: `${props.match.params.id}`, round: newtemp })
        }
    }, [selected])    

    return (
        <>
            <Card className={classes.root}>
                <div className="row">
                    <Typography className="label" variant="caption">選擇回合</Typography>
                    <Autocomplete
                        multiple
                        id="selectRound"
                        options={round}
                        getOptionLabel={(options) => options.label}
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                variant="standard"
                            />
                        )}
                        onChange={(event,value) => {
                            setSelected({selected: value})
                        }}
                        
                    />
                </div>

                <div className="row">
                    <div className="chart">
                        <Typography className="label" variant="caption">供需曲線</Typography>
                        <div className="chartContainer">
                            <FinalChart data={{selected: selected.selected, chartData: props.data}} />
                        </div>
                    </div>
                    <div className="record">
                        <Typography className="label" variant="caption">交易紀錄</Typography>
                        <div className="recordContainer">
                            {record}
                        </div>                    
                    </div>
                </div>
            </Card>
        </>
    )
}

export default withRouter(RecordCard)