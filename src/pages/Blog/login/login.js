import '../login/login.css'
import React, { useState, useContext } from 'react';
import { Navigate } from 'react-router';
import { UserContext } from '../components/userContext/UserContext';






export default function LoginForm() {

	const [username, setUsername] = useState()
	const [password, setPassword] = useState()
	const [redirect, setRedirect] = useState(false)
	const { setUserInfo } = useContext(UserContext)


	async function login(e) {
		e.preventDefault();
		const response = await fetch(process.env.REACT_APP_BASE_URL+'/blog/login', {
			method: 'POST',
			body: JSON.stringify({ username, password }),
			headers: { 'Content-Type': 'application/json' },
			methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
			allowedHeaders: ['Origin', 'X-Requested-With', 'Content-Type', 'Accept'],
			credentials: 'include',
		});
		if (response.ok) {
			response.json().then(userInfo => {
				setUserInfo(userInfo);
				setRedirect(true)
			})
		} else {
			alert('user not found')
		}
	}

	if (redirect) {
		return <Navigate to={'/blog'} />
	}

	return (
		<div className="blog-container">
			<form className='plus-login' action="" onSubmit={login}>
				<input className='inputs plus'
					type="text"
					placeholder='name' 
					onChange={(event) => {
						setUsername(event.target.value);
					}}
					/>
				<input className='inputs plus'
					type="password"
					placeholder='password' 
					onChange={(event) => {
						setPassword(event.target.value);
					}}
					/>
				<button className='update-btn' >Login</button>
			</form>
		</div>
	)
}