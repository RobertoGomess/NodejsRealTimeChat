var app = require('./config/server');

var server = app.listen('80', () => {
    console.log('servidor rodando.');
});

var io = require('socket.io').listen(server);
app.set('io', io);

io.on('connection', (socket) => {
    console.log('usuario conectado');
    socket.on('disconnect', () => {
        console.log('usuario desconectado');
    });

    socket.on('enviarParaServidor', (data) => {
            socket.emit(
                'mgsParaCliente', 
                    {
                        apelido: data.apelido,
                        mensagem: data.mensagem
                    }
            );

            socket.broadcast.emit(
                'mgsParaCliente', 
                    {
                        apelido: data.apelido, 
                        mensagem: data.mensagem
                    }
            );

            if(parseInt(data.primeiraMensagem) == 1){
                socket.emit(
                    'participantesParaCliente', 
                        {
                            apelido: data.apelido
                        }
                    );
        
                socket.broadcast.emit(
                    'participantesParaCliente', 
                        {
                            apelido: data.apelido
                        }
                    );
            }

        });
});

