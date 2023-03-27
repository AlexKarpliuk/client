import  {ImHtmlFive2}  from "react-icons/im"
import  {FaNodeJs}  from "react-icons/fa"
import  {IoLogoJavascript}  from "react-icons/io"
import  {FaReact}  from "react-icons/fa"
import  {GiBrain}  from "react-icons/gi"


export const skills = [
	{
		id:1,
		title:'HTML/CSS',
		p:'HTML, BEM, SASS, Flex, Grid, Cross browser, Bootstrap, Tailwind...',
		img: <ImHtmlFive2 size={100}/>,
	},
	// {
	// 	id:2,
	// 	title:'CSS',
	// 	p:'SASS, Bootstrap, Tailwind, Flex, Grid, Cross browser...',
	// 	img: <TbBrandCss3 size={120}/>
	// },
	{
		id:3,
		title:'Java Script',
		p:'Arrays, Objects, Arrow functions, Loops, Map, Promises...',
		img: <IoLogoJavascript size={100}/>
	},
	{
		id:4,
		title:'React.js',
		p:'Props, States, Hooks, SPA, API, Router...',
		img: <FaReact size={100}/>
	},
	{
		id:5,
		title:'Node.js',
		p:'Node.JS(post, get, put, delete), Express...',
		img: <FaNodeJs size={100}/>
	},
	{
		id:6,
		title:'Also',
		p:' MongoDB, Git, npm, yarn, gsap...',
		img: <GiBrain size={100}/>
	}
]