import type { Server as HTTPServer } from "http";
import { Server } from "socket.io"
import MainController from "./controllers/MainController";

export default (httpServer: HTTPServer) => {
    const io = new Server(httpServer, {
        cors: {
            origin: "*"
        }
    });
    
    const mainController = new MainController();

    io.on("connection", socket => {
        mainController.onConnection(socket, io);

        mainController.onDisconnect(socket);
    })

    return io;
}