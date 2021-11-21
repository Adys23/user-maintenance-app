import {
	Stack,
	TextField,
	FormControl,
	Input,
	InputLabel,
} from '@mui/material';

const PersonDetailsForm = () => {
	return (
		<Stack
			direction='column'
			justifyContent='space-between'
			alignItems='center'
			spacing={3}
		>
			<TextField required id='first-name' label='First Name' />
			<TextField required id='last-name' label='Last Name' />
			<FormControl>
				<InputLabel htmlFor='gender'>Email address</InputLabel>
				<Input id='gender' />
			</FormControl>
			<TextField
				id='birthdate'
				label='Birth date'
				type='date'
				defaultValue=''
				sx={{ width: 220 }}
				InputLabelProps={{
					shrink: true,
				}}
			/>
			<TextField
				id='age'
				label='Age'
				type='number'
				InputLabelProps={{
					shrink: true,
				}}
			/>
			<FormControl>
				<InputLabel htmlFor='email'>E-mail address</InputLabel>
				<Input id='email' />
			</FormControl>
			<FormControl>
				<InputLabel htmlFor='phone'>Phone number</InputLabel>
				<Input id='phone' />
			</FormControl>
			<FormControl>
				<InputLabel htmlFor='address'>Address</InputLabel>
				<Input id='address' />
			</FormControl>
			<FormControl>
				<InputLabel htmlFor='hobbys'>Email address</InputLabel>
				<Input id='hobbys' />
			</FormControl>
		</Stack>
	);
};

export default PersonDetailsForm;
