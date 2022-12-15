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