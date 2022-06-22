import * as Jimp from 'jimp';
import {httpServer} from './src/http_server';
import * as robot from 'robotjs';
import {createWebSocketStream, WebSocketServer} from 'ws';

const HTTP_PORT = 3000;

console.log(`Start static http server on the ${HTTP_PORT} port!`);
httpServer.listen(HTTP_PORT);

const wss = new WebSocketServer({
    port: 8080
})

wss.on('connection', ws => {
    const duplex = createWebSocketStream(ws, { encoding: 'utf8', decodeStrings: false });

    duplex.on('data', data => {
        const [command, value] = data.split(' ');
        const params = +value;
        const { x, y } = robot.getMousePos();

        switch (true) {
            case command === 'mouse_up':
                robot.moveMouse(x, y - params);
                robot.mouseClick();
                break;
            case command === 'mouse_down':
                robot.moveMouse(x, y + params);
                robot.mouseClick();
                break;
            case command === 'mouse_left':
                robot.moveMouse(x - params, y);
                robot.mouseClick();
                break;
            case command === 'mouse_right':
                robot.moveMouse(x + params, y);
                robot.mouseClick();
                break;
            case data.toString().startsWith('draw_circle'):
                break;
            case data.toString().startsWith('draw_rectangle'):
                break;
            case data.toString().startsWith('draw_square'):
                break;
            case data.toString() === 'mouse_position':
                break;
            case data.toString() === 'prnt_scrn':
                break;
        }
        // ws.send(`${data.toString()} x=${x}, y=${y}\0`);

        const message = `${command} ${x} ${y}`;
        duplex.write(message, 'utf-8');
    })
});

wss.on('close', () => {
    console.log('close');
})
