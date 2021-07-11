import React, { useRef, useState } from 'react'
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
const useStyles = makeStyles((theme) => ({
    Setting: {
        backgroundColor: theme.palette.primary.main,
        paddingTop: '5rem',
        minHeight: '100vh',
        height: 'max-content',
        '& .basic': {
            padding: '1rem',
            backgroundColor: theme.palette.background.paper,
            margin: '1rem',
            borderRadius: '10px',
            boxShadow: '0 3px 6px rgba(0,0,0,0.2)',
        },
        '& .ratio': {
            marginRight: '10px',
            marginLeft: '10px',
        },
    },
}))

const NewRoom = (props) => {
    const classes = useStyles()
    const theme = useTheme()
    const [form, setForm] = useState({
        roomName: '',
        test: '0',
        roundNum: 1,
        gametype: 0,
        userName: '',
        initMoney: 0,
        rounds: [
            {
                round_id: 0,
                buyratio: 50,
                sellratio: 50,
                items: '',
                saleMax: 0,
                saleMin: 0,
                interval: 1,
                buyMax: 0,
                buyMin: 0,
            },
        ],
    })
    const handleAddRound = () => {
        let new_rounds = form.rounds
        let id = form.roundNum
        new_rounds.push({
            round_id: id,
            buyratio: 50,
            sellratio: 50,
            interval: 1,
            items: '',
            saleMax: 0,
            saleMin: 0,
            buyMax: 0,
            buyMin: 0,
        })
        setForm({ ...form, rounds: new_rounds, roundNum: id + 1 })
    }
    const handleCreateRoom = () => {
        let apply_round = form.rounds
        let new_arr = []
        apply_round.forEach((row) => {
            new_arr.push({
                ratio: row.buyratio,
                saleMin: row.saleMin,
                saleMax: row.saleMax,
                buyMin: row.buyMin,
                buyMax: row.buyMax,
                initMoney: null,
                interval: row.interval,
                item: null,
            })
        })
        let data = {
            email: 'chocolate@gmail.com',
            roundInfo: new_arr,
            gameType: 1,
            // initMoney: form.initMoney,
            roomName: form.roomName,
            roundTime: 100,
        }
        RoomService.postCreateRoom(data).then((res) => {
            console.log(res)
        })
    }

    const handleTitleChange = async (id, value) => {
        setForm({ ...form, roomName: value })
    }
    const handleInitChange = async (id, value) => {
        setForm({ ...form, initMoney: value })
    }
    const handleTestChange = async (id, value) => {
        console.log(value)
        setForm({ ...form, test: value })
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
                    elementType="radio"
                    elementConfig={{
                        options: [
                            {
                                value: '1',
                                displayValue: '需要測試回合',
                            },
                            {
                                value: '0',
                                displayValue: '不需要測試回合',
                            },
                        ],
                    }}
                    value={form.test}
                    onChange={handleTestChange}
                    label="測試回合"
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
            </div>
            <h2 style={{ marginLeft: '1rem' }}>回合設定</h2>
            {form.rounds.map((round) => (
                <div className="basic">
                    <h3 style={{ margin: 'auto', textAlign: 'center' }}>第{round.round_id + 1}回合</h3>
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
            <Button
                onClick={() => handleAddRound()}
                style={{
                    width: '90%',
                    margin: '5px 1rem',
                    backgroundColor: theme.palette.primary.dark,
                    color: '#FFF',
                }}
            >
                新增回合
            </Button>
            <Button
                onClick={() => handleCreateRoom()}
                style={{
                    width: '90%',
                    margin: '1rem',
                    backgroundColor: theme.palette.secondary.main,
                    color: '#FFF',
                }}
            >
                建立房間
            </Button>
        </div>
    )
}

export default NewRoom
