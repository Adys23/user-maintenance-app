import { FC, useEffect, useState } from 'react';
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';
import PersonForm from './PersonForm/PersonForm';
import PersonsTable from './PersonsTable/PersonsTable';
import { Route, Switch } from 'react-router-dom';
import CtxProvider, { AlertType } from './context/ToastContext';
import Toast from './components/Toast/Toast';
import { restoreUsers } from './services/http-service';

const App: FC = () => {
	const [toastOpen, setToastOpen] = useState<boolean>(false);
	const [alert, setAlert] = useState<AlertType | undefined>({
		color: 'warning',
		text: 'Users have been deleted!',
	});
	const [deletedUserIds, setDeletedUserIds] = useState<string[]>([]);
	const [usersRestored, setUsersRestored] = useState<boolean>(false);

	const [snackPack, setSnackPack] = useState<readonly AlertType[]>([]);

	useEffect((): void => {
		if (snackPack.length && !alert) {
			// Set a new snack when we don't have an active one
			setAlert({ ...snackPack[0] });
			setSnackPack((prev) => prev.slice(1));
			setToastOpen(true);
		} else if (snackPack.length && alert && toastOpen) {
			// Close an active snack when a new one is added
			setToastOpen(false);
		}
	}, [snackPack, alert, toastOpen]);

	const restoreUsersHandler = (): void => {
		restoreUsers(deletedUserIds)
			.then(() => {
				setAlert({ color: 'success', text: 'User restored' });
				setToastOpen(true);
				setUsersRestored(true);
			})
			.catch((e) => console.error(e));
	};

	const openToast = (alert: AlertType): void => {
		setToastOpen(true);
		setAlert(alert);
		setSnackPack((prev) => [...prev, alert]);
	};

	const handleExited = (): void => {
		setAlert(undefined);
	};

	return (
		<>
			<CtxProvider
				openToast={openToast}
				setDeletedUserIds={setDeletedUserIds}
				setUsersRestored={setUsersRestored as (restored: boolean) => void}
				usersRestored={usersRestored}
			>
				<Navbar />
				<Switch>
					<Route path={'/'} exact component={PersonsTable} />
					<Route path={'/user/:userId'} component={PersonForm} />
				</Switch>
				<Footer />
				<Toast
					open={toastOpen}
					closeHandler={() => setToastOpen(false)}
					actionHandler={restoreUsersHandler}
					handleExited={handleExited}
					alertType={alert?.color}
					text={alert?.text}
				/>
			</CtxProvider>
		</>
	);
};

export default App;
