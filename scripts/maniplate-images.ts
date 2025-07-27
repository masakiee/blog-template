import path from 'node:path';
import fs from 'node:fs';
import fsp from "node:fs/promises";
import sharp from 'sharp';
import convert from "heic-convert"

async function resizeImage(inputPath: string): Promise<void> {
    try {
        let image: sharp.Sharp;
        if (/\.heic$/i.test(inputPath)) {
            const inputBuffer = await fsp.readFile(inputPath);
            const outputBuffer = await convert({
                buffer: inputBuffer,
                format: 'JPEG',
                quality: 1,
            });
            image = sharp(outputBuffer);
        } else {
            image = sharp(inputPath);
        }
        const metadata = await image.metadata();

        if (!metadata.width || !metadata.height) {
            throw new Error('画像のメタデータを取得できませんでした');
        }

        const maxDimension = 1200;
        const resizeFactor = Math.min(
            maxDimension / metadata.width,
            maxDimension / metadata.height,
            1
        );

        const width = Math.round(metadata.width * resizeFactor);
        const height = Math.round(metadata.height * resizeFactor);

        const parsedPath = path.parse(inputPath);
        const outputPath = path.join(
            parsedPath.dir,
            `${parsedPath.name}.jpg`
        );

        await image
            .resize(width, height)
            .toFormat('jpeg', { quality: 50 })
            .toFile(outputPath);

        console.log(`画像を処理しました: ${outputPath}`);
    } catch (error) {
        console.error(`画像の処理中にエラーが発生しました: ${inputPath}`, error);
    }
}

async function main() {
    const imagePaths = process.argv.slice(2);

    if (imagePaths.length === 0) {
        console.error('画像ファイルのパスを指定してください');
        process.exit(1);
    }

    for (const imagePath of imagePaths) {
        if (!fs.existsSync(imagePath)) {
            console.error(`ファイルが見つかりません: ${imagePath}`);
            continue;
        }
        await resizeImage(imagePath);
    }
}

main().catch(console.error);
