import { useEffect, useContext } from "react";
import { Link } from 'react-router-dom';
import { UserContext } from '../userContext/UserContext';



export default function Header() {
	const { userInfo, setUserInfo } = useContext(UserContext);

	useEffect(() => {
		fetch(process.env.REACT_APP_BASE_URL + '/blog/profile', {
			headers: {
				'Content-Type': 'application/json'
			},
			credentials: 'include',
		}).then(response => {
			if (!response.ok) {
				return;
			}
			response.json().then(userInfo => {
				setUserInfo(userInfo);
			})
		}).catch(error => {
			console.error(error)
		});
	}, [setUserInfo]);

	function logout() {
		fetch(process.env.REACT_APP_BASE_URL + '/blog/logout', {
			credentials: 'include',
			method: 'POST'
		});
		setUserInfo(null);
	}


	const username = userInfo?.username;
	return (
		<nav className='blog-nav-wrapper'>
			<div className="blog-nav">
				<div className="nav-home">
					{/* <h1 onClick={reloadPage}>{username ? `Welcome, ${username}` : 'Blog'}</h1> */}
					<Link to='/blog'><h1>{username ? `Welcome, ${username}` : 'Blog'}</h1></Link>
				</div>
				<div className="nav-links">
					{username && (
						<>
							<Link to='/blog/create'>Create new post</Link>
							<Link to='/blog' onClick={logout}>Logout</Link>
						</>
					)}
					{!username && (
						<>
							<Link to='/blog/login'>Login</Link>
							<Link to='/blog/register'>Register</Link>
						</>
					)}
				</div>
			</div>
		</nav>
	);
}