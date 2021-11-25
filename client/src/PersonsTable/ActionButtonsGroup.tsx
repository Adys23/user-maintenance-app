import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import DeleteIcon from '@mui/icons-material/Delete';
import Info from '@mui/icons-material/Info';
import { Link } from 'react-router-dom';

interface Props {
	userId: string;
	deleteUser: (userId: string) => void;
}

const ActionButtonsGroup: React.FC<any> = ({ userId, deleteUser }: Props) => {
	const deleteUserHandler = (): void => {
		deleteUser(userId);
	};

	return (
		<ButtonGroup variant='contained' aria-label='outlined primary button group'>
			<Button
				startIcon={<Info />}
				component={Link}
				to={{ pathname: `/user/${userId}`, state: { userId: userId } }}
			>
				Details
			</Button>

			<Button startIcon={<DeleteIcon />} onClick={deleteUserHandler}>
				Delete
			</Button>
		</ButtonGroup>
	);
};

export default ActionButtonsGroup;
