import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import DeleteIcon from '@mui/icons-material/Delete';
import Info from '@mui/icons-material/Info';
import { Link } from 'react-router-dom';

interface Props {
	userId: string;
	deleteUser: (userIds: string[]) => void;
}

const ActionButtonsGroup: React.FC<Props> = ({ userId, deleteUser }: Props) => {
	const deleteUserHandler = (): void => {
		deleteUser([userId]);
	};

	return (
		<ButtonGroup variant='outlined' aria-label='outlined primary button group'>
			<Button
				startIcon={<Info />}
				component={Link}
				to={{ pathname: `/user/${userId}`, state: { userId: userId } }}
			>
				Details
			</Button>

			<Button
				startIcon={<DeleteIcon />}
				onClick={deleteUserHandler}
				variant='outlined'
				color='error'
			>
				Delete
			</Button>
		</ButtonGroup>
	);
};

export default ActionButtonsGroup;
