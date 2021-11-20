import { DataGrid, GridCellParams, MuiEvent } from '@mui/x-data-grid';
import React from 'react';
import ActionButtonsGroup from '../ActionButtonsGroup';

const PersonsTable = () => {
	const columns = [
		{ field: 'id', headerName: 'ID', width: 70 },
		{ field: 'firstName', headerName: 'First name', width: 130 },
		{ field: 'lastName', headerName: 'Last name', width: 130 },
		{
			field: 'gender',
			headerName: 'Gender',
			width: 120,
		},
		{
			field: 'birthDate',
			headerName: 'Birth date',
			width: 120,
		},
		{
			field: 'age',
			headerName: 'Age',
			width: 120,
		},
		{
			field: 'email',
			headerName: 'E-mail address',
			width: 120,
		},
		{
			field: 'phone',
			headerName: 'Phone number',
			width: 120,
		},
		{
			field: 'address',
			headerName: 'Address',
			width: 120,
		},
		{
			field: 'hobbys',
			headerName: 'Hobbys',
			width: 120,
		},
		{
			field: 'fullName',
			headerName: 'Full name',
			description: 'This column has a value getter and is not sortable.',
			sortable: false,
			width: 160,
			valueGetter: (params: any) =>
				`${params.getValue(params.id, 'firstName') || ''} ${
					params.getValue(params.id, 'lastName') || ''
				}`,
		},
		{
			field: 'action',
			headerName: 'Action buttons',
			width: 200,
			renderCell: ActionButtonsGroup,
			isColumnSelectable: false,
		},
	];

	const rows = [
		{
			id: 1,
			lastName: 'Snow',
			firstName: 'Jon',
			age: 35,
		},
		{ id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 42 },
		{ id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 45 },
		{ id: 4, lastName: 'Stark', firstName: 'Arya', age: 16 },
		{ id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null },
		{ id: 6, lastName: 'Melisandre', firstName: null, age: 150 },
		{ id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
		{ id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36 },
		{ id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
	];

	return (
		<div style={{ height: 800, width: '100%' }}>
			<DataGrid
				rows={rows}
				columns={columns}
				pageSize={7}
				rowsPerPageOptions={[7]}
				checkboxSelection
				onCellClick={(
					params: GridCellParams,
					event: MuiEvent<React.MouseEvent>
				) => {
					if (params.colDef.field === 'action') {
						event.defaultMuiPrevented = true;
					}
				}}
			/>
		</div>
	);
};

export default PersonsTable;
