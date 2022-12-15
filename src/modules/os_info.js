import os from 'node:os';

import * as printLog from './message_output.js';

export const getInfo = async(command_line) => {
	try{
		const command = command_line.split(' ')[1];

		console.log(command);

		switch(command){
			case '--EOL':
				printLog.printEOL(os.EOL);
				return true;
			case '--cpus':
				const cpu = os.cpus();
				printLog.printCpus({cpus: cpu.length, modelInfo: cpu[0].model});
				return true;
			case '--homedir':
				printLog.printHomeDir(os.homedir());
				return true;
			case '--username':
				const user = os.userInfo();
				printLog.printUserName(user.username)
				return true;
		}

		return true;
	}catch(err){
		console.log(err);
		return false;
	}
}