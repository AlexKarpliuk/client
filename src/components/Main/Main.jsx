import '../Main/Main.css';
import illustration from '../../assets/Home/main-icon.svg'
import darkIllustration from '../../assets/Home/main-icon-dark.svg'
import { handleClick } from '../../data/dataLinks'




function Main(props) {
	const illustrationTheme = props.currentTheme;
	// console.log(illustrationTheme)


	return (
		<div id='up' className='main-container'>
			<div className="main-content">
				<div className="main-info">
					<div>
						<h1>Junior/<span>Trainee</span> Frontend developer</h1>
					</div>
					<p>Hello! Welcome to my page. My name is Alex and I’m a junior/Trainee FrontEnd developer and I’m open for job offers and collaboration. </p>
					<div className ='contacts' >
						<a href='#contacts' onClick={handleClick}>Contact</a>
					</div>
				</div>
				<div className="main-illustration">
					<img src={`${illustrationTheme === 'dark' ? darkIllustration : illustration}`} alt="img" />
				</div>
			</div>
		</div>
	)

}


export default Main;