import { DataGrid } from '@mui/x-data-grid';
import { useAppSelector } from '../hooks/hooks';

import ActionButtonsGroup from './ActionButtonsGroup';

interface NewUser {
	id: string;
	name: string;
	lastName: string;
	email: string;
	age: number;
	gender: string;
	phoneNumber: string;
	address: string;
	dateOfBirth: string;
	hobbies: string;
}

const PersonsTable = () => {
	const columns = [
		{ field: 'name', headerName: 'First name', width: 130 },
		{ field: 'lastName', headerName: 'Last name', width: 130 },
		{
			field: 'gender',
			headerName: 'Gender',
			width: 80,
		},
		{
			field: 'dateOfBirth',
			headerName: 'Birth date',
			width: 100,
		},
		{
			field: 'age',
			headerName: 'Age',
			width: 60,
		},
		{
			field: 'email',
			headerName: 'E-mail address',
			flex: 1,
			minWidth: 300,
		},
		{
			field: 'phoneNumber',
			headerName: 'Phone number',
			width: 180,
		},
		{
			field: 'address',
			headerName: 'Address',
			width: 400,
		},
		{
			field: 'hobbies',
			headerName: 'Hobbies',
			flex: 2,
			minWidth: 400,
		},
		{
			field: 'fullName',
			headerName: 'Full name',
			description: 'This column has a value getter and is not sortable.',
			sortable: false,
			width: 160,
			valueGetter: (params: any) =>
				`${params.getValue(params.id, 'name') || ''} ${
					params.getValue(params.id, 'lastName') || ''
				}`,
		},
		{
			field: 'action',
			headerName: 'Action buttons',
			flex: 1,
			minWidth: 300,
			renderCell: () => {
				return <ActionButtonsGroup />;
			},
			sortable: false,
		},
	];

	const usersList = useAppSelector((state) => state.users.usersList);

	const updatedUsersList = usersList.map((user) => {
		let hobbiesString = '';

		user.hobbies.forEach((hobby) => (hobbiesString += `${hobby.name}, `));
		hobbiesString = hobbiesString.slice(0, -2);
		let newUser: NewUser = { ...user, hobbies: hobbiesString };
		return newUser;
	});

	return (
		<div style={{ height: 500, width: '100%' }}>
			<DataGrid
				rows={updatedUsersList}
				columns={columns}
				pageSize={7}
				rowsPerPageOptions={[7]}
				checkboxSelection
				onCellClick={(params, event) => {
					if (params.colDef.field === 'action') {
						event.defaultMuiPrevented = true;
					}
				}}
				onRowClick={(params, event) => {
					event.defaultMuiPrevented = true;
				}}
			/>
		</div>
	);
};

export default PersonsTable;
