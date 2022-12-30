import type { HTTPError, HTTPPort } from "src/types";

export default function onError(error: HTTPError, port: HTTPPort) {
    if (error.syscall !== "listen") {
        throw error; // internal error
    }

    switch (error.code) {
        case "EACCES":
            console.error("Requires preveligied access to host on the port", port);
            process.exit(1);
        case "EADDRINUSE":
            console.error("Port", port, "already in use! Use another port instead.")
            process.exit(1);
        default:
            throw error;
    }
}