import { useContext } from 'react';
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';
import PersonForm from './PersonForm/PersonForm';
import PersonsTable from './PersonsTable/PersonsTable';
import { Route, Switch } from 'react-router-dom';
import CtxProvider, { ToastContext } from './context/ToastContext';
import Toast from './components/Toast/Toast';

function App() {
	const toastCtx = useContext(ToastContext);
	return (
		<>
			<CtxProvider>
				<Navbar />
				<Switch>
					<Route path={'/'} exact component={PersonsTable} />
					<Route path={'/user/:userId'} component={PersonForm} />
				</Switch>
				<Footer />
				<Toast
					open={toastCtx.toastOpen}
					closeHandler={toastCtx.toggleToast}
					actionHandler={toastCtx.restoreUserHandler}
					alertType={toastCtx.alert.alertType}
					text={toastCtx.alert.alertText}
				/>
			</CtxProvider>
		</>
	);
}

export default App;
