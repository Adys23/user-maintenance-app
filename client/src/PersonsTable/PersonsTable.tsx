import { DataGrid, GridSelectionModel } from '@mui/x-data-grid';
import { Button } from '@mui/material';
import { useEffect, useState, useContext } from 'react';
import {
	getUsersList,
	deleteUsers,
	restoreUsers,
} from '../services/http-service';
import { Hobby, User, TableUser } from '../types/types';
import getColumns from './tableColumns';
import Modal from '../components/Modal/Modal';
import Toast from '../components/Toast/Toast';
import { ToastContext } from '../context/ToastContext';

const PersonsTable: React.FC = () => {
	const [usersList, setUsersList] = useState<TableUser[]>([]);
	const [selectedUsers, setSelectedUsers] = useState<string[]>([]);
	const [deletedUsers, setDeletedUsers] = useState<TableUser[]>([]);
	const [modalOpen, setModalOpen] = useState<boolean>(false);

	const toastCtx = useContext(ToastContext);

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
			}
		});
	}, []);

	const stringifyHobbies = (hobbies: Hobby[]): string => {
		const hobbiesString: string = hobbies
			.reduce((acc: string, value: Hobby) => {
				acc += `${value.name}, `;
				return acc;
			}, '')
			.slice(0, -2);
		return hobbiesString;
	};

	const toggleModal = (): void => setModalOpen(!modalOpen);

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
				setDeletedUsers(usersForDeletion);
				setUsersList(updatedUsersList);
				toggleModal();
				if (usersForDeletion.length === 1) {
					toastCtx.setAlert({
						alertType: 'warning',
						alertText: 'User has been deleted!',
					});
				} else {
					toastCtx.setAlert({
						alertType: 'warning',
						alertText: 'Users have been deleted!',
					});
				}
				toastCtx.toggleToast();
			})
			.catch((e) => console.error(e));
	};

	const userRowDeleteHandler = (selectedUserIds: string[]): void => {
		setSelectedUsers(selectedUserIds);
		toggleModal();
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

	const restoreUsersHandler = (): void => {
		restoreUsers()
			.then(() => {
				const updatedUsersList: TableUser[] = [...usersList, ...deletedUsers];
				setUsersList(updatedUsersList);
				setDeletedUsers([]);
				toastCtx.setAlert({
					alertType: 'success',
					alertText: 'Users have been restored!',
				});
			})
			.catch((e) => console.error(e));
	};

	const columns = getColumns(userRowDeleteHandler);

	return (
		<div style={{ height: 500, width: '100%' }}>
			<Button
				variant='contained'
				onClick={toggleModal}
				disabled={selectedUsers.length ? false : true}
			>
				Delete
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
				onCancel={toggleModal}
				title='Delete user?'
				text={`Are you sure you want to delete users: ${getSelectedUserNames()}?`}
				navigateTo='/'
			/>
			<Toast
				open={toastCtx.toastOpen}
				closeHandler={toastCtx.toggleToast}
				actionHandler={restoreUsersHandler}
				alertType={toastCtx.alert.alertType}
				text={toastCtx.alert.alertText}
			/>
		</div>
	);
};

export default PersonsTable;
