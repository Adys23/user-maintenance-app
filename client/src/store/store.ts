import { createSlice, configureStore } from '@reduxjs/toolkit';

const initialState = {
	usersList: [
		{
			id: '6193ce0799647b845f24e587',
			name: 'Kaufman',
			lastName: 'Britt',
			email: 'wahprocuradeumbbn@nonise.com',
			age: 30,
			gender: 'male',
			phoneNumber: '+1 (922) 480-3988',
			address: '370 Rose Street, Neibert, Oregon, 6286',
			dateOfBirth: '1994-05-21',
			hobbies: [
				{ id: '6193ce84e806ff3cbc4521fe', name: 'Motorbike' },
				{ id: '6193ce846eed7ffbaa5a26b2', name: 'Astrology' },
				{ id: '6193ce84e3ef251bb52871b6', name: 'Refinishing' },
			],
		},
		{
			id: '6193ce074efc3e500843eb80',
			name: 'Cecelia',
			lastName: 'Ortega',
			email: 'qakram.mousta@outlook.sbs',
			age: 21,
			gender: 'female',
			phoneNumber: '+1 (941) 535-2271',
			address: '472 Schweikerts Walk, Clara, Maine, 9933',
			dateOfBirth: '1990-04-04',
			hobbies: [{ id: '6193ce843cd350c9a18b5b32', name: 'Sudoku' }],
		},
		{
			id: '6193ce07272dbb6ca898def0',
			name: 'Cabrera',
			lastName: 'Stokes',
			email: 'tcherkihaddadar@fiikra.tk',
			age: 21,
			gender: 'male',
			phoneNumber: '+1 (999) 497-2758',
			address: '703 Lexington Avenue, Manitou, North Carolina, 3497',
			dateOfBirth: '1996-05-25',
			hobbies: [
				{ id: '6193ce84e806ff3cbc4521fe', name: 'Motorbike' },
				{ id: '6193ce84fddf0ea59cd715cc', name: 'Swimming' },
				{ id: '6193ce843502e8f81392a69c', name: 'Bushcraft' },
				{ id: '6193ce8499ba67b92d63c9be', name: 'Electronic games' },
			],
		},
		{
			id: '6193ce07b8fba748ef8131cb',
			name: 'Adkins',
			lastName: 'Moody',
			email: 'xsalemabdul@nroeor.com',
			age: 32,
			gender: 'male',
			phoneNumber: '+1 (972) 508-2167',
			address: '883 Adelphi Street, Graball, Michigan, 4021',
			dateOfBirth: '1988-08-03',
			hobbies: [
				{ id: '6193ce840b1d30d78d2e1413', name: 'Hacking' },
				{ id: '6193ce8404766c242ca1f3c4', name: 'Kung fu' },
			],
		},
		{
			id: '6193ce0727ef5f8ba1e24781',
			name: 'Frieda',
			lastName: 'Morris',
			email: 'csherry.ahm@hdtniudn.com',
			age: 39,
			gender: 'female',
			phoneNumber: '+1 (872) 585-3698',
			address: '759 Alton Place, Wakulla, New Jersey, 2365',
			dateOfBirth: '1990-10-31',
			hobbies: [
				{ id: '6193ce8497316f30f74b3417', name: 'Lego building' },
				{ id: '6193ce84afce6bc5d4a85896', name: 'Public speaking' },
			],
		},
	],
};

const usersSlice = createSlice({
	name: 'usersState',
	initialState,
	reducers: {
		amendUser(state, action) {},
		deleteUser(state, action) {
			state.usersList.filter((item) => {
				return item.id !== action.payload.id;
			});
		},
		restoreUser(state) {},
	},
});

const store = configureStore({ reducer: { users: usersSlice.reducer } });

export const usersActions = usersSlice.actions;

export default store;

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
