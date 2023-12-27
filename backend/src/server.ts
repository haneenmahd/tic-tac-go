import * as http from "http";
import express from "express";
import socket from "./socket";
import onError from "./handlers/onError";
import { HTTPError } from "src/types";
import onListening from "./handlers/onListening";

const PORT = process.env.PORT || 4000;

const app = express();
const server = http.createServer(app);

// Entry point for testing
app.get("/", (_, res) => res.send("Hello world!"))

server.listen(PORT);
server.on("error", error => onError(error as HTTPError, PORT));
server.on("listening", () => onListening(PORT))

socket(server);
