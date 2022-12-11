import { argv } from 'node:process';
import { parseUserName } from './modules/parser.js';

parseUserName(argv.splice(2)[0])
	.then(value => console.log(value));