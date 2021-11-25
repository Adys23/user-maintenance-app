import { useState } from 'react';
import { User } from '../types/types';
import { Hobby } from '../types/types';
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

interface Props {
	location: { state: { userId: string } };
}

const icon = <CheckBoxOutlineBlankIcon fontSize='small' />;
const checkedIcon = <CheckBoxIcon fontSize='small' />;

const PersonDetailsForm: React.FC<any> = ({ location }: Props) => {
	const [user, setUser] = useState<User>();

	const userId = location.state.userId;


	
	const options: Hobby[] = [
		{ name: 'top100Films', id: '111' },
		{ name: 'another one', id: '123' },
	];

	return (
		<>
			<Box
				component='form'
				sx={{
					'& .MuiTextField-root': { m: 1, width: '30ch' },
				}}
				autoComplete='off'
			>
				<TextField required id='name' label='First Name' />
				<TextField required id='lastName' label='Last Name' />
				<TextField required id='gender' label='Gender' />
				<TextField
					id='dateOfBirth'
					label='Birth date'
					type='date'
					defaultValue=''
					sx={{ width: 220 }}
					InputLabelProps={{
						shrink: true,
					}}
				/>
				<TextField id='age' label='Age' type='number' defaultValue={29} />
				<TextField required id='email' label='E-mail Address' type='email' />
				<TextField required id='phoneNumber' label='Phone number' />
				<TextField required id='address' label='Address' />
				<Autocomplete
					multiple
					id='hobbies'
					options={options}
					disableCloseOnSelect
					getOptionLabel={(option) => option.name}
					renderOption={(props, option, { selected }) => (
						<li {...props}>
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

export default PersonDetailsForm;
