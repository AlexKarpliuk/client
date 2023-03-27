import '../../components/Footer/Footer.css'
import { handleClick } from '../../data/dataLinks'
import { useState } from 'react';
import { send } from 'emailjs-com';
import { MdMail } from 'react-icons/md';
import { MdPhoneIphone } from 'react-icons/md';
import { GiPositionMarker } from 'react-icons/gi';
import { TiSocialLinkedin } from 'react-icons/ti';
import { FiCodepen } from 'react-icons/fi';
import { BsGithub } from 'react-icons/bs';
// import { FiInstagram } from 'react-icons/fi';


function Footer() {

	const [toSend, setToSend] = useState({
		message: '',
		reply_to: '',
		from_name: '',
	});
	// console.log(toSend.message)

const onSubmit = (e) => {
		e.preventDefault();

		send(
			'service_qz4x32j',
			'template_c0zw6hh',
			toSend,
			'BrRgh9CSem4r2jQNx'
		)
			.then((response) => {
				alert('SUCCESS!');
				console.log('SUCCESS!', response.status, response.text);
			})
			.catch((err) => {
				alert('Faild...');
				console.log('FAILED...', err);
			});
	};

	const handleChange = (e) => {
		setToSend({ ...toSend, [e.target.name]: e.target.value });
	};
	// console.log(toSend)

	return (
		<footer id='contacts'>
			<div className="contacts-container">
				<div className="contacts-title">
					<h1>Contacts</h1>
					<div className="contacts-icons">
						<a href="https://www.linkedin.com/in/alex-karpliuk-8592971b9/">
							<div className="icon"><TiSocialLinkedin size={36} /></div>
						</a>
						<a href="https://codepen.io/alexkarpliuk">
							<div className="icon"><FiCodepen size={36} /></div>
						</a>
						<a href="https://github.com/AlexKarpliuk/Portfolio.git">
							<div className="icon"><BsGithub size={36} /></div>
						</a>
						{/* <div className="icon"><FiInstagram size={36} /></div> */}
					</div>
				</div>
				<div className="contacts-info-wrapper">
					<div className="contacts-info">
						<div className="contacts-items">
							<MdMail size={32} />
							<h3>karpliuksasha@gmail.com</h3>
						</div>
						<div className="contacts-items">
							<MdPhoneIphone size={32} />
							<h3>+38 093 517 24 56</h3>
						</div>
						<div className="contacts-items">
							<GiPositionMarker size={32} />
							<h3>Zhytomyr, Ukraine</h3>
						</div>
					</div>
					<form onSubmit={onSubmit}>
						<input
							className='inputs'
							type='text'
							name='from_name'
							placeholder='Your name'
							value={toSend.from_name}
							onChange={handleChange}
						/>
						<input
							className='inputs'
							type='text'
							name='reply_to'
							placeholder='Your email'
							value={toSend.reply_to}
							onChange={handleChange}
						/>
						<textarea
							className='input-message inputs'
							type='text'
							name='message'
							placeholder='Your message'
							innerHTML={toSend.message}
							onChange={handleChange}
						/>
						<div className='submit-btn'>
							<button type='submit'>Submit</button>
							<div className="up-btn" >
								<a href='#up' onClick={handleClick}>UP</a>
							</div>
						</div>
					</form>
				</div>
			</div>
		</footer>
	)

}


export default Footer;