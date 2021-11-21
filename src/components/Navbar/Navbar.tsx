import classes from './Navbar.module.css';

const Navbar = () => {
	return (
		<nav className={classes.navbar}>
			<div className={classes.logo}>User Data Maintenance App</div>
			<div>OPTIONS</div>
		</nav>
	);
};

export default Navbar;
