// Server basicao
var app = require('http').createServer(index)
  , io = require('socket.io').listen(app)
  , fs = require('fs')
;
app.listen(process.env.PORT ||3000, function() {
  console.log("Servidor rodando!" + process.env.PORT);
});

function index(req, res){
  fs.readFile(__dirname + '/index.html', function(err, data){
	res.writeHead(200);
    res.end(data);
  });
};

//Global manter o lstrgSocketidClient connection master
lstrgSocketidClient ='';

// Iniciando Socket
// Evento connection ocorre quando entra um novo usuário.
io.on('connection', function(socket){

    socket.on('setIdServer', function(socket){
        if (!lstrgSocketidClient)
            lstrgSocketidClient = socket.socketIdClient;
        //Ternary
        //lstrgSocketidClient = (!lstrgSocketidClient) ? socket.socketIdClient : lstrgSocketidClient;
    });   

    socket.on('ligar', function(visitas){
        socket.broadcast.emit('ligar', {'lstrgSocketServer':lstrgSocketidClient});
    });
    
    socket.emit('lbolSocketidClient', {'lstrgSocketServer':lstrgSocketidClient});    
   
});
