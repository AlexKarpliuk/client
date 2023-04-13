import './Nav.css';
import { Link, Outlet, useLocation } from 'react-router-dom'
// import US from '../images/US.svg'
import logo from '../../assets/logo.jpg'
import { MdMenu } from "react-icons/md";
import { MdLightMode } from "react-icons/md";
import { MdNightlight } from "react-icons/md";
import { useState } from 'react';
import { links, handleClick} from '../../data/dataLinks'



function Nav(props) {
	// Burger btn & icons switcher
	const toggle = props.switchTheme;
	const currentTheme = props.theme;

	const [open, setOpen] = useState(false);


	const location = useLocation();
	return (
		<>
			<nav className="nav-container">
				<div className="nav-content">
					<Link to='/'>
						<div className="content-logo-name" >
							<img src={logo} alt="logo" />
							<h3>Alex Karpliuk</h3>
						</div>
					</Link>
					<div className="burger-btn" onClick={() => { setOpen(!open) }}>
						<MdMenu size={32} />
					</div>
					<div className={`content-menu ${open ? 'active' : 'content-menu'}`}>
						<ul className='content-ul'>
							<div className="modes-btn" onClick={toggle}>
								{currentTheme === 'dark' ? <MdNightlight /> : <MdLightMode />}
							</div>
							{location.pathname === '/' &&(
							<div className='content-links'>
								{links.map((link) => {
									return (
										<a href={link.url} key={link.id} onClick={handleClick}>{link.text}</a>
									)
								})}
							</div>
							)}
						</ul>
					</div>
				</div >
			</nav>
			<div className="wrapper-glob">
				<Outlet />
			</div>
		</>
	)

}


export default Nav;