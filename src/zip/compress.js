import { createReadStream, createWriteStream } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { createGzip } from 'node:zlib';

const compress = async () => {
	const __filename = fileURLToPath(import.meta.url);
	const __dirname = path.dirname(__filename);
	const input = path.join(__dirname, 'files', 'fileToCompress.txt');
	const output = path.join(__dirname, 'files', 'archive.gz');
	const readStream = createReadStream(input);
	const gzipStream = createGzip();
	const writeStream = createWriteStream(output);

	readStream.on('error', () => {
		throw new Error('FS operation failed');
	});

	writeStream.on('error', () => {
		throw new Error('FS operation failed');
	});

	readStream.pipe(gzipStream).pipe(writeStream);
};

await compress();
