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
import classes from './PersonForm.module.css';
import Modal from '../components/Modal/Modal';
import { ToastContext, toastContext } from '../context/ToastContext';
import { User, Hobby } from '../types/types';
import { Box, TextField, MenuItem } from '@mui/material';
import {
	getUser,
	getHobbiesList,
	deleteUser,
	updateUser,
} from '../services/httpService';
import formFields from './formFields';
import {
	reducer,
	initialState,
	ActionType,
	SetHobbiesAction,
	UpdateUserAction,
	SetUserAction,
	RestoreUserAction,
} from './personFormReducer';
import FormControls from './FormControls';
import AutocompleteField from './AutocompleteField';

interface Props {
	location: { state: { userId: string } };
}

const PersonForm: React.FC<Props> = ({ location }: Props) => {
	const [state, dispatch] = useReducer(reducer, initialState);
	const [modalOpen, setModalOpen] = useState<boolean>(false);
	const userId: string = location.state.userId;
	const toastCtx: ToastContext = useContext<ToastContext>(toastContext);

	useEffect((): void => {
		getHobbiesList().then((data: Hobby[] | undefined): void => {
			if (data) {
				const action: SetHobbiesAction = {
					type: ActionType.SET_HOBBIES,
					data,
				};
				dispatch(action);
			}
		});
	}, []);

	useEffect((): void => {
		getUser(userId).then((data: User | undefined): void => {
			if (data) {
				const action: SetUserAction = {
					type: ActionType.INITIALIZE_USER,
					data,
				};
				dispatch(action);
			}
		});
	}, [userId]);

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

	const onOptionValueChange =
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
		deleteUser(state.user.id);
		toggleModal();
		toastCtx.openToastHandler(
			{ color: 'warning', text: 'User has been deleted!' },
			[state.user.id]
		);
	};

	const updateUserHandler = (): void => {
		updateUser(state.user);
	};

	const isValid: () => boolean = useCallback(
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

	const fieldsList = formFields.map((item) => {
		const value: string | number | Hobby[] = state.user[item.name];
		const error: boolean = item.errorCondition
			? item.errorCondition(value)
			: false;
		return (
			<TextField
				key={item.name}
				id={item.name}
				label={item.label}
				error={error}
				value={value}
				type={item.type}
				onChange={onInputValueChange(item.name)}
				{...(item.required ? { required: true } : {})}
				className={classes.formFields}
			/>
		);
	});

	return (
		<>
			<Box component='form' autoComplete='off' className={classes.box}>
				{fieldsList}
				<AutocompleteField
					id='hobbies'
					label='Hobbies'
					placeholder='Select Hobbies'
					defaultValue={state.user.hobbies}
					options={state.hobbies}
					onValueChange={onOptionValueChange}
				/>
				<TextField
					id='gender'
					select
					label='Gender'
					value={state.user.gender}
					className={classes.formFields}
					onChange={onInputValueChange('gender')}
				>
					<MenuItem value=''>
						<em>Not provided</em>
					</MenuItem>
					<MenuItem value='male'>Male</MenuItem>
					<MenuItem value='female'>Female</MenuItem>
				</TextField>
			</Box>
			<FormControls
				isValid={isValid}
				cancelChangesHandler={cancelChangesHandler}
				toggleModal={toggleModal}
				updateUserHandler={updateUserHandler}
			/>
			<Modal
				open={modalOpen}
				onConfirm={deleteUserHandler}
				onCancel={toggleModal}
				title='Delete user?'
				text={`Are you sure you want to delete user: ${state.user.name} ${state.user.lastName}?`}
				navigateTo='/'
			/>
		</>
	);
};

export default PersonForm;
