import '../Blog/Blog.css'
import { Link, Outlet, useLocation } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import { UserContext } from './components/userContext/UserContext';
// import { createBrowserHistory } from 'history';
import Posts from './components/post/Posts';






function Blog() {
	const [posts, setPosts] = useState()
	const { userInfo, setUserInfo } = useContext(UserContext);
	// console.log(setUserInfo)
	
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

	useEffect(() => {
		fetch(process.env.REACT_APP_BASE_URL + '/blog/post').then(response => {
			if (!response.ok) {
				throw new Error('Failed to fetch user information');
			}
			response.json().then(posts => {
				setPosts(posts)

			})
		}).catch(error => {
			console.error(error)
			alert('ERROR "Database is offline"')
		});
	}, []);


	function logout() {
		fetch(process.env.REACT_APP_BASE_URL + '/blog/logout', {
			credentials: 'include',
			method: 'POST'
		});
		setUserInfo(null);
	}
	// function reloadPage() {
	// 	const history = createBrowserHistory();
	// 	const currentPageUrl = window.location.href = '/blog';
	// 	history.replaceState(null, null, currentPageUrl);
	// }



	const username = userInfo?.username;
	const location = useLocation();
	return (
		<div className="wrapper">
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
			{location.pathname === '/blog' && (
				<>
					{posts && posts.map(post => (
						<Posts {...post} key={post._id} />
					))}
				</>
			)}
			<Outlet />
		</div>

	);
}

export default Blog;