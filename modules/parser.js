export const parseUserName = async(argvString) => {
	return new Promise((resolve, reject) => {
		try{
			const userName = argvString.replace('--','').split('=')[1];
			resolve(userName);
		}catch(err){
			resolve('Anonimous')
		}
	})
}