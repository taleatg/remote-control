import { httpServer } from './src/http_server';
import { webSocketServer } from './src/webSocketServer';

const HTTP_PORT = 3000;

httpServer.listen(HTTP_PORT);
process.stdout.write(`Start static http server on the ${HTTP_PORT} port!\n`);

webSocketServer();
