import { Reducer } from 'react';
import { User, Hobby } from '../types/types';

export interface State {
	user: User;
	hobbies: Hobby[];
	initialUser: User;
}

export enum ActionType {
	SET_HOBBIES,
	RESTORE_USER,
	UPDATE_USER,
	INITIALIZE_USER,
}

export type SetHobbiesAction = {
	type: ActionType.SET_HOBBIES;
	data: Hobby[];
};

export type RestoreUserAction = {
	type: ActionType.RESTORE_USER;
};

export type UpdateUserAction = {
	type: ActionType.UPDATE_USER;
	key: keyof User;
	value: string | number | Array<Hobby>;
};

export type SetUserAction = {
	type: ActionType;
	data: User;
};

type Action =
	| SetHobbiesAction
	| UpdateUserAction
	| SetUserAction
	| RestoreUserAction;

export const reducer: Reducer<State, Action> = (
	state: State,
	action: Action
) => {
	switch (action.type) {
		case ActionType.SET_HOBBIES:
			return { ...state, hobbies: (action as SetHobbiesAction).data };
		case ActionType.RESTORE_USER:
			return { ...state, user: state.initialUser };
		case ActionType.UPDATE_USER:
			return {
				...state,
				user: {
					...state.user,
					[(action as UpdateUserAction).key]: (action as UpdateUserAction)
						.value,
				},
			};
		case ActionType.INITIALIZE_USER:
			return {
				...state,
				initialUser: (action as SetUserAction).data,
				user: (action as SetUserAction).data,
			};
		default:
			return state;
	}
};

const defaultUser: User = {
	id: '',
	name: '',
	lastName: '',
	email: '',
	age: 0,
	gender: '',
	phoneNumber: '',
	address: '',
	dateOfBirth: '',
	hobbies: [],
};

export const initialState: State = {
	user: defaultUser,
	initialUser: defaultUser,
	hobbies: [],
};
