import path from 'node:path';
import  { pipeline } from 'node:stream';
import { createBrotliCompress, createBrotliDecompress } from 'node:zlib';
import { createReadStream, createWriteStream } from 'node:fs';

import { getPathAbsolute, checkFileDestination, checkFolderDestination, getDestination } from './parser.js';

export const compress = async(command_line) => {
	return new Promise((resolve, reject) => {
		try{
			if(!checkLine(command_line)){
				resolve(false);
			}

			const fileName = path.basename(getDestination(command_line, 1));

			const gzipBrotli = createBrotliCompress();
			const source = createReadStream(getDestination(command_line, 1));
			const destination = createWriteStream(path.join(getDestination(command_line, 3), fileName + '.gz'));

			pipeline(source, gzipBrotli, destination, (err) => {
				if(err){
					resolve(false);
				}else{
					console.log('File ' + fileName + ' successfully compressed');
					resolve(true);
				}
			})
		}catch(err){
			resolve(false);
		}
	})
}

export const decompress = async(command_line) => {
	return new Promise((resolve, reject) => {
		try{
			if(!checkLine(command_line)){
				resolve(false);
			}

			const fileName = path.parse(getDestination(command_line, 1)).name;

			const gzipBrotli = createBrotliDecompress();
			const source = createReadStream(getDestination(command_line, 1));
			const destination = createWriteStream(path.join(getDestination(command_line, 3), fileName));

			pipeline(source, gzipBrotli, destination, (err) => {
				if(err){
					resolve(false);
				}else{
					console.log('File ' + path.basename(command_line.split(' ')[1]) + ' successfully decompressed');
					resolve(true);
				}
			})
		}catch(err){
			resolve(false);
		}
	})
}

const checkLine = (command_line) => {
	if(command_line.split(' ').lenght < 3){
		return false;
	}

	if(!checkFileDestination(command_line.split(' ')[1]).then(value => value).catch(err => false) || 
		!checkFolderDestination(command_line.split(' ')[2]).then(value => value).catch(err => false)){
		return false;
	}

	return true;
}