import Jimp from 'jimp';
import * as robot from 'robotjs';

export const printScreen = async (x: number, y: number) => {
    const size = 100;
    const image = robot.screen.capture(x - size, y - size, size * 2, size * 2);

    for (let i = 0; i < image.image.length; i += 1) {
        if (i % 4 === 0) {
            [image.image[i], image.image[i + 2]] = [image.image[i + 2], image.image[i]];
        }
    }

    const jimp = new Jimp({
        data: image.image,
        width: image.width,
        height: image.height,
    });

    return (await jimp.getBase64Async(Jimp.MIME_PNG)).split(',')[1];
}
