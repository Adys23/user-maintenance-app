import { DataGrid, GridSelectionModel } from '@mui/x-data-grid';
import { Button } from '@mui/material';
import { useEffect, useState, useContext } from 'react';
import { getUsersList, deleteUsers } from '../services/http-service';
import { Hobby, User, TableUser } from '../types/types';
import getColumns from './tableColumns';
import Modal from '../components/Modal/Modal';
import { ToastContext } from '../context/ToastContext';

const PersonsTable: React.FC = () => {
	const [usersList, setUsersList] = useState<TableUser[]>([]);
	const [selectedUsers, setSelectedUsers] = useState<string[]>([]);
	const [modalOpen, setModalOpen] = useState<boolean>(false);

	const toastContext = useContext(ToastContext);

	useEffect(() => {
		getUsersList().then((data: User[] | undefined): void => {
			if (data) {
				const tableUsersList: TableUser[] = data.map(
					(user: User): TableUser => {
						const hobbiesString: string = stringifyHobbies(user.hobbies);

						const tableUser: TableUser = { ...user, hobbies: hobbiesString };
						return tableUser;
					}
				);
				setUsersList(tableUsersList);
				toastContext.setUsersRestored(false);
			}
		});
	}, [toastContext, toastContext.usersRestored]);

	const stringifyHobbies = (hobbies: Hobby[]): string => {
		const hobbiesString: string = hobbies
			.reduce((acc: string, value: Hobby) => {
				acc += `${value.name}, `;
				return acc;
			}, '')
			.slice(0, -2);
		return hobbiesString;
	};

	const closeModal = (): void => setModalOpen(false);
	const openModal = (): void => setModalOpen(true);

	const deleteUsersHandler = (): void => {
		deleteUsers(selectedUsers)
			.then(() => {
				const deletedUserIdsSet: Set<string> = new Set(selectedUsers);
				const updatedUsersList: TableUser[] = usersList.filter(
					(item: TableUser) => !deletedUserIdsSet.has(item.id)
				);
				const usersForDeletion: TableUser[] = usersList.filter(
					(item: TableUser) => deletedUserIdsSet.has(item.id)
				);
				setUsersList(updatedUsersList);
				closeModal();

				toastContext.openToastHandler(
					{
						color: 'warning',
						...(usersForDeletion.length > 1
							? { text: 'Users have been deleted' }
							: { text: 'User has been deleted' }),
					},
					selectedUsers
				);
				setSelectedUsers([]);
			})
			.catch((e) => console.error(e));
	};

	const userRowDeleteHandler = (selectedUserIds: string[]): void => {
		setSelectedUsers(selectedUserIds);
		openModal();
	};

	const onSelectionChange = (selectionModel: GridSelectionModel): void => {
		setSelectedUsers(selectionModel as string[]);
	};

	const getSelectedUserNames = (): string => {
		const userIdsSet: Set<string> = new Set(selectedUsers);
		return usersList
			.filter((user: TableUser): boolean => userIdsSet.has(user.id))
			.reduce<string>((acc: string, user: TableUser): string => {
				acc += `${user.name} ${user.lastName}, `;
				return acc;
			}, '')
			.slice(0, -2);
	};

	const columns = getColumns(userRowDeleteHandler);

	return (
		<div style={{ height: 650, width: '100%' }}>
			<Button
				variant='contained'
				color='error'
				onClick={openModal}
				disabled={selectedUsers.length ? false : true}
			>
				Delete selected users
			</Button>
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
				onSelectionModelChange={onSelectionChange}
			/>
			<Modal
				open={modalOpen}
				onConfirm={deleteUsersHandler}
				onCancel={closeModal}
				title='Delete user?'
				text={`Are you sure you want to delete users: ${getSelectedUserNames()}?`}
				navigateTo='/'
			/>
		</div>
	);
};

export default PersonsTable;
