import React, { useState } from 'react';
import { Navigate } from 'react-router';





export default function Reg() {
	const [username, setUsername] = useState();
	const [password, setPassword] = useState();
	const [redirect, setRedirect] = useState(false)



	async function register(e) {
		e.preventDefault();
		const response = await fetch(process.env.REACT_APP_BASE_URL+'/blog/register', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ username, password }),
		});
		if (response.status === 200) {
			alert('Success');
			setRedirect(true);
		} else{
			alert('False (try another name)');
		}

	}

	if (redirect) {
		return <Navigate to={'/blog/login'} />
	}

	return (
		<div className="blog-container">
			<form className='plus-login' action="" onSubmit={register}>
				<input className='inputs plus'
					type="text"
					placeholder='username'
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
				<button className='update-btn' >Register</button>
			</form>
		</div>
	)
}