var http = require('http');
var server = http.createServer(function(req, res) {
    res.writeHead(200, {'Content-Type': 'text/plain'});
        response = "wellcome;
    res.end(response);
});
server.listen();
