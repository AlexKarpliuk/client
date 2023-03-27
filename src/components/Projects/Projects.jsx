import { useInView } from 'react-intersection-observer';
import '../Projects/Projects.css';
import memory from '../../assets/Memory/memoryDop.svg';
import weather from '../../assets/Weather/weatherDop.svg';
import blog from '../../assets/Blog/blogicon.jpg'
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
							<img src={memory} alt="img" />
						</div>
					</Link>
					<Link to='/weather'>
						<div className={inView ? 'card weather activeCard' : 'card weather'}>
							<h2>Weather Widget</h2>
							<img src={weather} alt="img" />
						</div>
					</Link>
					<Link to='/blog'>
						<div className={inView ? 'card player activeCard' : 'card player'}>
							<h2>Blog</h2>
							<img src={blog} alt="img" />
						</div>
					</Link>
				</div>
				<div className='ref' ref={first}></div>
			</div>
		</div>
	)

}


export default Projects;