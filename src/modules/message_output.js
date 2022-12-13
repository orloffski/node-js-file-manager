export const printHello = (username, currDirName) => {
	console.log(`Welcome to the File Manager, ${username}!`);
	console.log(`You are currently in ${currDirName}`);
}

export const printGoodBy = (username) => {
	console.log(`Thank you for using File Manager, ${username}, goodbye!`);
}