import type { HTTPPort } from "src/types";

export default function onListening(port: HTTPPort) {
    console.log("Listening on port", port);
}