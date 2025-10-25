import { spawn } from 'node:child_process';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const spawnChildProcess = async args => {
	const scriptPath = join(__dirname, 'files', 'script.js');

	const childProcess = spawn('node', [scriptPath, ...args]);

	process.stdin.pipe(childProcess.stdin);

	childProcess.stdout.pipe(process.stdout);
};

spawnChildProcess(['arg1', 'arg2', 'arg3']);
