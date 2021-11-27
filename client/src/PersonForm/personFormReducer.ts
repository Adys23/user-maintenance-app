import {Reducer} from 'react'
import { User, Hobby } from '../types/types';

export interface State {
	user: User;
	hobbies: Hobby[];
	initialUser: User;
}

export enum ActionType {
	ADD_HOBBIES, 
	UPDATE_USER,
	INITIALIZE_USER
}

export type AddHobbiesAction = {
	type: ActionType;
	data: Hobby[];
};

export type UpdateUserAction = {
	type: ActionType;
    key: keyof User;
	value: string | number;
};

export type AddUserAction = {
    type: ActionType;
    data: User;
}

type Action = AddHobbiesAction | UpdateUserAction | AddUserAction;

export const reducer: Reducer<State, Action> = (
	state: State,
	action: Action
) => {
	switch (action.type) {
		case ActionType.ADD_HOBBIES:
			return { ...state, hobbies: (action as AddHobbiesAction).data };
		case ActionType.UPDATE_USER:
			return { ...state, user: {...state.user, [(action as UpdateUserAction).key]: (action as UpdateUserAction).value }};
		case ActionType.INITIALIZE_USER:
			return {
				...state,
				initialUser: (action as AddUserAction).data,
				user: (action as AddUserAction).data,
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

 export const initialState: State = { user: defaultUser, initialUser: defaultUser, hobbies: [] };