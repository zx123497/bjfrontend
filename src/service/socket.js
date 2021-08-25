import io from 'socket.io-client'
const URL = 'https://lbdgame.mgt.ncu.edu.tw:8080'

export const socket = io(URL, {
    transports: ['websocket', 'polling', 'flashsocket'],
})


