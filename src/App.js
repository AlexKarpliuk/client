import './App.css';
import Nav from './components/Nav Bar/Nav'
import Layout from './components/Layout';
import Memory from './pages/Memory/Memory';
import Weather from './pages/Weather/Weather';
import Blog from './pages/Blog/Blog';
import Login from './pages/Blog/login/login'
import Reg from './pages/Blog/register/reg'
import CreatePost from './pages/Blog/createPost/createPost'
import CurrentPost from './pages/Blog/currentPost/currentPost'
import EditPost from './pages/Blog/editPost/EditPost'
import useLocalStorage from 'use-local-storage'
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom'
import { UserContextProvider } from './pages/Blog/components/userContext/UserContext';



function App() {


	const defaultLight = window.matchMedia('(prefers-color-scheme: dark)').matches;
	const [theme, setTheme] = useLocalStorage('theme', defaultLight ? 'dark' : 'light');

	const switchTheme = () => {
		const newTheme = theme === 'dark' ? 'light' : 'dark'
		setTheme(newTheme)
	}
	

	const router = createBrowserRouter(
		createRoutesFromElements(
			<Route path='/' element={<Nav switchTheme={switchTheme} theme={theme} />}>
				<Route index element={<Layout themes={theme} />} />
				<Route path='memory' element={<Memory />} />
				<Route path='weather' element={<Weather />} />
				<Route path='blog' element={<Blog />}>
					<Route path='login' element={<Login />} />
					<Route path='register' element={<Reg />} />
					<Route path='create' element={<CreatePost />} />
					<Route path='post/:id' element={<CurrentPost />} />
					<Route path='edit/:id' element={<EditPost />} />
				</Route>
			</Route>
		)
	)

	return (
		<UserContextProvider>
			<div id='home' className='container' data-theme={theme} >
				<RouterProvider router={router} />
			</div >
		</UserContextProvider>
	);




}


export default App;
