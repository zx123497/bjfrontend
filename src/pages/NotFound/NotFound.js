import React from 'react'
import { makeStyles } from '@material-ui/core'
import NotFoundPic from '../../assets/404.gif'

const useStyles = makeStyles((theme) => ({}))

const NotFound = (props) => {
    return (
        <div
            style={{
                width: '100vw',
                height: '100vh',
                backgroundColor: '#FFF',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                flexDirection: 'column',
            }}
        >
            <img src={NotFoundPic} alt="404" style={{ width: '30rem', maxWidth: '100vw' }} />
            <h1 style={{ color: '#666' }}>無此頁面，或請確認權限</h1>
        </div>
    )
}

export default NotFound
