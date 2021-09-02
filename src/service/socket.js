import { io } from 'socket.io-client/dist/socket.io'
const URL = 'https://lbdgame.mgt.ncu.edu.tw:8080'

export const socket = io.connect(URL, {
    transports: ['websocket', 'polling', 'flashsocket'],
})


