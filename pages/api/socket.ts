import { Server, ServerOptions } from "socket.io";
import type { NextApiRequest, NextApiResponse } from "next";
import MainController from "controllers/MainController";

export type SocketResponse = NextApiResponse & {
    socket: {
        server: {
            io: Server
        }
    }
};

export default function handler(req: NextApiRequest, res: SocketResponse) {
    if (res.socket.server.io) {
        res.end();
        return;
    }

    const io = new Server(res.socket.server as Partial<ServerOptions>);
    res.socket.server.io = io;

    const mainController = new MainController();

    // Define actions inside
    io.on("connection", socket => {
        mainController.onConnection(socket, io);

        mainController.onDisconnect(socket);
    });

    res.end();
}