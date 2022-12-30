import type { HTTPPort } from "types";

export default function onListening(port: HTTPPort) {
    console.log("Listening on port", port);
}