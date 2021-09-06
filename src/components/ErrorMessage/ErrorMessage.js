import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos'
import React from 'react'
import { Button, makeStyles, Typography } from '@material-ui/core'
import { Link, withRouter } from 'react-router-dom'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'
import WarningIcon from '@material-ui/icons/Warning'
const useStyles = makeStyles((theme) => ({}))

const ErrorMessage = (props) => {
    const classes = useStyles()

    return (
        <div>
            <Dialog
                PaperProps={{
                    style: {
                        marginTop: '90px',
                        borderRadius: 30,
                        height: '30%',
                        width: '300px',
                        padding: '28px 20px 28px 20px',
                        backgroundColor: '#EAEAEA',
                    },
                }}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    <Typography className="title" variant="h5" align="center">
                        <WarningIcon color="disabled"></WarningIcon> &nbsp;提醒
                    </Typography>
                </DialogTitle>
                <DialogContent>
                    <Typography align="center" style={{ whiteSpace: 'pre-line', fontSize: '120%', marginTop: '4%' }}>
                        {props.errorMessage}
                    </Typography>
                </DialogContent>
                <DialogActions>
                    <Button
                        className="sure"
                        style={{
                            margin: 'auto',
                            fontSize: '90%',
                            fontWeight: '500',
                            borderRadius: '20px',
                            boxShadow: 'none',
                            width: '40%',
                            height: '110%',
                            backgroundColor: '#00AAA4',
                            color: '#FFFFFF',
                        }}
                    >
                        確定
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}

export default withRouter(ErrorMessage)
