import React from 'react';
import { Snackbar, Button, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import MuiAlert, { AlertProps, AlertColor } from '@mui/material/Alert';

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
	props,
	ref
) {
	return <MuiAlert elevation={6} ref={ref} variant='filled' {...props} />;
});

interface Props {
	open: boolean;
	text?: string;
	alertType?: AlertColor;
	closeHandler: () => void;
	actionHandler: () => void;
	exitToastHandler: () => void;
}

const Toast: React.FC<Props> = ({
	open,
	text,
	alertType,
	closeHandler,
	actionHandler,
	exitToastHandler,
}: Props) => (
	<Snackbar
		open={open}
		onClose={closeHandler}
		TransitionProps={{ onExited: exitToastHandler }}
	>
		<Alert
			onClose={closeHandler}
			severity={alertType}
			action={
				<>
					{alertType === 'warning' && (
						<Button color='inherit' size='small' onClick={actionHandler}>
							UNDO
						</Button>
					)}
					<IconButton
						aria-label='close'
						color='inherit'
						size='small'
						onClick={closeHandler}
					>
						<CloseIcon fontSize='inherit' />
					</IconButton>
				</>
			}
		>
			{text}
		</Alert>
	</Snackbar>
);

export default Toast;
