import { io } from "socket.io-client";
const socket = io("http://localhost:3030"); // или твой сервер
export default socket;
