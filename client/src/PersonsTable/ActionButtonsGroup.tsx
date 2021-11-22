import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import DeleteIcon from '@mui/icons-material/Delete';
import Info from '@mui/icons-material/Info';
import { NavLink } from 'react-router-dom';

const ActionButtonsGroup = () => {
	return (
		<ButtonGroup variant='contained' aria-label='outlined primary button group'>
			<Button startIcon={<Info />}>
				<NavLink to={'/person'}>Details</NavLink>
			</Button>
			<Button startIcon={<DeleteIcon />}>Delete</Button>
		</ButtonGroup>
	);
};

export default ActionButtonsGroup;
