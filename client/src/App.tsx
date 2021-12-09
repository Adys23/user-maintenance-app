import { FC, useContext } from 'react';
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';
import PersonForm from './PersonForm/PersonForm';
import PersonsTable from './PersonsTable/PersonsTable';
import { Route, Switch } from 'react-router-dom';
import Toast from './components/Toast/Toast';
import { ToastContext } from './context/ToastContext';

const App: FC = () => {
	const toastContext = useContext(ToastContext);

	return (
		<>
			<Navbar />
			<Switch>
				<Route path={'/'} exact component={PersonsTable} />
				<Route path={'/user/:userId'} component={PersonForm} />
			</Switch>
			<Footer />
			<Toast
				open={toastContext.toastOpen}
				closeHandler={toastContext.closeToastHandler}
				actionHandler={toastContext.restoreUsersHandler}
				exitToastHandler={toastContext.exitToastHandler}
				alertType={toastContext.alert?.color}
				text={toastContext.alert?.text}
			/>
		</>
	);
};

export default App;
