import { ls_command, up_command } from "./file_system.js";
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
			return await up_command(currDirName);
		case commands[1]:  // cd
		  	console.log(commands[1]);
			return true;
		case commands[2]:  // ls
			return await ls_command(currDirName);
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
		  	console.log(commands[9]);
			return true;
		case commands[10]:  // hash
		  	console.log(commands[10]);
			return true;
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