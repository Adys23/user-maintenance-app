import ActionButtonsGroup from './ActionButtonsGroup';
import { GridColumns, GridRenderCellParams } from '@mui/x-data-grid';
import { ReactNode } from 'react';

export const getColumns = (
	deleteButtonHandler: (selectedUserIds: string[]) => void
): GridColumns => {
	return [
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
			width: 80,
		},
		{
			field: 'email',
			headerName: 'E-mail address',
			minWidth: 270,
		},
		{
			field: 'phoneNumber',
			headerName: 'Phone number',
			width: 180,
		},
		{
			field: 'address',
			headerName: 'Address',
			flex: 1,
			minWidth: 200,
			cellClassName: 'wrapText',
		},
		{
			field: 'hobbies',
			headerName: 'Hobbies',
			flex: 1,
			minWidth: 180,
			cellClassName: 'wrapText',
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
			minWidth: 250,
			renderCell: (params: GridRenderCellParams): ReactNode => {
				return (
					<ActionButtonsGroup
						userId={params.id}
						deleteUser={deleteButtonHandler}
					/>
				);
			},
			sortable: false,
		},
	];
};

export default getColumns;
