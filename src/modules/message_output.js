export const printHello = (username, currDirName) => {
	console.log(`Welcome to the File Manager, ${username}!`);
	console.log(`You are currently in ${currDirName}`);
}

export const printGoodBy = (username) => {
	console.log(`Thank you for using File Manager, ${username}, goodbye!`);
}

export const printCurrentDir = (currDirName) => {
	console.log(`You are currently in ${currDirName}`);
}

export const printOperationFailed = () => {
	console.error('Operation failed');
}

export const printEOL = (data_for_print) => {
	if(data_for_print == '\r\n'){
		console.log('\\r\\n');
	}else{
		console.log('\\n');
	}
}

export const printCpus = (data_for_print) => {
	console.log(`This PC have ${data_for_print.cpus} logical processors: ${data_for_print.modelInfo}`);
}