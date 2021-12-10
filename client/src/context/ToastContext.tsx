import React, {
	Context,
	createContext,
	Dispatch,
	ReactNode,
	SetStateAction,
	useEffect,
	useState,
} from 'react';
import { restoreUsers } from '../services/httpService';
import { AlertColor } from '@mui/material';

export interface ToastContext {
	toastOpen: boolean;
	openToastHandler: (alert: AlertType, deletedIds?: string[]) => void;
	exitToastHandler: () => void;
	restoreUsersHandler: () => void;
	closeToastHandler: () => void;
	alert: AlertType | undefined;
	usersRestored: boolean;
	setUsersRestored: Dispatch<SetStateAction<boolean>>;
}

export interface AlertType {
	color: AlertColor;
	text: string;
}

const noop = (): void => {};

export const toastContext: Context<ToastContext> = createContext<ToastContext>({
	toastOpen: false,
	openToastHandler: noop,
	exitToastHandler: noop,
	restoreUsersHandler: noop,
	closeToastHandler: noop,
	alert: { color: 'warning', text: 'Users have been deleted!' },
	usersRestored: false,
	setUsersRestored: noop,
});

const ContextProvider: React.FC = (props: {children?: ReactNode}) => {
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
			setAlert({ ...snackPack[0] });
			setSnackPack((prev) => prev.slice(1));
			setToastOpen(true);
		} else if (snackPack.length && alert && toastOpen) {
			setToastOpen(false);
		}
	}, [snackPack, alert, toastOpen]);

	useEffect((): void => {
		toastOpen &&
			setTimeout(():void => {
				setToastOpen(false);
			}, 5000);
	});

	const restoreUsersHandler = (): void => {
		restoreUsers(deletedUserIds)
			.then(():void => {
				setAlert({ color: 'success', text: 'User restored' });
				setToastOpen(true);
				setUsersRestored(true);
			})
			.catch((e):void => console.error(e));
	};

	const openToast = (alert: AlertType): void => {
		setToastOpen(true);
		setAlert(alert);
		setSnackPack((prev) => [...prev, alert]);
	};

	const exitToastHandler = (): void => {
		setAlert(undefined);
	};

	const openToastHandler = (alert: AlertType, deletedIds?: string[]): void => {
		openToast(alert);
		if (deletedIds) {
			setDeletedUserIds(deletedIds);
		}
	};

	const closeToastHandler = (): void => {
		setToastOpen(false);
	};

	return (
		<toastContext.Provider
			value={{
				toastOpen,
				alert,
				openToastHandler,
				closeToastHandler,
				exitToastHandler,
				restoreUsersHandler,
				usersRestored,
				setUsersRestored,
			}}
		>
			{props.children}
		</toastContext.Provider>
	);
};

export default ContextProvider;
