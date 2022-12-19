import fs from 'node:fs';
import fsPromises from 'node:fs/promises';

import { checkFileDestination, getDestination } from './parser.js';

export const cat = (command_line) => {
	return new Promise((resolve, reject) => {
		const filePath = getDestination(command_line, 1);

		if(!checkFileDestination(filePath)
			.then(value => value)
			.catch(err => false)){

			resolve(false);
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

export const add = (command_line) => {
	return new Promise((resolve, reject) => {
		const filePath = getDestination(command_line, 1);

		if(!checkFileDestination(filePath)
			.then(value => value)
			.catch(err => false)){

			resolve(false);
		}

		fsPromises.open(filePath, 'w')
			.then(value => resolve(true))
			.catch(err => resolve(false));
	})
}