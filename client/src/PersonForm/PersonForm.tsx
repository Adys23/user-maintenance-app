import React, {
	useEffect,
	useReducer,
	useCallback,
	ChangeEventHandler,
	ChangeEvent,
	SyntheticEvent,
	useState,
	useContext,
} from 'react';
import Modal from '../components/Modal/Modal';
import Toast from '../components/Toast/Toast';
import { ToastContext } from '../context/ToastContext';
import { User, Hobby } from '../types/types';
import {
	Box,
	Button,
	TextField,
	Autocomplete,
	Checkbox,
	Stack,
} from '@mui/material';
import { Link } from 'react-router-dom';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import {
	getSingleUser,
	getHobbiesList,
	deleteSingleUser,
	updateUser,
} from '../services/http-service';
import {
	reducer,
	initialState,
	ActionType,
	SetHobbiesAction,
	UpdateUserAction,
	SetUserAction,
	RestoreUserAction,
} from './personFormReducer';

interface Props {
	location: { state: { userId: string } };
}

const icon = <CheckBoxOutlineBlankIcon fontSize='small' />;
const checkedIcon = <CheckBoxIcon fontSize='small' />;

const PersonForm: React.FC<Props> = ({ location }: Props) => {
	const [state, dispatch] = useReducer(reducer, initialState);
	const [modalOpen, setModalOpen] = useState<boolean>(false);
	const userId = location.state.userId;

	useEffect((): void => {
		getHobbiesList().then((data: Hobby[] | undefined): void => {
			if (data) {
				const action: SetHobbiesAction = { type: ActionType.SET_HOBBIES, data };
				dispatch(action);
			}
		});
	}, []);

	useEffect((): void => {
		getSingleUser(userId).then((data: User | undefined): void => {
			if (data) {
				const action: SetUserAction = {
					type: ActionType.INITIALIZE_USER,
					data,
				};
				dispatch(action);
			}
		});
	}, [userId]);

	const toastCtx = useContext(ToastContext);

	const onInputValueChange =
		(key: keyof User): ChangeEventHandler<HTMLInputElement> =>
		(event: ChangeEvent<HTMLInputElement>): void => {
			const action: UpdateUserAction = {
				type: ActionType.UPDATE_USER,
				key,
				value: event.target.value,
			};
			dispatch(action);
		};

	const onSelectValueChange =
		(key: keyof User) =>
		(event: SyntheticEvent, value: Hobby[]): void => {
			const action: UpdateUserAction = {
				type: ActionType.UPDATE_USER,
				key,
				value,
			};
			dispatch(action);
		};

	const cancelChangesHandler = (): void => {
		const action: RestoreUserAction = { type: ActionType.RESTORE_USER };
		dispatch(action);
	};

	const deleteUserHandler = (): void => {
		deleteSingleUser(state.user.id);
		toastCtx.setDeletedUserId(state.user.id);
		toggleModal();
		toastCtx.toggleToast();
	};

	const updateUserHandler = (): void => {
		updateUser(state.user);
	};

	const isValid = useCallback(
		(): boolean =>
			!!state.user.name.length &&
			!!state.user.lastName.length &&
			!!state.user.email.length &&
			state.user.age >= 0 &&
			!!state.user.hobbies.length,
		[
			state.user.name,
			state.user.lastName,
			state.user.email,
			state.user.age,
			state.user.hobbies,
		]
	);

	const toggleModal = (): void => {
		setModalOpen(!modalOpen);
	};

	return (
		<>
			<Box
				component='form'
				sx={{
					'& .MuiTextField-root': { m: 1, width: '30ch' },
				}}
				autoComplete='off'
			>
				<TextField
					required
					id='name'
					label='First Name'
					value={state.user.name}
					onChange={onInputValueChange('name')}
					error={!state.user.name.length}
				/>
				<TextField
					required
					id='lastName'
					label='Last Name'
					value={state.user.lastName}
					onChange={onInputValueChange('lastName')}
					error={!state.user.lastName.length}
				/>
				<TextField
					id='gender'
					label='Gender'
					value={state.user.gender}
					onChange={onInputValueChange('gender')}
				/>
				<TextField
					id='dateOfBirth'
					label='Birth date'
					type='date'
					value={state.user.dateOfBirth}
					onChange={onInputValueChange('dateOfBirth')}
					sx={{ width: 220 }}
					InputLabelProps={{
						shrink: true,
					}}
				/>
				<TextField
					id='age'
					label='Age'
					type='number'
					value={state.user.age}
					onChange={onInputValueChange('age')}
					required
					error={state.user.age < 0}
				/>
				<TextField
					required
					id='email'
					label='E-mail Address'
					type='email'
					value={state.user.email}
					onChange={onInputValueChange('email')}
					error={!state.user.email.length}
				/>
				<TextField
					id='phoneNumber'
					label='Phone number'
					value={state.user.phoneNumber}
					onChange={onInputValueChange('phoneNumber')}
				/>
				<TextField
					id='address'
					label='Address'
					value={state.user.address}
					onChange={onInputValueChange('address')}
				/>
				<Autocomplete
					multiple
					id='hobbies'
					options={[...state.hobbies]}
					isOptionEqualToValue={(option: Hobby, value: Hobby): boolean =>
						option.id === value.id
					}
					disableCloseOnSelect
					getOptionLabel={(option) => option.name}
					renderOption={(props, option, { selected }) => (
						<li {...props} key={option.id}>
							<Checkbox
								icon={icon}
								checkedIcon={checkedIcon}
								style={{ marginRight: 8 }}
								checked={selected}
							/>
							{option.name}
						</li>
					)}
					style={{ width: 500 }}
					renderInput={(params) => (
						<TextField
							{...params}
							required
							label='Hobbies'
							placeholder={state.user.hobbies.length ? '' : 'Select Hobbies'}
							error={!state.user.hobbies.length}
						/>
					)}
					defaultValue={state.user.hobbies}
					value={state.user.hobbies}
					onChange={onSelectValueChange('hobbies')}
				/>
			</Box>
			<Stack spacing={1} direction='row'>
				<Button
					disabled={!isValid()}
					variant='contained'
					onClick={updateUserHandler}
					component={Link}
					to={'/'}
				>
					Save changes
				</Button>
				<Button variant='contained' onClick={toggleModal}>
					Delete user
				</Button>
				<Button variant='contained' onClick={cancelChangesHandler}>
					Cancel changes
				</Button>
				<Button variant='contained' component={Link} to={'/'}>
					Back to list
				</Button>
			</Stack>
			<Modal
				open={modalOpen}
				onConfirm={deleteUserHandler}
				onCancel={toggleModal}
				title='Delete user?'
				text={`Are you sure you want to delete user: ${state.user.name} ${state.user.lastName}?`}
				navigateTo='/'
			/>
			<Toast
				open={toastCtx.toastOpen}
				closeHandler={toastCtx.toggleToast}
				actionHandler={toastCtx.restoreUserHandler}
				alertType={toastCtx.alert.alertType}
				text={toastCtx.alert.alertText}
			/>
		</>
	);
};

export default PersonForm;
