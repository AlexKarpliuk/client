export const links = [
	{
		id:2,
		text: 'My projects',
		url:'#projects'
	},
	{
		id:3,
		text: 'About me',
		url:'#about'
	}
];

	//  links to Home, Abut me.....
	export const handleClick = (e) =>{
		e.preventDefault()
		const target = e.target.getAttribute('href')
		const location = document.querySelector(target).offsetTop
		window.scrollTo({
			top: location - 80
		})
	}