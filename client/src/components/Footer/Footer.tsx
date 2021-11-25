import classes from './Footer.module.css';

const Footer = () => {
	return (
		<div className={classes.footer}>
			Favicon made by{' '}
			<a href='https://www.freepik.com' title='Freepik'>
				Freepik
			</a>{' '}
			from{' '}
			<a href='https://www.flaticon.com/' title='Flaticon'>
				www.flaticon.com
			</a>
		</div>
	);
};

export default Footer;
