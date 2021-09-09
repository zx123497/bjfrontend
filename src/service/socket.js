import { io } from 'socket.io-client/dist/socket.io'
const URL = 'https://lbdgame.mgt.ncu.edu.tw:8080'
// const URL = 'https://lbdgame.mgt.ncu.edu.tw'

export const socket = io.connect(URL, {
    withCredentials: true,
    extraHeaders: { authorization: `Bearer ${localStorage.getItem('token')}`},
    transports: [ 'websocket' ],
    cors: {
        origin: URL,
        methods: ["GET", "POST"]
    },
    pingInterval: 1000 * 60 * 5,
    pingTimeout: 1000 * 60 * 3
    // query: localStorage.getItem('token'),
    // transports: ['websocket', 'polling', 'flashsocket'],
    // secure: true,
    // reconnection: true,
    // rejectUnauthorized: false
})


