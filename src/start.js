import { argv, stdin as input, stdout as output  } from 'node:process';
import * as readline from 'node:readline/promises';
import os from 'node:os';

import { parseUserName } from './modules/parser.js';
import { printGoodBy, printHello } from './modules/message_output.js';

const currDirName = os.homedir();

parseUserName(argv.splice(2)[0])
	.then(username => {
		printHello(username, currDirName);

		const read = readline.createInterface({ input, output })
		read.on('line', (input) => {
			if(input == 'exit'){
				sayGoodByAndExit(username, read);
				return;
			}

  			console.log(`Received: ${input}`);
		})
		read.on('SIGINT', () => {
			sayGoodByAndExit(username, read);
		});
	});

const sayGoodByAndExit = (username, reader) => {
	printGoodBy(username);
	reader.close();
}