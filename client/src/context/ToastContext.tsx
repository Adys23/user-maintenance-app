import React, { createContext, ReactNode } from 'react';
import { AlertColor } from '@mui/material';

interface ToastContextType {
	openToast: (alert: AlertType, deletedUserIds?: string[]) => void;
	usersRestored: boolean;
	setUsersRestored: (restored: boolean) => void
}

export interface AlertType {
	color: AlertColor;
	text: string;
}

interface Props {
	openToast: (alert: AlertType) => void;
	setUsersRestored: (restored: boolean) => void;
	usersRestored: boolean;
	setDeletedUserIds: (indicies: string[]) => void;
	children?: ReactNode;
}

const noop = () => {};

export const ToastContext = createContext<ToastContextType>({
	openToast: noop,
	setUsersRestored: noop,
	usersRestored: false
});

const CtxProvider: React.FC<Props> = ({openToast, setDeletedUserIds, setUsersRestored, usersRestored, children}: Props) => {

	const handleToastOpen = (alert: AlertType, deletedUserIds?: string[]): void => {
		openToast(alert);
		if (deletedUserIds) {
			setDeletedUserIds(deletedUserIds)		
		}
	};

	return (
		<ToastContext.Provider
			value={{
				openToast: handleToastOpen,
				setUsersRestored,
				usersRestored

			}}
		>
			{children}
		</ToastContext.Provider>
	);
};

export default CtxProvider;
