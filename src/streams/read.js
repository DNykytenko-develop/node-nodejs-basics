import { createReadStream } from 'node:fs';
import path from 'node:path';
import { pipeline } from 'node:stream/promises';
import { fileURLToPath } from 'node:url';

const read = async () => {
	const __filename = fileURLToPath(import.meta.url);
	const __dirname = path.dirname(__filename);
	const filePath = path.join(__dirname, 'files', 'fileToRead.txt');

	const readableStream = createReadStream(filePath, { encoding: 'utf-8' });

	await pipeline(readableStream, process.stdout);
};

await read();
