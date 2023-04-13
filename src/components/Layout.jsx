import Main from './Main/Main'
import Projects from './Projects/Projects'
import About from './About Me/AboutMe'
import Footer from './Footer/Footer'





function Layout(props) {
	const currentTheme = props.theme
	return (
		<>
			<Main theme={currentTheme} />
			<Projects />
			<About />
			<Footer />
		</>
	)

}


export default Layout;