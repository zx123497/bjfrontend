import React, { useRef,useState } from 'react';
import { makeStyles } from '@material-ui/core';
import { ArrowForward, ArrowBack } from '@material-ui/icons';

import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.css';


import Book from './RoundCard';

import 'swiper/swiper.scss';

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
const form = {
    round: {
        id: "round",
        elementType: 'input',
        value: '',
        elementConfig: {
            type: "text",
            placeholder: "填入回合數"
        },
        label: "回合數",
    },
    items: {
        id: "items",
        elementType: 'items',
        value: '',
        elementConfig: {
            type: "text",
            placeholder: "填入物件名稱"
        },
        label: "新增物件",
    },
    minute: {
        id: "items",
        elementType: 'input',
        value: '',
        elementConfig: {
            type: "text",
            placeholder: ""
        },

    },
}
const NewsSwiper = () => {
    const classes = useStyles();
    const ref = useRef(null);
    const [round, setRound] = useState(form.round.value);
    const [minute, setMinute] = useState(0);

    const [item, setItem] = useState(form.items.value);
    const [state, setState] = useState({ checkedA: true, checkedB: true, });
    const handleRoundChanged = async (id, value) => {
        setRound(value);
    }
    const handleChange = (event) => {
        setState({ ...state, [event.target.name]: event.target.checked });
    };
    const handleItemChanged = async (id, value) => {
        setItem(value);
    }
    const handleMinuteChanged = async (id, value) => {
        setMinute(value);
    }
    function valuetext(value) {
        return `${value}:${100 - value}`;
    }
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

    const slides = [];
    for (let i = 1; i <= 5; i++) {
        slides.push(
            <SwiperSlide 
                key={`slide-${i}`}
                className="slide"
            >
                <Book id={`${i}`} round={round} form={form} valuetext={valuetext} state={state} handleRoundChanged={handleRoundChanged} handleItemChanged={handleItemChanged} handleChange={handleChange} handleItemChanged={handleItemChanged}/>
            </SwiperSlide>
        )
    }

    return (
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
        
    );
};

export default NewsSwiper;