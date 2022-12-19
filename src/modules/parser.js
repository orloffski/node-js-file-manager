import fs from 'node:fs/promises';
import { access, constants } from 'node:fs/promises';
import path from 'node:path';
import { cwd } from 'node:process';

export const commands = ['up', 'cd', 'ls', 'cat', 'add', 'rn', 'cp', 'mv', 'rm', 'os', 'hash', 'compress', 'decompress'];

export const parseUserName = async(argvString) => {
	return new Promise((resolve, reject) => {
		try{
			const userName = argvString.split('=')[1];

			if(!userName)
				throw new Error('incorrect username input');

			resolve(userName);
		}catch(err){
			resolve('Anonimous')
		}
	})
}

export const checkCommand = (command_line) => {
	if(commands.includes(command_line.split(' ')[0]))
		return true;

	return false;
}

export const getDestination = (command_line) => {
	let delimiter;

	if(!command_line.includes('\'') && !command_line.includes('"')){
		return command_line.split(' ')[1];
	}

	if(command_line.includes('\'')){
		delimiter = '\'';
	}else if(command_line.includes('\"')){
		delimiter = '\"';
	}

	return command_line.split(delimiter)[1];
}

export const checkFileDestination = async(filePathString) => {
	try{
		const filePath = getPathAbsolute(filePathString);

		if(await access(filePath, constants.R_OK)
			.then(value => true)
			.catch(err => false)){

			const check = await fs.stat(filePath)
				.then(stats => {
					if(!stats.isFile()){
						return false;
					}

					return true;
				})
				.catch(err => {
					return false;
				})

			return check;
		}
	}catch(err){
		return false;
	}
}

export const checkFolderDestination = async(filePathString) => {
	try{
		const filePath = getPathAbsolute(filePathString);

		if(await access(filePath, constants.R_OK)
			.then(value => true)
			.catch(err => false)){

			const check = await fs.stat(filePath)
				.then(stats => {
					if(!stats.isDirectory()){
						return false;
					}

					return true;
				})
				.catch(err => {
					return false;
				})

			return check;
		}
	}catch(err){
		return false;
	}
}

export const getPathAbsolute = (pathString) => {
	if(path.isAbsolute(pathString)){
		return pathString;
	}else if(pathString[pathString.length - 1] == ':'){
		return path.join(pathString, '/');
	}else{
		return path.join(cwd(), pathString);
	}
}

