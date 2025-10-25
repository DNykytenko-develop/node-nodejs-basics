import { createWriteStream } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const write = async () => {
	const __filename = fileURLToPath(import.meta.url);
	const __dirname = path.dirname(__filename);
	const filePath = path.join(__dirname, 'files', 'fileToWrite.txt');

	const writable = createWriteStream(filePath, { encoding: 'utf-8' });

	process.stdin.pipe(writable);
};

await write();
