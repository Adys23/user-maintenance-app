import React from 'react';
import { Link } from 'react-router-dom';
import { Stack, Button } from '@mui/material';
import classes from './FormControls.module.css';

interface Props {
	isValid: () => boolean;
	updateUserHandler: () => void;
	cancelChangesHandler: () => void;
	toggleModal: () => void;
}

const FormControls: React.FC<Props> = (props: Props) => {
	return (
		<Stack spacing={1} direction='row' className={classes.buttonsContainer}>
			<Button
				disabled={!props.isValid()}
				variant='contained'
				color='success'
				onClick={props.updateUserHandler}
				component={Link}
				to={'/'}
			>
				Save changes
			</Button>
			<Button variant='contained' color='error' onClick={props.toggleModal}>
				Delete user
			</Button>
			<Button variant='contained' onClick={props.cancelChangesHandler}>
				Cancel changes
			</Button>
			<Button variant='outlined' component={Link} to={'/'}>
				Back to list
			</Button>
		</Stack>
	);
};

export default FormControls;
