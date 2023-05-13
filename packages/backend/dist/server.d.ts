/// <reference types="node" />
import 'dotenv/config';
declare const server: import("http").Server<typeof import("http").IncomingMessage, typeof import("http").ServerResponse>;
export default server;
