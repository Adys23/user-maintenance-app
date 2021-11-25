import { DataGrid, GridRenderCellParams } from '@mui/x-data-grid';
import { ReactNode, useEffect, useState } from 'react';
//import { useAppSelector } from '../hooks/hooks';
import { getUsersList, deleteSingleUser } from '../services/http-service';
import { Hobby, User, TableUser } from '../types/types';

import ActionButtonsGroup from './ActionButtonsGroup';

const PersonsTable: React.FC = () => {
	const [usersList, setUsersList] = useState<TableUser[]>([]);

	const stringifyHobbies = (hobbies: Hobby[]): string => {
		const hobbiesString: string = hobbies
			.reduce((acc: string, value: Hobby) => {
				acc += `${value.name}, `;
				return acc;
			}, '')
			.slice(0, -2);
		return hobbiesString;
	};

	const deleteUserHandler = async (userId: string): Promise<void> => {
		const response: boolean | undefined = await deleteSingleUser(userId);
		if (response) {
			const updatedUsersList: TableUser[] = usersList.filter(
				(item: TableUser) => item.id !== userId
			);
			setUsersList(updatedUsersList);
		}
	};

	useEffect(() => {
		getUsersList().then((data: User[] | undefined):void => {
			if (data) {
				const tableUsersList: TableUser[] = data.map(
					(user: User): TableUser => {
						const hobbiesString: string = stringifyHobbies(user.hobbies);

						const tableUser: TableUser = { ...user, hobbies: hobbiesString };
						return tableUser;
					}
				);
				setUsersList(tableUsersList);
			}
		});
	}, []);

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
			renderCell: (params: GridRenderCellParams): ReactNode => {
				return (
					<ActionButtonsGroup
						userId={params.id}
						deleteUser={deleteUserHandler}
					/>
				);
			},
			sortable: false,
		},
	];

	return (
		<div style={{ height: 500, width: '100%' }}>
			<DataGrid
				rows={usersList}
				columns={columns}
				pageSize={10}
				rowsPerPageOptions={[10]}
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
