import { Button, Stack } from '@mui/material';
import classes from './Navbar.module.css';

const Navbar = () => {
	return (
		<nav className={classes.navbar}>
			<div className={classes.logo}>
				<img src='/android-chrome-192x192.png' alt='App Logo' />
				<h1>User Data Maintenance App</h1>
			</div>
			<Stack spacing={1} direction='row'>
				<Button variant='contained' disabled={false}>
					Bulk delete
				</Button>
				<Button variant='contained' disabled={false}>
					Cancel last changes
				</Button>
			</Stack>
		</nav>
	);
};

export default Navbar;
