// simple HTTP server using TCP sockets
var net = require('net');
// var fs = require('fs');
// const { request } = require('http');
// const { Http2ServerRequest } = require('http2');
// const { sep } = require('path');
var positions = null;
var counter = 0;

var server = net.createServer(function (socket) {

    socket.on('data', function (data) {
        //console.log('Received: ' + data);
        r = data.toString();
        if (r.substring(0, 3) == "GET") {  // if GET only
            // Server is not checking to make sure that the client 
            // actually sent a well-formed header.

            socket.write("HTTP/1.1 200 OK\n");
            console.log('Responding with index.html\n');

            //cors header
            socket.write("Access-Control-Allow-Origin: *\n");
                
            console.log("calling through get")
                contents = JSON.stringify(positions);
                socket.write("Content-Length:" + contents.length);
                socket.write("\n\n"); // two carriage returns; 
                socket.write(contents);
        

        }
        else if (r.substring(0, 4) == "POST") { // if POST onl
            console.log("Received post");

            //split the data and put it in value
            var him = r.indexOf("StartX");
            var our_length = r.length - him;
            var text = r.substring(him, (him+our_length));
            var seperate = text.split("&");
            positions = seperate;
            console.log(counter++);


            console.log(seperate);
            // socket.write("HTTP/1.1 200 OK\n");


            // socket.write("Content-Length:" + message.length);
            // socket.write("\n\n"); // two carriage returns
            // socket.write(message);
    

        }
        else console.log(r); // show the actual message
    });
    socket.on('close', function () {
        console.log('Connection closed');
    });
    socket.on('end', function () {
        console.log('client disconnected');
    });

    socket.on('error', function () {
        console.log('client disconnected');
    });
});
server.listen(8080, function () {
    console.log('server is listening on port 8080');
});