const app = require('./app');
const port = process.env.PORT || 8080;
const http = require('http');

// Create a server
const server = http.createServer(app);

server.listen(port);
