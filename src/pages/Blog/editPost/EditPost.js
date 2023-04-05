import { useState, useEffect } from 'react';
import ReactQuill from 'react-quill';
import { useParams, Navigate} from 'react-router';
import '../editPost/editPost.css'
import 'react-quill/dist/quill.snow.css'
import { Link } from 'react-router-dom';




const modules = {
	toolbar: [
		['bold', 'italic', 'underline', 'strike'],
		[{ 'list': 'ordered' }, { 'list': 'bullet' }],
		[{ 'direction': 'rtl' }],                         // text direction
		[{ 'header': [1, 2, false] }],
		[{background: []}],
		[{ 'color': [] }],
		[{ 'font': [] }],
		[{ 'align': [] }],

		['clean'],
		['link', 'image']
	]
};


export default function EditPost() {

	const [title, setTitle] = useState();
	const [summary, setSummary] = useState();
	const [content, setContent] = useState();
	const [files, setFiles] = useState();
	const [redirect, setRedirect] = useState(false)
	const [redirectHome, setRedirectHome] = useState(false)
	const { id } = useParams();


	useEffect(() => {
		fetch(`${process.env.REACT_APP_BASE_URL}/post/${id}`)
			.then(response => {
				response.json().then(postInfo => {
					setTitle(postInfo.title);
					setSummary(postInfo.summary);
					setContent(postInfo.content);
				})
			});
	}, [id])

	async function updatePost(e) {
		e.preventDefault();
		const data = new FormData();
		data.set('title', title);
		data.set('summary', summary);
		data.set('content', content);
		data.set('id', id);
		if (files?.[0]) {
			data.set('file', files?.[0]);
		}
		const response = await fetch(process.env.REACT_APP_BASE_URL+'/blog/update/'+id, {
			method: 'PUT',
			body: data,
			credentials: 'include',
		});
		if (response.ok) {
			setRedirect(true);
		}
	};

	async function deletePost(e) {
		e.preventDefault();
		const data = new FormData();
		data.set('id', id);
		const response = await fetch(`${process.env.REACT_APP_BASE_URL}/blog/delete/${id}`, {
			method: 'DELETE',
			body: data,
			credentials: 'include',
		});
		if (response.ok) {
			setRedirectHome(true);
		}
	}


	if (redirectHome) {
		return <Navigate to={'/blog'} />
	};
	if (redirect) {
		return <Navigate to={`/blog/post/${id}`} />
		// window.location.href = '/blog/post/' + id
	};


	return (
		<form className='blog-container' onSubmit={updatePost}>
			<input className='inputs dop'
				type="title"
				placeholder={'Title'}
				value={title}
				onChange={e => {
					setTitle(e.target.value);
				}} />

			<input className='inputs dop'
				type="summary"
				placeholder={'Summary'}
				value={summary}
				onChange={e => {
					setSummary(e.target.value);
				}} />

			<input className='inputs dop'
				type="file"
				onChange={e => {
					setFiles(e.target.files)
				}} />

			<ReactQuill className='inputs dop'
				modules={modules}
				value={content} onChange={newValue => {
					setContent(newValue)
				}} />
			<button className='update-btn'><h1>Update post</h1></button>
			<Link to='/blog' onClick={deletePost}>
				<div className="edit-btn">
					<h1>Delete</h1>
				</div>
			</Link>
		</form>
	)
}