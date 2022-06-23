import { createWebSocketStream, WebSocketServer,} from 'ws';
import * as robot from 'robotjs';
import { drawCircle } from './drawing/drawCircle';
import { drawRectangle } from './drawing/drawRectangle';
import { drawSquare } from './drawing/drawSquare';

export const webSocketServer = () => {
    const wss = new WebSocketServer({
        port: 8080
    })

    wss.on('connection', ws => {
        const duplex = createWebSocketStream(ws, { encoding: 'utf8', decodeStrings: false });

        duplex.on('data', data => {
            let [command, width, length] = data.split(' ');
            const { x, y } = robot.getMousePos();
            width = +width;
            length = +length;

            switch (true) {
                case command === 'mouse_up':
                    robot.moveMouse(x, y - width);
                    robot.mouseClick();
                    break;
                case command === 'mouse_down':
                    robot.moveMouse(x, y + width);
                    robot.mouseClick();
                    break;
                case command === 'mouse_left':
                    robot.moveMouse(x - width, y);
                    robot.mouseClick();
                    break;
                case command === 'mouse_right':
                    robot.moveMouse(x + width, y);
                    robot.mouseClick();
                    break;
                case command === 'draw_circle':
                    drawCircle(width, x, y);
                    break;
                case command === 'draw_rectangle':
                    drawRectangle(width, length, x, y);
                    break;
                case command === 'draw_square':
                    drawSquare(width, x, y);
                    break;
                case command === 'mouse_position':
                    console.log(`mouse_position ${x},${y}`)
                    break;
                case data.toString() === 'prnt_scrn':
                    break;
            }

            const message = `${command} ${x},${y}`;
            duplex.write(message, 'utf-8');
        })
    });

    wss.on('close', () => {
        console.log('close');
    })
}
