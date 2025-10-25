import { createReadStream, createWriteStream } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { createGunzip } from 'node:zlib';

const decompress = async () => {
	const __filename = fileURLToPath(import.meta.url);
	const __dirname = path.dirname(__filename);
	const input = path.join(__dirname, 'files', 'archive.gz');
	const output = path.join(__dirname, 'files', 'fileToCompress.txt');
	const readStream = createReadStream(input);
	const gunzipStream = createGunzip();
	const writeStream = createWriteStream(output);

	readStream.on('error', () => {
		throw new Error('FS operation failed');
	});

	writeStream.on('error', () => {
		throw new Error('FS operation failed');
	});

	readStream.pipe(gunzipStream).pipe(writeStream);
};

await decompress();
