import React, {
	useEffect,
	useReducer,
	ChangeEventHandler,
	ChangeEvent,
} from 'react';
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
import { getSingleUser, getHobbiesList } from '../services/http-service';
import {
	reducer,
	initialState,
	ActionType,
	AddHobbiesAction,
	UpdateUserAction,
	AddUserAction,
} from './personFormReducer';

interface Props {
	location: { state: { userId: string } };
}

const icon = <CheckBoxOutlineBlankIcon fontSize='small' />;
const checkedIcon = <CheckBoxIcon fontSize='small' />;

const PersonForm: React.FC<any> = ({ location }: Props) => {
	const [state, dispatch] = useReducer(reducer, initialState);

	const userId = location.state.userId;

	useEffect((): void => {
		getHobbiesList().then((data: Hobby[] | undefined): void => {
			if (data) {
				const action: AddHobbiesAction = { type: ActionType.ADD_HOBBIES, data };
				dispatch(action);
			}
		});
	}, []);

	useEffect((): void => {
		getSingleUser(userId).then((data: User | undefined): void => {
			if (data) {
				const action: AddUserAction = {
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
					name='First Name'
					value={state.user.name}
					onChange={onInputValueChange('name')}
				/>
				<TextField
					required
					id='lastName'
					name='Last Name'
					value={state.user.lastName}
					onChange={onInputValueChange('lastName')}
				/>
				<TextField
					required
					id='gender'
					name='Gender'
					value={state.user.gender}
					onChange={onInputValueChange('gender')}
				/>
				<TextField
					id='dateOfBirth'
					label='Birth date'
					type='date'
					defaultValue={state.user ? state.user.dateOfBirth : ''}
					sx={{ width: 220 }}
					InputLabelProps={{
						shrink: true,
					}}
				/>
				<TextField id='age' label='Age' type='number' value={state.user.age} />
				<TextField
					required
					id='email'
					name='E-mail Address'
					type='email'
					value={state.user.email}
				/>
				<TextField
					required
					id='phoneNumber'
					name='Phone number'
					value={state.user.phoneNumber}
				/>
				<TextField
					required
					id='address'
					name='Address'
					value={state.user.address}
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
							label='Hobbies'
							placeholder='Select Hobbies'
						/>
					)}
					defaultValue={state.user.hobbies}
				/>
			</Box>
			<Stack spacing={1} direction='row'>
				<Button variant='contained'>Confirm changes</Button>
				<Button variant='contained'>Delete user</Button>
				<Button variant='contained' component={Link} to={'/'}>
					Cancel
				</Button>
			</Stack>
		</>
	);
};

export default PersonForm;
