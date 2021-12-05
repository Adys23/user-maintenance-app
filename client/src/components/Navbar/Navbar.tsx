import { Link } from 'react-router-dom';
import classes from './Navbar.module.css';

const Navbar = () => {
	return (
		<nav className={classes.navbar}>
			<div className={classes.logo}>
				<Link to={'/'}>
					<img src='/android-chrome-192x192.png' alt='App Logo' />
					<h1>User Data Maintenance App</h1>
				</Link>
			</div>
		</nav>
	);
};

export default Navbar;
