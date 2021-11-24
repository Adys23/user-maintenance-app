import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import DeleteIcon from '@mui/icons-material/Delete';
import Info from '@mui/icons-material/Info';
import { Link } from 'react-router-dom';
import { usersActions } from '../store/store';
import { useAppDispatch } from '../hooks/hooks';

const ActionButtonsGroup: React.FC = (props) => {
	const dispatch = useAppDispatch();

	const deleteUserHandler = () => {
		dispatch(usersActions.deleteUser(props));
	};

	return (
		<ButtonGroup variant='contained' aria-label='outlined primary button group'>
			<Link to={'/person'}>
				<Button startIcon={<Info />}>Details</Button>
			</Link>
			<Button startIcon={<DeleteIcon />} onClick={deleteUserHandler}>
				Delete
			</Button>
		</ButtonGroup>
	);
};

export default ActionButtonsGroup;
