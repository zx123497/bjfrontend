import React, { useEffect, useState } from 'react'
import { makeStyles, Card, CardActions, CardContent, Button, TextField } from '@material-ui/core'
import { Link, withRouter } from 'react-router-dom'
import BackPage from '../../../components/BackPage/BackPage'
import Input from '../../../components/Input/Input'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Switch from '@material-ui/core/Switch'
import Typography from '@material-ui/core/Typography'
import Slider from '@material-ui/core/Slider'
import 'swiper/swiper-bundle.css'
import Book from './RoundCard'
import useTheme from '@material-ui/core/styles/useTheme'
import 'swiper/swiper.scss'
import { ArrowForward, ArrowBack } from '@material-ui/icons'
import { Swiper, SwiperSlide } from 'swiper/react'
import RoomService from '../../../service/RoomService'
import { useHistory } from 'react-router-dom'
import qs from 'qs'
import Noty from 'noty'
const useStyles = makeStyles((theme) => ({
    Setting: {
        backgroundColor: '#555',
        paddingTop: '5rem',
        minHeight: '100vh',
        color: '#FFF',
        height: 'max-content',
        '& .basic': {
            padding: '1rem',
            backgroundColor: theme.palette.ultimate.dark,
            margin: '1rem',
            borderRadius: '10px',
            boxShadow: '0 3px 6px rgba(0,0,0,0.2)',
        },
        '& .basic_round': {
            padding: '1rem',
            backgroundColor: theme.palette.ultimate.dark,
            margin: '1rem',
            borderRadius: '10px',
            boxShadow: '0 3px 6px rgba(0,0,0,0.2)',
        },
        '& .ratio': {
            marginRight: '10px',
            marginLeft: '10px',
        },
        [theme.breakpoints.up('md')]: {
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-start',
            alignItems: 'center',
            '& .basic': {
                display: 'flex',
                padding: '1.5rem',
                minWidth: 'max-content',
                width: '60%',
                justifyContent: 'center',
            },
            '& .basic_round': {
                padding: '1rem',
                backgroundColor: theme.palette.ultimate.dark,
                margin: '1rem',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                borderRadius: '10px',
                minWidth: 'max-content',
                width: '60%',
                boxShadow: '0 3px 6px rgba(0,0,0,0.2)',
            },
            '& .title': {
                marginRight: '5rem',
            },
            '& .test': {
                marginRight: '5rem',
            },
            '& .init': {
                marginRight: '5rem',
            },
        },
    },
}))

