import { FC, useContext } from 'react';
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';
import PersonForm from './PersonForm/PersonForm';
import PersonsTable from './PersonsTable/PersonsTable';
import { Route, Switch } from 'react-router-dom';
import Toast from './components/Toast/Toast';
import { ToastContext, toastContext } from './context/ToastContext';

const App: FC = () => {
	const toastCtx: ToastContext = useContext(toastContext);

	return (
		<>
			<Navbar />
			<Switch>
				<Route path={'/'} exact component={PersonsTable} />
				<Route path={'/user/:userId'} component={PersonForm} />
			</Switch>
			<Footer />
			<Toast
				open={toastCtx.toastOpen}
				closeHandler={toastCtx.closeToastHandler}
				actionHandler={toastCtx.restoreUsersHandler}
				exitToastHandler={toastCtx.exitToastHandler}
				alertType={toastCtx.alert?.color}
				text={toastCtx.alert?.text}
			/>
		</>
	);
};

export default App;
