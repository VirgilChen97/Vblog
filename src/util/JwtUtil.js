import Cookies from "universal-cookie/es6";

export default class JwtUtil {
	static saveToken = (token) => {
		const cookies = new Cookies()
		cookies.set("token", token)
	}

	static getToken = () => {
		const cookies = new Cookies()
		const token = cookies.get("token")
		if(token !== undefined){
			let jwtBody = token.substr(7)
			let claim = JSON.parse(atob(jwtBody.split(".")[1]))
			if(parseInt(claim.exp) < Math.round(new Date().getTime()/1000)){
				cookies.remove("token")
			}else{
				return token
			}
		}
	}

	static verifyToken =() => {
		let token = this.getToken();
		if(token === undefined){
			return false
		}else{
			return true;
		}
	}

	static AuthenticateRequest = (requestBody, relativeUrl) => {
		let request = new Request(`${process.env.REACT_APP_API_ENDPOINT}${relativeUrl}`, {
			headers: {
				'Content-Type': "application/json",
				"Authorization": this.getToken()
			},
			method: 'POST',
			body: JSON.stringify(requestBody)
		})
		return request;
	}
}