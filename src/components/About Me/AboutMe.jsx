import React, { useState } from 'react';
import CV from '../../assets/About/CV_AlexKarpliuk.pdf';
import '../About Me/AboutMe.css'
import { skills } from '../../data/dataSkills'
// import aboutLogo from '../../assets/About/aboutLogo.svg'
import Logo from '../../assets/About/logo.jpg'
import QR from '../../assets/About/QR.svg'
import QRarrow from '../../assets/About/QRerrow.svg'
import { FcNext } from "react-icons/fc";
import { FcExpand } from "react-icons/fc";
import { FcCheckmark } from "react-icons/fc";
import { FcDownload } from "react-icons/fc";






function About() {

	const [toggle, setToggle] = useState('Java Script')

	return (
		<section id='about' className='about-container' >
			<div className="about-items">
				<div className="about-title">
					<div className="title-icon">CV</div>
					<div className="title-text">
						<h1>Alex Karpliuk</h1>
						<p>Junior/Trainee Frontend developer</p>
					</div>
				</div>
				<div className="about-content">
					<aside >
						<div className="aside-logo">
							<img src={Logo} alt="logo" />
							{/* <img src={aboutLogo} alt="logo" /> */}
						</div>
						<div className="aside-arrow">
							<img src={QRarrow} alt="qrLogo" />
						</div>
						<div className="aside-qr">
							<img src={QR} alt="qrLogo" />
						</div>
						<div className="aside-downloadCV">
							<a href={CV} download='CV'>
								<div className="cv-arrow">{<FcDownload size={32} />}</div>
							</a>
							<h1 className='dis-title cv'>Download CV</h1>
						</div>
					</aside>
					<div className="about-dis">
						<div className="dis-main">
							<div className="dis-title">About me</div>
							<hr />
							<p>Hey there, I'm Alex, I'm from Ukraine and I'm seeking a challenging role as a Junior/Trainee Front-End Developer where I can apply my skills in JavaScript, React.js and Node.js to contribute to the development of innovative web applications. As a self-motivated and hardworking individual, I am keen to learn and grow in a dynamic and collaborative work environment. I'm well-organized and capable of adapting to working as part of a team. I am a quick learner and develop my skills every day.
							</p>
						</div>
						<div className="dis-skills">
							<div className="dis-title">Skills</div>
							<hr />
							{/* defined the choosed item from the skillsData */}
							{skills.map(({ id, title, p, img }) => {
								return (
									<div key={id} className="skills-list-info">
										<div className="skills-list">
											{/* set the Hover for the choosed item 'li'  */}
											<li className={`skills-items ${toggle === title ? 'active' : 'skills-items'}`} onMouseEnter={() => setToggle(title)}>
												{/* set icon arrow from the react icon */}
												{title} {toggle === title ? <FcExpand /> : <FcNext />}
											</li>
											{/* show the 'p' after MouseEnter effect */}
											<p>{toggle === title ? (p) : null}</p>
										</div>
										<div className="skills-info">
											{/* show the 'img' after MouseEnter effect  */}
											{toggle === title ? (
												<div>{img}</div>
											) : null}
										</div>
									</div>
								)
							})}
						</div>
					</div>
				</div>
			</div>
			<div className="dis-others">
				<div className="dis-title">Others</div>
				<hr />
				<h3>What about my soft skills?</h3>
				<ul>
					<li><FcCheckmark /> Ability to Work in a Team</li>
					<li><FcCheckmark /> Communication Skills</li>
					<li><FcCheckmark /> Fast Learner</li>
					<li><FcCheckmark /> Adaptability</li>
					<li><FcCheckmark /> Self-Discipline skills</li>
				</ul>
			</div>
		</section>
	)

}


export default About;