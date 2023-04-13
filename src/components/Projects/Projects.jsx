import { useInView } from 'react-intersection-observer';
import '../Projects/Projects.css';
import star from '../../assets/Memory/Star.svg';
import rectangle from '../../assets/Memory/Rectangle.svg';
import polygon from '../../assets/Memory/Polygon.svg';
import ellipse from '../../assets/Memory/Ellipse.svg';
import weather from '../../assets/Weather/weatherDop.svg';
import blog from '../../assets/Blog/blogDop.svg'
// import player from '../../assets/Blog/';
import { Link } from 'react-router-dom'





function Projects() {

	const { ref: first, inView } = useInView();

	return (
		<div id='projects' className="proj-container">
			<div className="proj-content" >
				<div className="proj-title">
					<h2>My projects</h2>
				</div>
				<div className="projects-cards">
					<Link to='/memory'>
						<div className={inView ? 'card memory activeCard' : 'card memory'}>
							<h2>Memory Game</h2>
							<div className="card-i-container">
								<div className="m-container"><img src={rectangle} alt="img" /></div>
								<div className="m-container"><img src={star} alt="img" /></div>
								<div className="m-container"><img src={ellipse} alt="img" /></div>
								<div className="m-container"><img src={polygon} alt="img" /></div>
							</div>

						</div>
					</Link>
					<Link to='/weather'>
						<div className={inView ? 'card weather activeCard' : 'card weather'}>
							<h2>Weather Widget</h2>
							<div className="card-i-container">
								<div className="w-container"><img src={weather} alt="img"/></div>
							</div>

						</div>
					</Link>
					<Link to='/blog'>
						<div className={inView ? 'card player activeCard' : 'card player'}>
							<h2>Blog</h2>
							<div className="card-i-container">
								<div className="w-container"><img src={blog} alt="img" /></div>
							</div>
						</div>
					</Link>
				</div>
				<div className='ref' ref={first}></div>
			</div>
		</div>
	)

}


export default Projects;