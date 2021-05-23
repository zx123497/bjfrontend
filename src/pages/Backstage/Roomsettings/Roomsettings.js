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

import 'swiper/swiper.scss'
import { ArrowForward, ArrowBack } from '@material-ui/icons'

import { Swiper, SwiperSlide } from 'swiper/react'

const useStyles = makeStyles((theme) => ({
    Setting: {
        backgroundColor: theme.palette.primary.main,
        minHeight: '100vh',
        height: 'max-content',
    },
}))

const initform = {
    roomName: '',
    test: false,
    roundNum: 1,
    gametype: 0,
    userName: '',
    initMoney: 0,
    rounds: [
        {
            round_id: `1`,
            ratio: '',
            items: '',
            saleMax: 0,
            saleMin: 0,
            buyMax: 0,
            buyMin: 0,
        },
    ],
}

const slide = [
    <SwiperSlide key={`1`} className="slide">
        <Book id={`1`} />
    </SwiperSlide>,
]

const NewRoom = (props) => {
    const classes = useStyles()

    return <div className={classes.Setting}></div>
}

export default NewRoom
