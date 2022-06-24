import { httpServer } from './src/http_server';
import { webSocketServer } from './src/webSocketServer';

const HTTP_PORT = 3000;

console.log(`Start static http server on the ${HTTP_PORT} port!`);
httpServer.listen(HTTP_PORT);

webSocketServer();
