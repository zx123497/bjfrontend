import React from 'react';
import { makeStyles, Typography, Button } from '@material-ui/core';
import { withRouter } from 'react-router-dom';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

const useStyles = makeStyles((theme) => ({
    Modal1: {
        display:"flex",
        alienItems: "center",
        justifyContent:"center",
        color: theme.palette.ultimate.main,
        backgroundColor: theme.palette.primary.main,
        height:"100vh",
        overflow:"hidden",  

        "& .next":{
            margin:"auto",
            marginTop:"330px",
            borderRadius:"20px",
            boxShadow:"none",
            width:"160px",
            backgroundColor: theme.palette.ultimate.main,
            color:theme.palette.background.paper,
        },
    }
}));

const Modal1 = (props) => {
  const classes = useStyles();
  const [open, setOpen] = React.useState(true);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

    return ( 
    <div className = { classes.Modal1 } >
      <Button className="next" variant="outlined" color="primary" onClick={handleClickOpen}>
        買方轉出確認2
      </Button>
      <Dialog
        PaperProps={{
          style: { 
            marginTop:"90px",
            borderRadius: 30,
            height:"58%",
            width:"300px",
            padding:"28px 20px 28px 20px",
            backgroundColor:"#EAEAEA",
          }
        }}
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title"> 
          <Typography className="title" variant="h6" align="center">交易對象</Typography>
        </DialogTitle>
        <DialogContent>
          <div style={{
              position: 'relative',
              margin:"auto",
              marginTop:"-2%",
              marginBottom:"2%",
              width:"90px",
              height:"90px",
              borderRadius:"50%"}}>
            <img style={{
              display: 'block',
              height:"100%",
              width:"100%",
              borderRadius:"50%",}} 
            src="https://www.harleytherapy.co.uk/counselling/wp-content/uploads/16297800391_5c6e812832.jpg"></img>
          </div>
          <Typography align="center" style={{fontSize:"90%", fontWeight:"600", marginBottom:"8%"}}>馬鈴薯pui</Typography>
          <Typography align="center" style={{fontSize:"140%"}}>即將轉出 $1,000</Typography>
          <DialogContentText align="center" id="alert-dialog-description" style={{marginTop:"5%", fontSize:"110%"}}>
          交易後獲得 1200 元的商品價值<br></br>
          淨賺 + 200 元好處
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} className="sure"
            style={{
              margin:"auto",
              fontSize:"90%",
              fontWeight:"500",
              borderRadius:"20px",
              boxShadow:"none", 
              width:"40%",   
              backgroundColor: "#00AAA4",
              color:"#FFFFFF"}}>
            確定
          </Button>
          <Button onClick={handleClose} className="cancel"
            style={{
              margin:"auto",
              fontSize:"90%",
              fontWeight:"500",
              borderRadius:"20px",
              boxShadow:"none",   
              width:"40%", 
              backgroundColor: "#848484",
              color:"#FFFFFF"}}>
            取消
          </Button>
        </DialogActions>
      </Dialog>
    </div >
    )
}

export default withRouter(Modal1) 