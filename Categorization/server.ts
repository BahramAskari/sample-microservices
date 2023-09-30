import express, {Application, Request, Response} from "express";
import socketIO, { Server as SocketIOServer, Socket } from "socket.io";
import { createServer, Server as HTTPServer } from "http";

require('dotenv').config({path: './config/.env'})

const helmet = require("helmet");
const cors = require('cors')

import routes, {REQUEST} from './api/routes'

import sequelizeConnection from "./db/config"

import bodyParser from "body-parser";

import path from 'path';
import cookieParser from 'cookie-parser';
import lessMiddleware from 'less-middleware';
import ErrorHandlerMiddleware from "./api/middlewares/ErrorHandler.middleware";

const port = normalizePort(process.env.PORT || '3000');
/**
 * Cors Options
 */
const whitelist = ['http://localhost:4008', 'http://127.0.0.1:4008']
const corsOptions = {
    origin: whitelist
};



type socketAuth = {id: number}
/**
 * @Class SERVER
 */
export class Server {
    private httpServer: HTTPServer;
    private app: Application;

    private activeSockets: string[] = [];
    private readonly DEFAULT_PORT = port;

    constructor() {
        this.initialize();
    }

    private async initialize(): Promise<void> {

        this.app = express();
        this.app.set("port", this.DEFAULT_PORT)
        this.httpServer = createServer(this.app);

        this.dbInitialize();
        this.handleSecurity();
        this.configureApp();
        this.handleRoutes();

    }


    private configureApp(): void {

        this.app.use(bodyParser.urlencoded({ extended: false }));
        this.app.use(bodyParser.json());
        //  this.app.use(logger('dev'));
        this.app.use(express.json({}));
        this.app.use(express.urlencoded({extended: false}));
        this.app.use(cookieParser());
        this.app.use(lessMiddleware(path.join(__dirname, 'public')));
        this.app.use(express.static(path.join(__dirname, 'public')));

    }

    private handleSecurity(): void {

        this.app.use(
            helmet({
                contentSecurityPolicy: false,
            })
        );
        this.app.use(cors(corsOptions))

    }

    private dbInitialize(): void {

        sequelizeConnection
            .authenticate()
            .then(() => {
                console.log("Database connection success! Sequelize is ready to use...",process.env.DB_HOST);
            })
            .catch((err) => {
                console.log("Database connection failure.");
                console.error(err);
            });

    }

    private handleRoutes(): void {

        this.app.use("/api/v1", routes);

        this.app.use(ErrorHandlerMiddleware);

    }

    /**
     * Listen
     * @param callback
     */
    public listen( callback: (port: number) => void ): void {

        this.httpServer.listen( this.DEFAULT_PORT, () =>
            callback(parseInt(this.DEFAULT_PORT)
        ))
        //  this.httpServer.on('listening', this.onListening);
        this.httpServer.on('error', onError);

    }


}




/**
 * Normalize a port into a number, string, or false.
 */
function normalizePort(val) {
    const port = parseInt(val, 10);

    if (isNaN(port)) {
        // named pipe
        return val;
    }

    if (port >= 0) {
        // port number
        return port;
    }

    return false;
}

/**
 * Event listener for HTTP server "error" event.
 */
function onError(error) {
    if (error.syscall !== 'listen') {
        throw error;
    }

    const bind = typeof port === 'string'
        ? 'Pipe ' + port
       : 'Port ' + port;

    // handle specific listen errors with friendly messages
    switch (error.code) {
        case 'EACCES':
            console.error(bind + ' requires elevated privileges');
            process.exit(1);
            break;
        case 'EADDRINUSE':
            console.error(bind + ' is already in use');
            process.exit(1);
            break;
        default:
            throw error;
    }
}



/*
dbInit()
    .then(response=>console.log("Done"))
    .catch(e=>console.log("Error",e))
 */