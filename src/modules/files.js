import fs from 'node:fs';
import fsPromises from 'node:fs/promises';

import { checkFileDestination, checkFolderDestination, getDestination, getPathAbsolute } from './parser.js';

export const cat = (command_line) => {
	return new Promise((resolve, reject) => {
		const filePath = getDestination(command_line, 1, 0).first;

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
		const filePath = getDestination(command_line, 1, 0).first;

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

export const remove = (command_line) => {
	return new Promise((resolve, reject) => {
		const filePath = getDestination(command_line, 1, 0).first;

		if(!checkFileDestination(filePath)
			.then(value => value)
			.catch(err => false) ||
		!checkFolderDestination(filePath)
			.then(value => value)
			.catch(err => false)){

			resolve(false);
		}

		fsPromises.rm(filePath, {recursive : true})
			.then(value => resolve(true))
			.catch(err => resolve(false));
	})
}

export const rename = (command_line) => {
	return new Promise((resolve, reject) => {
		const destination = getDestination(command_line, 1, 3);
		const fileOldName = destination.first;
		const fileNewName = destination.second;

		if(!checkFileDestination(fileOldName)
			.then(value => value)
			.catch(err => false) ||
		!checkFileDestination(fileNewName)
			.then(value => value)
			.catch(err => false)){

				console.log('not file');

			resolve(false);
		}

		fsPromises.rename(fileOldName, fileNewName)
			.then(val => resolve(true))
			.catch(err => resolve(false));
	})
}