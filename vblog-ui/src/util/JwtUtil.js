import Cookies from "universal-cookie/es6";

/**
 * JWT Claims contains:
 * - username: user name
 * - id: userId
 */

export default class JwtUtil {
	// Save token to cookie
	static saveToken = (token) => {
		const cookies = new Cookies()
		cookies.set("token", token, { path: '/'})
	}

	static removeToken = () => {
		const cookies = new Cookies()
		cookies.remove("token")
	}

	// Get token from cookie
	static getToken = () => {
		const cookies = new Cookies()
		const token = cookies.get("token")

		if (token !== undefined) {
			// if there is a jwt in cookie
			let jwtBody = token.substr(7)
			let claim = JSON.parse(atob(jwtBody.split(".")[1]))
			// check whether the jwt is expired
			if (parseInt(claim.exp) < Math.round(new Date().getTime() / 1000)) {
				// if so, remove the token from the cooke
				cookies.remove("token")
			} else {
				return token
			}
		}
	}

	// Get username, userId and token from cookie
	static getDetailAndToken = () => {
		let token = this.getToken()
		if (token !== undefined) {
			let jwtBody = token.substr(7)
			let claim = JSON.parse(atob(jwtBody.split(".")[1]))
			return {
				username: claim.username,
				id: claim.id,
				token: token
			}
		}else{
			return null;
		}
	}

	// Get username, userId from given token
	static getDetailFromToken = token => {
		let jwtBody = token.substr(7)
		let claim = JSON.parse(atob(jwtBody.split(".")[1]))
		return {
			username: claim.username,
			id: claim.id,
			token: token
		}
	}

	static verifyToken = () => {
		let token = this.getToken();
		if (token === undefined) {
			return false
		} else {
			return true;
		}
	}
}