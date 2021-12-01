export interface Hobby {
	id: string;
	name: string;
}

export interface User {
	id: string;
	name: string;
	lastName: string;
	email: string;
	age: number;
	gender: string;
	phoneNumber: string;
	address: string;
	dateOfBirth: string;
	hobbies: Hobby[];
}

export interface TableUser extends Omit<User, 'hobbies'> {
	hobbies: string;
}