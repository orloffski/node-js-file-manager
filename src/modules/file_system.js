import { readdir } from 'node:fs/promises';
import fs from 'node:fs/promises';

export const ls_command = async(currentDir) => {
	try {
		const arrayForOutput = [];

		const files = await readdir(currentDir);
		for (const file of files){
			const fileItem = {
				name: file,
				type: ''
			};

			const stats = fs.stat(file);

			if((await stats).isFile()){
				fileItem.type = 'file';
			}

			if((await stats).isDirectory()){
				fileItem.type = 'directory';
			}

			if(!(await stats).isSymbolicLink()){
				arrayForOutput.push(fileItem);
			}
		}

		arrayForOutput.sort((a,b) => {
			if (a.type < b.type) {
				return -1;
			}
			if (a.type > b.type) {
				return 1;
			}

			return 0;
		})
		console.table(arrayForOutput);

		return true;
	}catch (err){
		return false;
	}
}