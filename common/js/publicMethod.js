class publicMethod {
	//用户名的正则，
	static usernamereg(value){
		let usernamereg=/^[a-zA-Z]*[a-zA-Z]+[0-9]+/;
		return usernamereg.test(value);
	}
	//密码的正则，
	static passwordreg(value){
		//let passwordreg=/^[a-zA-Z0-9]{8,12}$/;
		let passwordreg= /(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[^a-zA-Z0-9]).{8,12}$/;
		return passwordreg.test(value);
	}
	//手机的正则
	static phonereg(value){
		let phonereg=/^1\d{10}$/;
		return phonereg.test(value);
	}
	
}


export default publicMethod;