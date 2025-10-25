import { access, readFile } from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const read = async () => {
	const __filename = fileURLToPath(import.meta.url);
	const __dirname = path.dirname(__filename);
	const filePath = path.join(__dirname, 'files', 'fileToRead.txt');

	try {
		await access(filePath);

		const content = await readFile(filePath, 'utf-8');
		console.log(content);
	} catch {
		throw new Error('FS operation failed');
	}
};

await read();
