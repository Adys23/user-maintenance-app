import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';

const ActionButtonsGroup = () => {
	return (
		<ButtonGroup variant='contained' aria-label='outlined primary button group'>
			<Button>Details</Button>
			<Button>Delete</Button>
		</ButtonGroup>
	);
};

export default ActionButtonsGroup;
