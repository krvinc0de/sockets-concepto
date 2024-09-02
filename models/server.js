import express from "express"; //IMPORTACION DE EXPRESS
import { createServer } from "http";
import { Server as SocketServer } from "socket.io";
import Sockets from "./sockets.js";
import 'dotenv/config';

class Server {

    //atributos de la clase
    constructor() {
        this.app = express();
        this.port = process.env.PORT;

        //http server
        this.pureServer = createServer(this.app); //configuracion de http
        //sockets configs
        this.io = new SocketServer(this.pureServer); //configuracion de socket.io
    }


    //metodos

    //motodo para inicializar la instancia de la clase Sockets
    // y el metodo de escucha/emision de eventos
    startSocketServer() {
        new Sockets(this.io).socketEvents();
    }

    middlewares() {
        this.app.use(express.static("public"));
    }

    startServer() {
        //inicializar middlewares
        this.middlewares();

        //inicializar sockets
        this.startSocketServer();

        //inicializar server
        this.pureServer.listen(this.port, () => {
            console.log("Server running on port", this.port);
        })
    }

}

export default Server; //EXPORTACION DE LA CLASE SERVER