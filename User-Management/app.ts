#!/usr/bin/env node

/**
 * Module dependencies.
 */

import {Server} from "./server"
/* TS import */


const server = new Server();

server.listen(port => {
    console.log(`Server is listening on http://localhost:${port}`);
});