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