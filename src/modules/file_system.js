import { readdir } from 'node:fs/promises';
import fs from 'node:fs/promises';
import chdir from 'node:process';
import { access, constants } from 'node:fs/promises';
import path from 'node:path';

export const ls_command = async(currentDir) => {
	try {
		const arrayForOutput = [];

		const files = await readdir(currentDir);
		for (const file of files){
			const fileItem = {
				name: file,
				type: ''
			};

			console.log(path.join(currentDir, file));

			if(await access(path.join(currentDir, file), constants.F_OK)
				.then(value => true)
				.catch(err => false)){

				await fs.stat(file).then(stats => {
					if(stats.isFile()){
						fileItem.type = 'file';
					}

					if(stats.isDirectory()){
						fileItem.type = 'directory';
					}

					if(stats.isDirectory() || stats.isFile()){
						arrayForOutput.push(fileItem);
					}
				});
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

export const up_command = async(currentDir) => {
	try{
		chdir(path.join(currentDir,'../'));

		return true;
	}catch(err){
		return false;
	}
}