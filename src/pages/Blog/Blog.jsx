import '../Blog/Blog.css'
import { Outlet, useLocation } from 'react-router-dom';
import Post from './components/post/Post';
import Header from './components/Header/Header';






function Blog() {
	const location = useLocation();
	return (
		<div className="wrapper">
			<Header />
			{location.pathname === '/blog' && (
				<>
					<Post />
				</>
			)}
			<Outlet />
		</div>

	);
}

export default Blog;