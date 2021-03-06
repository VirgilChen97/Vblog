import React, {useContext} from "react";
import { UserContext } from "../../App"
import {
	Redirect,
	Route
} from "react-router-dom";

const AuthenticationRoute = ({ children, ...rest }) => {
	const { loginUser } = useContext(UserContext)

	const handleRender = ({location}) => {
		if(loginUser !== null){
			return children
		}else{
			return (<Redirect
				to={{
					pathname: "/LoginPage",
					state: { from: location }
				}}
			/>)
		}
	}
	return (
		<Route
			{...rest}
			render={handleRender}
		/>
	);
}

export default AuthenticationRoute