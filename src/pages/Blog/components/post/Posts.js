import { Link } from "react-router-dom";
import { useContext } from 'react';
import './Posts.css';
import moment from "moment";
import { UserContext } from "../userContext/UserContext";







export default function Posts({ _id, title, content, cover, summary, createdAt, author }) {

	const { userInfo } = useContext(UserContext);

	return (
		<div className="post-wrapper">
			<div className="post" >
				<div className="image">
					<Link to={userInfo ? `post/${_id}` : 'login/'} >
						<img src={'http://localhost:5000/' + cover} alt="img" />
					</Link>
				</div>
				<div className="info">
					<Link to={userInfo ? `post/${_id}` : 'login/'} >
						<h2>{title}</h2>
					</Link>
					<div className="info-user">
						<p>Author: {author.username}</p>
						<time>{moment(createdAt).format('LLL')}</time>
					</div>
					<div className="summary">
						<p>{summary}</p>
					</div>
				</div>
			</div>
		</div>
	)
};