import { io } from "socket.io-client";
const socket = io("http://localhost:5000"); // или твой сервер
export default socket;
