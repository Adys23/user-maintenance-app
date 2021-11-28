import classes from './Navbar.module.css';

const Navbar = () => {
	return (
		<nav className={classes.navbar}>
			<div className={classes.logo}>
				<img src='/android-chrome-192x192.png' alt='App Logo' />
				<h1>User Data Maintenance App</h1>
			</div>
		</nav>
	);
};

export default Navbar;
