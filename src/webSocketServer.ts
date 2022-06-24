import { createWebSocketStream, WebSocketServer,} from 'ws';
import * as robot from 'robotjs';
import { drawCircle } from './drawing/drawCircle';
import { drawRectangle } from './drawing/drawRectangle';
import { drawSquare } from './drawing/drawSquare';
import { printScreen } from './printScreen';

export const webSocketServer = () => {
    const wss = new WebSocketServer({
        port: 8080
    })

    wss.on('connection', ws => {
        const duplex = createWebSocketStream(ws, { encoding: 'utf8', decodeStrings: false });

        duplex.on('data', async data => {
            let message = '';
            let [command, width, length] = data.split(' ');
            const { x, y } = robot.getMousePos();
            width = +width;
            length = +length;

            process.stdout.write(`\nReceived: ${command} \n`);

            switch (true) {
                case command === 'mouse_up':
                    robot.moveMouse(x, y - width);
                    message = `${command}`;
                    break;
                case command === 'mouse_down':
                    robot.moveMouse(x, y + width);
                    message = `${command}`;
                    break;
                case command === 'mouse_left':
                    robot.moveMouse(x - width, y);
                    message = `${command}`;
                    break;
                case command === 'mouse_right':
                    robot.moveMouse(x + width, y);
                    message = `${command}`;
                    break;
                case command === 'draw_circle':
                    drawCircle(width, x, y);
                    message = `${command}`;
                    break;
                case command === 'draw_rectangle':
                    drawRectangle(width, length, x, y);
                    message = `${command}`;
                    break;
                case command === 'draw_square':
                    drawSquare(width, x, y);
                    message = `${command}`;
                    break;
                case command === 'mouse_position':
                    message = `${command} ${x},${y}`;
                    break;
                case data.toString() === 'prnt_scrn':
                    message = `${command} ${await printScreen(x, y)}`;
                    break;
            }

            duplex.write(`${message} \0`, 'utf-8');
            process.stdout.write(`Result: ${command === 'mouse_position' ? message : data} \n`);
        })
    });

    process.on('exit', () => {
        wss.close();
        process.stdout.write('Websocket closed. \n');
    });
}
