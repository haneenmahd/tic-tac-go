import { Server } from "socket.io";
import type { NextApiRequest, NextApiResponse } from "next";

export type SocketResponse = NextApiResponse & {
    socket: {
        server: {
            io: Server
        }
    }
};

export default function handler(req: NextApiRequest, res: SocketResponse) {
    if (!res.socket!.server.io) {
        const io = new Server(res.socket!.server);
        res.socket!.server.io = io;

        io.on("connection", socket => {
            // add events
        });
    }

    res.end();
}