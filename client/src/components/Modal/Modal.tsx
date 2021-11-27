import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { ReactNode } from 'react';
import { Link } from 'react-router-dom';

interface Props {
	open: boolean;
	onConfirm: () => void;
	onCancel: () => void;
	title: string;
	text: string;
	navigateTo?: string;
}

const Modal: React.FC<Props> = ({
	open,
	onConfirm,
	onCancel,
	title,
	text,
	navigateTo,
}: Props) => {
	const linkProps: { component?: ReactNode; to?: string } = navigateTo
		? { component: Link, to: navigateTo }
		: {};
	return (
		<Dialog
			open={open}
			onClose={onCancel}
			aria-labelledby='alert-dialog-title'
			aria-describedby='alert-dialog-description'
		>
			<DialogTitle id='alert-dialog-title'>{title}</DialogTitle>
			<DialogContent>
				<DialogContentText id='alert-dialog-description'>
					{text}
				</DialogContentText>
			</DialogContent>
			<DialogActions>
				<Button onClick={onCancel}>Cancel</Button>
				<Button onClick={onConfirm} autoFocus {...linkProps}>
					Confirm
				</Button>
			</DialogActions>
		</Dialog>
	);
};

export default Modal;
