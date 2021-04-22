import io from "socket.io-client";
const URL = "http://140.115.83.113:8080";

export const socket = io(URL, { transports: ['websocket', 'polling', 'flashsocket'] });


// import { socket } from '../../../service/socket'

// const [connected, setConnected] = useState(false);

// useEffect(() => {
//     socket.emit('test');
//     socket.on('testResponse', obj => {
//         console.log(obj);
//     });
// }, []);
