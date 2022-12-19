import * as fs from "./file_system.js";
import * as hash from "./hash.js";
import * as os from "./os_info.js";
import { checkCommand, commands } from "./parser.js";

export const run = async(command_line, currDirName) => {
	return new Promise((resolve, reject) => {
		let engineResponse = {};

		if(checkCommand(command_line)){
			runCommand(command_line, currDirName)
				.then(result => {
					engineResponse = {
						success: result
					};
					resolve(engineResponse);
				})
		}else{
			engineResponse = {
				success: false
			};
			resolve(engineResponse);
		}
	})
}


const runCommand = async(command_line, currDirName) => {
	switch(command_line.split(' ')[0]) {
		case commands[0]:  // up
			return await fs.up_command(currDirName);
		case commands[1]:  // cd
		  	return await fs.cd_command(command_line);
		case commands[2]:  // ls
			return await fs.ls_command(currDirName);
		case commands[3]:  // cat
		  	console.log(commands[3]);
			return true;
		case commands[4]:  // add
		  	console.log(commands[4]);
			return true;
		case commands[5]:  // rn
		  	console.log(commands[5]);
			return true;
		case commands[6]:  // cp
		  	console.log(commands[6]);
			return true;
		case commands[7]:  // mv
		  	console.log(commands[7]);
			return true;
		case commands[8]:  // rm
		  	console.log(commands[8]);
			return true;
		case commands[9]:  // os
		  	return os.getInfo(command_line);
		case commands[10]:  // hash
			return await hash.getHash(command_line);
		case commands[11]:  // compress
		  	console.log(commands[11]);
			return true;
		case commands[12]:  // decompress
		  	console.log(commands[12]);
			return true;
		default:
		  return false;
	  }
}