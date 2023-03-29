import '../Blog/Blog.css'
import { Link, Outlet, useLocation } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import { UserContext } from './components/userContext/UserContext';
import Posts from './components/post/Posts';






function Blog() {
	const { userInfo, setUserInfo } = useContext(UserContext);
	const [posts, setPosts] = useState()


	useEffect(() => {
		fetch('http://server-portfolioalex.vercel.app/blog/profile', {
			credentials: 'include'
		}).then(response => {
			if (!response.ok) {
				throw new Error('Failed to fetch user information');
			 }
			response.json().then(userInfo => {
				setUserInfo(userInfo);
			})
		}).catch(error =>{
			console.error(error)
		});

		fetch('http://server-portfolioalex.vercel.app/blog/post').then(response => {
			if (!response.ok) {
				throw new Error('Failed to fetch user information');
			 }
			response.json().then(posts => {
				setPosts(posts)
			})
		}).catch(error =>{
			console.error(error)
			alert('ERROR "Database is offline"')
		});

	}, [setUserInfo]);


	function logout() {
		fetch('http://server-portfolioalex.vercel.app/blog/logout', {
			credentials: 'include',
			method: 'POST'
		});
		setUserInfo();
	}



	const username = userInfo?.username;
	const location = useLocation();
	return (
		<div className="wrapper">
			<nav className='blog-nav-wrapper'>
				<div className="blog-nav">
					<div className="nav-home">
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