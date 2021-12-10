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
	hobbies: string[];
}

export interface UserEntity extends User {
	deleted: boolean;
}

export interface UserDTO extends Omit<User, 'hobbies'> {
	hobbies: Hobby[];
}

export interface Hobby {
	id: string;
	name: string;
}
