import React from 'react'
import {
	BrowserRouter as Router,
	Switch,
	Route,
	Link,
	useRouteMatch,
	useParams
} from 'react-router-dom'

const AppRouter = () => {
	return (
		<Router>
			<div>
				<nav>
					<ul>
						<li>
							<Link to="/">Home</Link>
						</li>
						<li>
							<Link to="/about">About</Link>
						</li>
						<li>
							<Link to="/Users">Users</Link>
						</li>
					</ul>
				</nav>
				<Switch>
					<Route path="/about">
						<About />
					</Route>
					<Route path="/Users">
						<Users />
					</Route>
					<Route path="/">
						<Home />
					</Route>
				</Switch>
			</div>
		</Router>
	)
}

const About = () => {
	return <h2>About</h2>
}

const Home = () => {
	return <h2>Home</h2>
}

const Users = () => {
	// 通过 Hook 获取 match
	let match = useRouteMatch()
	let users = ['Alice', 'Bob','Jimmy']
	console.log(match)
	return (
		<div>
			<h2>Users</h2>
			<ul>
				{/*在User上循环输出链接*/}
				{users.map(user => {
					return (
					<li key={user} >
						<Link to={`${match.url}/${user}`}>{user}</Link>
					</li>
				)})}
			</ul>
			<Switch>
			<Route path={`${match.path}/:userId`}>
				<User />
			</Route>
			<Route path={`${match.path}`}>
				<h3>Please select a user</h3>
			</Route>
		</Switch>
		</div>
	)
}

const User = () => {
	// 通过 Hook 获取 路径变量
	let { userId } = useParams();
	let match = useRouteMatch();
	console.log(match)
	return <h3>User name: {userId}</h3>
}

export default AppRouter