import React from 'react';
import { makeStyles } from '@material-ui/core';
import { withRouter } from 'react-router-dom';
import BackPage from '../../components/BackPage/BackPage'
import { useLoading, Audio } from '@agney/react-loading';
import {BallTriangle,Bars,Circles,Grid,Hearts,Oval,Puff,Rings,SpinningCircles,TailSpin,ThreeDots,} from '@agney/react-loading';

const useStyles = makeStyles((theme) => ({
    Loading: {
        display:"flex",
        color: theme.palette.ultimate.main,
        backgroundColor: theme.palette.primary.main,
        height:"100vh",
        overflow:"hidden",  //解決margin-top塌陷
        alienItems: "center",
        justifyContent:"center",
        
        "& .btn3":{
            fontSize:"12px",
            textDecoration:"underline",
            boxShadow:"none",
            background:"none",
            color:theme.palette.secondary.main,
        },
        "& .btn3:hover":{
            color:theme.palette.secondary.light,
        },  
        "& .loading":{
            position:"absolute",
            top:"45%",
            color:"red",
          
        },
        "& .p":{
            
        }
        
    }
}));

const Loading = (props) => {
    const classes = useStyles();

    const { containerProps, indicatorEl } = useLoading({
        loading: true,
        indicator: <Hearts width="300" />,
      });
    
    return ( 
    <div className = { classes.Loading } >
        <BackPage refs=""></BackPage> 
        {/* Accessibility props injected to container */}
            <section className="loading" {...containerProps}>
                {indicatorEl} {/* renders only while loading */}
            </section>
            <p>等待遊戲開始...</p>
    </div >
    )
}

export default withRouter(Loading) 