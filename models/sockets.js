class Sockets {

    constructor ( io ) {
        this.io = io;
    }

    socketEvents() {
        this.io.on('connection', (socket) => {
            console.log('Client connected');

            socket.emit('mensaje-bienvenida', 'Welcome to the server');

            socket.on('mensaje-cliente', (data) => {
                console.log(data);
                //socket.emit('mensajes-emitidos', data); //emite el mensaje al cliente que lo envio
                this.io.emit('mensajes-emitidos', data); //emite el mensaje a todos los clientes
            });

        });
    }

}

export default Sockets; //EXPORTACION DE LA CLASE SOCKETS