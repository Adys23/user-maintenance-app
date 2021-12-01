import React, { createContext, useState } from 'react';
import { AlertColor } from '@mui/material';
import { restoreUser } from '../services/http-service';

interface ToastContextType {
	toastOpen: boolean;
	alert: { alertType: AlertColor; alertText: string };
	toggleToast: () => void;
	setAlert: React.Dispatch<React.SetStateAction<{alertType: AlertColor, alertText: string}>>;
	restoreUserHandler: () => void;
	setDeletedUserId: React.Dispatch<React.SetStateAction<string>>;
}

export const ToastContext = createContext<ToastContextType>({
	toastOpen: false,
	alert: { alertType: 'warning', alertText: 'Users have been deleted!' },
	toggleToast: () => {},
	setAlert: () => {},
	restoreUserHandler: () => {},
	setDeletedUserId: () => {},
});

const CtxProvider: React.FC = (props) => {
	const [toastOpen, setToastOpen] = useState<boolean>(false);
	const [deletedUserId, setDeletedUserId] = useState<string>('');
	const [alert, setAlert] = useState<{
		alertType: AlertColor;
		alertText: string;
	}>({ alertType: 'warning', alertText: 'Users have been deleted!' });

	const toggleToast = (): void => {
		setToastOpen(!toastOpen);
	};

	const restoreUserHandler = () => {
		restoreUser(deletedUserId);
	};

	return (
		<ToastContext.Provider
			value={{
				toastOpen,
				alert,
				toggleToast,
				setAlert,
				restoreUserHandler,
				setDeletedUserId,
			}}
		>
			{props.children}
		</ToastContext.Provider>
	);
};

export default CtxProvider;
