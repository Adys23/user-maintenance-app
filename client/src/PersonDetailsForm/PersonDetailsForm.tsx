import { Box, TextField } from '@mui/material';
import { useParams } from 'react-router-dom';

const PersonDetailsForm = () => {
	const params = useParams();

	return (
		<Box
			component='form'
			sx={{
				'& .MuiTextField-root': { m: 1, width: '30ch' },
			}}
			autoComplete='off'
		>
			<TextField required id='first-name' label='First Name' />
			<TextField required id='last-name' label='Last Name' />
			<TextField required id='gender' label='Gender' />
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
			<TextField required id='email' label='E-mail Address' type='email' />
			<TextField required id='phone' label='Phone number' />
			<TextField required id='address' label='Address' />
			<TextField required multiline id='hobbies' label='Hobbies' />
		</Box>
	);
};

export default PersonDetailsForm;
