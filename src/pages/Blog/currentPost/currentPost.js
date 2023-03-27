import { useParams } from "react-router";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../components/userContext/UserContext";
import { Link } from "react-router-dom";
import '../currentPost/currentPost.css';
import moment from "moment";





export default function CurrentPost() {
	const [postInfo, setPostInfo] = useState();
	const { userInfo } = useContext(UserContext)
	const { id } = useParams();
	// console.log(postInfo)
	useEffect(() => {
		fetch(`http://localhost:5000/post/${id}`).then(response => {
			response.json().then(info => {
				setPostInfo(info);
			})
		});
	}, [id])


	if (!postInfo) return '';
	return (
		<div className="blog-container">
			<div className="blog-info">
				<h1>{postInfo.title}</h1>
				<div className="author-time">
					<time>
						{moment(postInfo.createdAt).format('LLL')}
					</time>
					<p>
						by {postInfo.author.username}
					</p>
				</div>
				<div className="image-post">
					<img src={`http://localhost:5000/${postInfo.cover}`} alt="img" />
				</div>
				<div className="summary-content" dangerouslySetInnerHTML={{ __html: postInfo.content }} />
			</div>
			{userInfo.id === postInfo.author._id && (
				<div className="edit-btn">
					<Link to={`/blog/edit/${postInfo._id}`}>
						<h1>
							EDIT
						</h1>
					</Link>
				</div>
			)}
		</div>
	);
}