const NewRoom = (props) => {
    const classes = useStyles()
    const id = props.match.params.id
    const history = useHistory()
    const theme = useTheme()
    const [form, setForm] = useState({
        roomName: '',
        test: '0',
        roundNum: 1,
        gametype: 0,
        userName: '',
        roundTime: 0,
        initMoney: 0,
        interval: 1,
        rounds: [
            {
                round_id: 0,
                buyratio: 50,
                sellratio: 50,
                items: '',
                saleMax: 0,
                saleMin: 0,

                buyMax: 0,
                buyMin: 0,
            },
        ],
    })

    useEffect(() => {
        RoomService.showRoom(id).then((res) => {
            console.log(res.data)
            let roundCount = 0
            let temp = []
            res.data.roundInfo.forEach((row) => {
                temp.push({ ...row, round_id: roundCount, buyratio: row.ratio, sellratio: 100 - row.ratio })
                roundCount++
            })
            setForm({
                ...form,
                rounds: temp,
                roundNum: roundCount,
                roomName: res.data.roomName,
                roundTime: res.data.roundTime,
                initMoney: res.data.initMoney,
                interval: res.data.interval,
            })
        })
    }, [])

    const handleAddRound = () => {
        let new_rounds = form.rounds
        let id = form.roundNum
        let prev = form.rounds[0]
        prev = { ...prev, round_id: id }
        new_rounds.push(prev)
        setForm({ ...form, rounds: new_rounds, roundNum: id + 1 })
    }
    const handleCreateRoom = () => {
        let apply_round = form.rounds
        let new_arr = []
        let test = {}
        apply_round.forEach((row) => {
            new_arr.push({
                ratio: row.buyratio,
                saleMin: row.saleMin,
                saleMax: row.saleMax,
                buyMin: row.buyMin,
                buyMax: row.buyMax,
                item: null,
            })
        })
        const qs = require('qs')
        let data = qs.stringify({
            email: localStorage.email,
            roundInfo: new_arr,
            initMoney: form.initMoney,
            roomName: form.roomName,
            roundTime: form.roundTime,
            interval: form.interval,
        })

        console.log(data)
        RoomService.postEditRoom(data, id).then((res) => {
            console.log(res)
            new Noty({
                type: 'success',
                layout: 'topRight',
                theme: 'mint',
                text: '成功修改房間資訊',
                timeout: '4000',
                progressBar: true,
                closeWith: ['click'],
            }).show()
            history.push('/admin/lobby')
        })
    }

    const handleDeleteLast = async (id, value) => {
        let newRound = form.rounds
        let round_id = form.roundNum
        newRound.pop()
        setForm({ ...form, rounds: newRound, roundNum: round_id - 1 })
    }

    const handleTitleChange = async (id, value) => {
        setForm({ ...form, roomName: value })
    }
    const handleIntervalChange = async (id, value) => {
        setForm({ ...form, interval: value })
    }
    const handleInitChange = async (id, value) => {
        setForm({ ...form, initMoney: value })
    }
    const handleRoundTimeChange = async (id, value) => {
        console.log(value)
        setForm({ ...form, roundTime: value })
    }

    const handleBuyChange = async (id, value) => {
        console.log(value)
        if (value > 100) {
            value = 100
        } else if (value < 0) {
            value = 0
        }
        let newRound = form.rounds
        newRound[id].buyratio = value
        newRound[id].sellratio = 100 - value
        setForm({ ...form, rounds: newRound })
    }
    const handleBuyMinChange = async (id, value) => {
        let newRound = form.rounds
        newRound[id].buyMin = value
        setForm({ ...form, rounds: newRound })
    }
    const handleBuyMaxChange = async (id, value) => {
        let newRound = form.rounds
        newRound[id].buyMax = value
        setForm({ ...form, rounds: newRound })
    }
    const handleSellMinChange = async (id, value) => {
        let newRound = form.rounds
        newRound[id].saleMin = value
        setForm({ ...form, rounds: newRound })
    }
    const handleSellMaxChange = async (id, value) => {
        let newRound = form.rounds
        newRound[id].saleMax = value
        setForm({ ...form, rounds: newRound })
    }

    const handleSellChange = async (id, value) => {
        if (value > 100) {
            value = 100
        } else if (value < 0) {
            value = 0
        }
        console.log(value)
        let newRound = form.rounds
        newRound[id].sellratio = value
        newRound[id].buyratio = 100 - value
        setForm({ ...form, rounds: newRound })
    }

    return (
        <div className={classes.Setting}>
            <h2 style={{ marginLeft: '1rem' }}>房間設定</h2>
            <div className="basic">
                <Input
                    className="title"
                    key="title"
                    id="title"
                    elementType="input"
                    elementConfig={{
                        type: 'text',
                        placeholder: '輸入房間名稱',
                    }}
                    value={form.roomName}
                    onChange={handleTitleChange}
                    label="房間名稱"
                />
                <Input
                    className="test"
                    key="test"
                    id="test"
                    elementType="input"
                    elementConfig={{
                        type: 'text',
                        placeholder: '輸入回合時間',
                    }}
                    value={form.roundTime}
                    onChange={handleRoundTimeChange}
                    label="回合時間(秒)"
                />
                <Input
                    className="init"
                    key="init"
                    id="init"
                    elementType="input"
                    elementConfig={{
                        type: 'text',
                        placeholder: '輸入玩家初始金額',
                    }}
                    value={form.initMoney}
                    onChange={handleInitChange}
                    label="初始金額"
                />
                <Input
                    className="interval"
                    key="interval"
                    id="interval"
                    elementType="input"
                    elementConfig={{
                        type: 'text',
                        placeholder: '輸入單位金額(區間)',
                    }}
                    value={form.interval}
                    onChange={handleIntervalChange}
                    label="單位金額(區間)"
                />
            </div>
            <h2 style={{ marginLeft: '1rem' }}>回合設定</h2>
            {form.rounds.map((round) => (
                <div className="basic_round">
                    <div style={{ display: 'flex', alignItems: 'center', width: '100%' }}>
                        <h3 style={{ margin: 'auto', textAlign: 'center', flex: '1' }}>第{round.round_id + 1}回合</h3>
                        {round.round_id != 0 && round.round_id + 1 === form.rounds.length ? (
                            <Button style={{ border: '1px solid #FFF', color: '#FFF' }} onClick={handleDeleteLast}>
                                刪除回合
                            </Button>
                        ) : (
                            <></>
                        )}
                    </div>
                    <h4 style={{ marginBottom: '5px' }}>買賣家比例(%)</h4>
                    <div style={{ display: 'flex' }}>
                        <Input
                            className="ratio"
                            style={{ marginRight: '10px' }}
                            key={round.round_id}
                            id={round.round_id}
                            elementType="input"
                            elementConfig={{
                                type: 'text',
                                placeholder: '填入數值',
                            }}
                            value={form.rounds[round.round_id].buyratio}
                            onChange={handleBuyChange}
                            label="買家"
                        />
                        <Input
                            className="ratio"
                            key={`sell-${round.round_id}`}
                            id={round.round_id}
                            elementType="input"
                            elementConfig={{
                                type: 'text',
                                placeholder: '填入數值',
                            }}
                            value={form.rounds[round.round_id].sellratio}
                            onChange={handleSellChange}
                            label="賣家"
                        />
                    </div>
                    <h4 style={{ marginBottom: '5px' }}>買家商品價值</h4>
                    <div style={{ display: 'flex' }}>
                        <Input
                            className="ratio"
                            style={{ marginRight: '10px' }}
                            key={`valuemin-${round.round_id}`}
                            id={round.round_id}
                            elementType="input"
                            elementConfig={{
                                type: 'text',
                                placeholder: '最小值',
                            }}
                            value={form.rounds[round.round_id].buyMin}
                            onChange={handleBuyMinChange}
                        />
                        -
                        <Input
                            className="ratio"
                            key={`valuemax-${round.round_id}`}
                            id={round.round_id}
                            elementType="input"
                            elementConfig={{
                                type: 'text',
                                placeholder: '最大值',
                            }}
                            value={form.rounds[round.round_id].buyMax}
                            onChange={handleBuyMaxChange}
                        />
                    </div>
                    <h4 style={{ marginBottom: '5px' }}>賣家進貨成本</h4>
                    <div style={{ display: 'flex' }}>
                        <Input
                            className="ratio"
                            style={{ marginRight: '10px' }}
                            key={`valuemin-${round.round_id}`}
                            id={round.round_id}
                            elementType="input"
                            elementConfig={{
                                type: 'text',
                                placeholder: '最小值',
                            }}
                            value={form.rounds[round.round_id].saleMin}
                            onChange={handleSellMinChange}
                        />
                        -
                        <Input
                            className="ratio"
                            key={`valuemax-${round.round_id}`}
                            id={round.round_id}
                            elementType="input"
                            elementConfig={{
                                type: 'text',
                                placeholder: '最大值',
                            }}
                            value={form.rounds[round.round_id].saleMax}
                            onChange={handleSellMaxChange}
                        />
                    </div>
                </div>
            ))}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'stretch' }}>
                <Button
                    onClick={() => handleAddRound()}
                    style={{
                        flex: 1,
                        width: '15rem',
                        margin: '5px 1rem',
                        backgroundColor: theme.palette.primary.dark,
                        color: '#FFF',
                        fontWeight: 'bold',
                        boxShadow: '0 3px 6px rgba(0,0,0,0.3)',
                    }}
                >
                    新增回合
                </Button>
                <Button
                    onClick={() => handleCreateRoom()}
                    style={{
                        flex: 1,
                        margin: '1rem',
                        backgroundColor: theme.palette.secondary.main,
                        color: '#FFF',
                        fontWeight: 'bold',
                        boxShadow: '0 3px 6px rgba(0,0,0,0.3)',
                    }}
                >
                    完成修改
                </Button>
            </div>
        </div>
    )
}

export default NewRoom
