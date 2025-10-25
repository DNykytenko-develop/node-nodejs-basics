import { createHash } from 'node:crypto';
import { createReadStream } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const calculateHash = async () => {
	const __filename = fileURLToPath(import.meta.url);
	const __dirname = path.dirname(__filename);
	const filePath = path.join(__dirname, 'files', 'fileToCalculateHashFor.txt');

	const hash = createHash('sha256');
	const stream = createReadStream(filePath);

	stream.on('data', chunk => hash.update(chunk));

	stream.on('end', () => {
		const digest = hash.digest('hex');
		console.log(digest);
	});

	stream.on('error', () => {
		throw new Error('FS operation failed');
	});
};

await calculateHash();
