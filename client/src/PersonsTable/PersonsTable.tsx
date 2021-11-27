import { DataGrid } from '@mui/x-data-grid';
import { useEffect, useState } from 'react';
import { getUsersList, deleteSingleUser } from '../services/http-service';
import { Hobby, User, TableUser } from '../types/types';
import getColumns from './tableColumns';

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

	const columns = getColumns(deleteUserHandler);

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
