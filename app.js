const server = require('ws').Server;
const port = process.env.PORT || 1953;
const s = new server({ port: port});
let counter = 0;
let counteronline = 1;
// console.log("start");
s.on('connection', function(ws){
    counter++;
    ws.on('message', function(message){
        message = JSON.parse(message);

        if (message.type == "sesion"){
            s.clients.forEach(function e(client) {
                if (client != ws) {
                if (client.sesion == message.sesion) {
                    counteronline = counteronline + 1;
                }}

            });

            ws.sesion = message.sesion;
            ws.nama = message.nama
            return;
        }else{
            if (message.type == "statususer") {
                console.log(counter + ' : '+ message.status +" : "+ message.nama);
                s.clients.forEach(function e(client) {
                        if (client.sesion == ws.sesion) {
                            client.send(JSON.stringify({
                                type: "statususer",
                                status: "online",
                                nama: ws.nama,
                                counter: counteronline,
                            }));
                        }

                    if (client.sesion == "498E432e605J210f844v817v609x577j219a446I343n339k617Z586S243V770R610m303n252L659m253U415V577v828U77O") {
                        nama = ws.nama,
                            client.send(JSON.stringify({
                                type: "monitoring",
                                counter: counter,
                                nama: nama,
                            }));
                    }


                });
        // when open
            }
            if (message.type == "message") {
                console.log(message.nama+' : ' + message.message);
            }
        }




        s.clients.forEach(function e(client) {
            if (client != ws) {
            if (client.sesion == ws.sesion){

                if (message.type == "message") {
                    client.send(JSON.stringify({
                        type : "pesan",
                        message: message.message,
                        nama: message.nama,
                        // sesion : ws.sesion,
                        // temporary: message.temporary,
                        // client: client.sesion,
                        // ws: ws.sesion
                    }));
                }
            }
            }


        });


    });




    ws.on("close", function(){
        counter--;
        console.log(ws.nama +" disconected: " + counter);
        s.clients.forEach(function e(client) {
            if (client != ws) {
                if (client.sesion == ws.sesion){
                    counteronline = counteronline - 1;
                    client.send(JSON.stringify({
                        type: "statususer",
                        status: "offline",
                        nama: ws.nama,
                        counter: counteronline,
                    }));
                }
            }

            if (client.sesion == "498E432e605J210f844v817v609x577j219a446I343n339k617Z586S243V770R610m303n252L659m253U415V577v828U77O") {
                nama = ws.nama,
                    client.send(JSON.stringify({
                        type: "monitoring",
                        counter: counter,
                        nama: nama,
                    }));
            }


        });
        // when close
    });


    // console.log("1 koneksi baru: " + counter );


    // setInterval(function () {
    //     s.clients.forEach(function e(client) {
    //         client.send(JSON.stringify({
    //             type: "on",
    //         }));
    //     });
    // }, 5000);


});
