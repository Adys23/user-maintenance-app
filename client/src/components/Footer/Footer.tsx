import classes from './Footer.module.css';

const Footer: React.FC = () => (
	<div className={classes.footer}>
		<p>
			Favicon made by{' '}
			<a href='https://www.freepik.com' title='Freepik'>
				Freepik
			</a>{' '}
			from{' '}
			<a href='https://www.flaticon.com/' title='Flaticon'>
				www.flaticon.com
			</a>
		</p>
	</div>
);

export default Footer;
