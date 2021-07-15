import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Accordion from '@material-ui/core/Accordion'
import AccordionSummary from '@material-ui/core/AccordionSummary'
import AccordionDetails from '@material-ui/core/AccordionDetails'
import Typography from '@material-ui/core/Typography'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import Button from '@material-ui/core/Button'
import Input from '@material-ui/core/Input'
import { Link, withRouter } from 'react-router-dom'
const useStyles = makeStyles((theme) => ({
    valuesetting: {
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        '& .card': {
            backgroundColor: theme.palette.background.paper,
            padding: '1rem',
            width: '15rem',
            boxShadow: '4px 4px 11px rgba(0,0,0,0.3)',
            borderRadius: '25px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
        },
        '& .title': {
            color: theme.palette.ultimate.main,
        },
        '& .MuiAccordionDetails-root': {
            display: 'block',
        },
        '& .heading': {
            color: theme.palette.primary.dark,
        },
        '& .list': {
            width: '100%',
            marginBottom: '1rem',
        },
        '& .start': {
            width: '100%',
            backgroundColor: theme.palette.secondary.main,
            borderRadius: '8px',
            color: theme.palette.background.paper,
        },
        '& .listContent': {
            color: theme.palette.ultimate.light,
        },
        '& .setlist': {
            display: 'flex',
            alignItems: 'center',
        },
        '& .settitle': {
            flexGrow: 1,
        },
        '& .input': {
            width: '3rem',
        },
    },
}))

const list = [
    { id: 1, title: '第1回合', value: { seller: 0, buyer: 0 } },
    { id: 2, title: '第2回合', value: { seller: 0, buyer: 0 } },
    { id: 3, title: '第3回合', value: { seller: 0, buyer: 0 } },
    { id: 4, title: '第4回合', value: { seller: 0, buyer: 0 } },
    { id: 5, title: '第5回合', value: { seller: 0, buyer: 0 } },
    { id: 6, title: '第6回合', value: { seller: 0, buyer: 0 } },
]

const ValueSetting = (props) => {
    const classes = useStyles()
    const id = props.match.params.id
    const [applyList, setApplyList] = useState()
    return (
        <div className={classes.valuesetting}>
            <div className="card">
                <h2 className="title">每回合金額調整</h2>
                <div className="list">
                    {list.map((item) => (
                        <Accordion>
                            <AccordionSummary
                                expandIcon={<ExpandMoreIcon className={classes.icon} />}
                                aria-controls="panel1a-content"
                                id="panel1a-header"
                            >
                                <Typography className="heading">{item.title}</Typography>
                            </AccordionSummary>
                            <AccordionDetails className="listContent">
                                <div className="setlist">
                                    <h4 className="settitle">賣方商品成本</h4>
                                    <Input className="input" />
                                </div>
                                <div className="setlist">
                                    <h4 className="settitle">買方商品價值</h4>
                                    <Input className="input" />
                                </div>
                            </AccordionDetails>
                        </Accordion>
                    ))}
                </div>
                <Link style={{ textDecoration: 'none' }} to={`/admin/waitingroom/${id}`}>
                    <Button className="start">開始遊戲</Button>
                </Link>
            </div>
        </div>
    )
}

export default ValueSetting
