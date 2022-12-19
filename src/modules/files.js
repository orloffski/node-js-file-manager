import fs from 'node:fs';

import { checkFileDestination } from './parser.js';

export const cat = (command_line) => {
	return new Promise((resolve, reject) => {
		const filePath = command_line.split(' ')[1];

		if(!checkFileDestination(filePath)
			.then(value => value)
			.catch(err => false)){

			resolove(false);
		}

		const fileReadStream = fs.createReadStream(filePath);

		fileReadStream.on('data', chunk => console.log(chunk.toString()));

		fileReadStream.on('end', () => {
			resolve(true);
		});

		fileReadStream.on('error', () => {
			resolve(false);
		})
	})
}