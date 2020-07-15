import React from "react";
import {
	Redirect,
	Route
} from "react-router-dom";
import JwtUtil from "../../util/JwtUtil";

const AuthenticationRoute = ({ loginUser, children, ...rest }) => {
	const handleRender = ({location}) => {
		if(loginUser !== undefined){
			return children
		}else{
			return (<Redirect
				to={{
					pathname: "/login",
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