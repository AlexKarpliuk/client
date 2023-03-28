import { useState } from 'react';
import ReactQuill from 'react-quill';
// import { Navigate } from 'react-router';
import 'react-quill/dist/quill.snow.css'


const modules = {
	toolbar: [
		['bold', 'italic', 'underline', 'strike'],
		[{ 'list': 'ordered' }, { 'list': 'bullet' }],
		[{ 'direction': 'rtl' }],                         // text direction
		[{ 'header': [1, 2, false] }],
		[{ background: [] }],
		[{ 'color': [] }],
		[{ 'font': [] }],
		[{ 'align': [] }],
		['link', 'image'],
		['clean']
	]
};



export default function CreatePost() {

	const [title, setTitle] = useState();
	const [summary, setSummary] = useState();
	const [content, setContent] = useState();
	const [files, setFiles] = useState();
	const [redirect, setRedirect] = useState(false)
	async function createNewPost(e) {
		e.preventDefault();

		const data = new FormData();
		data.set('title', title);
		data.set('summary', summary);
		data.set('content', content);
		if (files?.[0]) {
			data.set('file', files?.[0]);
		}

		const response = await fetch('https://server-portfolioalex.vercel.app/blog/post', {
			method: 'POST',
			body: data,
			credentials: 'include',
		});
		if (response.ok) {
			setRedirect(true);
		} else if (response.status === 304) {
			alert('No image provided')
		}
	};

	if (redirect) {
		window.location.href = '/blog';
	}

	return (
		<form className='blog-container' onSubmit={createNewPost}>
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
				value={content}
				onChange={value => {
					setContent(value)
				}} />
			<button className='update-btn'><h1>Create post</h1></button>
		</form>
	)

}