import * as robot from 'robotjs';

export const drawCircle = (radius: number, x: number, y: number) => {
    robot.mouseToggle('down');

    for (let i = 0; i <= Math.PI * 2; i += Math.PI * 0.01) {
        const mouseX = x - radius + (radius * Math.cos(i));
        const mouseY = y + (radius * Math.sin(i));

        robot.dragMouse(mouseX, mouseY);
    }

    robot.mouseToggle('up');
}
