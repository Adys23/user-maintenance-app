export interface UserFromSource {
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

export interface User extends UserFromSource {
    deleted: boolean;
}

export interface UserDTO extends Omit<UserFromSource, 'hobbies'> {
    hobbies: Hobby[]
}

export interface Hobby {
    id: string;
    name: string;
}
