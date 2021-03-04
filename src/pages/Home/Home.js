import React from 'react'
import { makeStyles } from '@material-ui/core';   //makeStyle import
import DrawerMenu from '../../parts/DrawerMenu/DrawerMenu'
const useStyles=makeStyles((theme)=>({   //css這樣寫!! 
    Home:{
        color:theme.palette.ultimate.main,
        backgroundColor:theme.palette.primary.main, 
        height:"100vh",
        display:"flex",
        flexDirection:"column",
        alignItems:"center",
        justifyContent:"center",

        "& .title:hover":{
            color:theme.palette.secondary.dark,
        },
        "& .subtitle":{
            width:"200px",
            color:theme.palette.background.paper,
            backgroundColor:theme.palette.secondary.main,
            borderRadius:"20px",
            boxShadow:"0 0 6px rgba(0,0,0,0.5)",
        },
        "& .subtitle:hover":{ //hover 覆蓋background
            backgroundColor:theme.palette.secondary.light,
        },
    }
}));

const Home=(props)=> {
    const classes=useStyles(); //自己寫的useStyle hook
    return (
        <div className={classes.Home}>  {/*外面包一層DIV */}
        <DrawerMenu></DrawerMenu>
            <h1 className="title">跟保志玩遊戲學經濟!</h1>
            <div className="subtitle">
                <h3 >Front End Group</h3>
            </div>
            
        </div>
    )
}

export default Home
