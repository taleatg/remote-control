import * as robot from 'robotjs';

export const drawSquare = (width: number, x: number, y: number) => {
    robot.mouseToggle('down');

    robot.moveMouseSmooth(x + +width, y);
    robot.moveMouseSmooth(x + +width, y + +width);
    robot.moveMouseSmooth(x, y + +width);
    robot.moveMouseSmooth(x, y);

    robot.mouseToggle('up');
}
