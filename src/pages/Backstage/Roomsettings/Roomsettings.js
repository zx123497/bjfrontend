import React, { useRef, useState } from 'react'
import { makeStyles, Card, CardActions, CardContent, Button, TextField } from '@material-ui/core';
import { Link, withRouter } from 'react-router-dom';
import BackPage from '../../../components/BackPage/BackPage';
import Input from '../../../components/Input/Input';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';
import 'swiper/swiper-bundle.css';
import Book from './RoundCard';

import 'swiper/swiper.scss';
import { ArrowForward, ArrowBack } from '@material-ui/icons';

import { Swiper, SwiperSlide } from 'swiper/react';

    const useStyles = makeStyles({
        newsSwiper:{
            '& .slide': {
                width: '80vw',
                height: '100%',
                display: "flex",
                flexWrap: "wrap",
            },
            '& .controlPanel': {
                display: "none",
                position: 'relative'
            }
        },
        '@media (min-width:768px)': {
            newsSwiper:{
               
                '& .slide': {
                    width: "100%"
                },
                '& .controlPanel': {
                        position: "absolute",
                        right: 15,
                        top: -50,
                        width: 100,
                        display: "flex",
                        justifyContent: "space-around"
                },
                '& .arrow': {
                    fontSize: 40,
                    "&:hover": {
                        cursor: "pointer"
                    },
                    "&:active": {
                        filter: "brightness(150%)"
                    }
                }
            },
        }
        
    });

const initform = {
    roomName:"",
    test:false,
    roundNum:1,
    gametype:0,
    userName:"",
    initMoney:0,
    rounds:[
        {
            round_id:`1`,
            ratio:"",
            items:"",
            saleMax:0,
            saleMin:0,
            buyMax:0,
            buyMin:0
        }
    ],
}

const slide = [
    <SwiperSlide key={`1`}className="slide">
        <Book id={`1`} />
    </SwiperSlide>
]

const NewRoom = (props) => {
    const classes = useStyles();
    const [form,setForm] = useState(initform);
    const [slides,setSlides] = useState(slide);
    const ref = useRef(null);


    const newRound = () =>{
        const new_round={
            round_id:`${form.roundNum+1}`,
            ratio:"",
            items:"",
            saleMax:0,
            saleMin:0,
            buyMax:0,
            buyMin:0
        }
    };

    const handleRoomName = (evt)=>{
        setForm({...form,roomName:evt.target.value})
    };

    const handleInitMoney = (evt)=>{
        setForm({...form,initMoney:evt.target.value})
    };

    const goNext = () => {
        if (ref.current !== null && ref.current.swiper !== null) {
            ref.current.swiper.slideNext(500);
        }
    };
    
    const goPrev = () => {
        if (ref.current !== null && ref.current.swiper !== null) {
            ref.current.swiper.slidePrev(500);
        }
    };

    
    for (let i = 1; i <= 5; i++) {
        slides.push(
            <SwiperSlide 
                key={`slide-${i}`}
                className="slide"
            >
                <Book id={`${i}`} />
            </SwiperSlide>
        )
    }

    return (
        <div className={classes.Register} >
            <h1>建立房間</h1>
            
            <div className={classes.newsSwiper}>
           
                <div className="controlPanel" >
                    <ArrowBack 
                        className="arrow"
                        onClick={ goPrev }
                        color="primary" 
                    />
                    <ArrowForward 
                        className="arrow"
                        onClick={ goNext }
                        color="primary" 
                    />
                </div>
           
            <Swiper
                ref={ref}
                style={{ width: '100%'}}
                loop
                slidesPerView='auto'
                spaceBetween={10}
                breakpoints={{
                    768: {
                        slidesPerView: 4,
                        slidesPerGroup: 4,
                        spaceBetween: 20
                    },
                }}
            >
                {slides}
            </Swiper>
        </div>
        </div >
    )
}

export default NewRoom