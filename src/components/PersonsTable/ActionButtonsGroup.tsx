import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import DeleteIcon from '@mui/icons-material/Delete';
import Info from '@mui/icons-material/Info';

const ActionButtonsGroup = () => {
	return (
		<ButtonGroup variant='contained' aria-label='outlined primary button group'>
			<Button startIcon={<Info />}>Details</Button>
			<Button startIcon={<DeleteIcon />}>Delete</Button>
		</ButtonGroup>
	);
};

export default ActionButtonsGroup;
