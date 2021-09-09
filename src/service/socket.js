import { io } from 'socket.io-client/dist/socket.io'
const URL = 'https://lbdgame.mgt.ncu.edu.tw'
// const URL = 'https://lbdgame.mgt.ncu.edu.tw'

export const socket = io.connect(URL, {
    withCredentials: true,
    extraHeaders: { authorization: `Bearer ${localStorage.getItem('token')}`},
    transports: [ 'websocket' ],
    cors: {
        origin: URL,
        methods: ["GET", "POST"]
      }
    // query: localStorage.getItem('token'),
    // transports: ['websocket', 'polling', 'flashsocket'],
    // secure: true,
    // reconnection: true,
    // rejectUnauthorized: false
})


