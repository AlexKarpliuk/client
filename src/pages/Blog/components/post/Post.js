import { useEffect, useState } from 'react';
import Posts from './Posts';







export default function Post() {

	const [posts, setPosts] = useState()

	useEffect(() => {
		fetch(process.env.REACT_APP_BASE_URL + '/blog/post').then(response => {
			if (!response.ok) {
				console.log('Failed to fetch user information');
				return;
			}
			response.json().then(posts => {
				setPosts(posts)

			})
		}).catch(error => {
			console.error(error)
			alert('ERROR "Database is offline"')
		});
	}, []);



	return (
		<>
			{posts && posts.map(post => (
				<Posts {...post} key={post._id} />
			))}
		</>
	);
}