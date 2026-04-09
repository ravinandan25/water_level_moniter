import { io } from "socket.io-client";
import { BASE_URL } from "../config/env";

export const socket = io(BASE_URL, {
  transports: ["websocket"], // faster + stable
});