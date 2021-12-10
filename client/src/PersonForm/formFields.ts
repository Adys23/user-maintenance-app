import { User, Hobby } from '../types/types';

export interface FormField {
	name: keyof User;
	required: boolean;
	label: string;
	errorCondition?: (value: string | number | Hobby[]) => boolean;
	type?: string;
}

const formFields: FormField[] = [
	{
		name: 'name',
		label: 'First name',
		required: true,
		errorCondition: (value: string | number | Hobby[]) =>
			!(value as string).length,
	},
	{
		name: 'lastName',
		label: 'Last name',
		required: true,
		errorCondition: (value: string | number | Hobby[]) =>
			!(value as string).length,
	},
	{
		name: 'dateOfBirth',
		label: 'Birth date',
		required: false,
		type: 'date',
	},
	{
		name: 'age',
		label: 'Age',
		required: true,
		type: 'number',
		errorCondition: (value: string | number | Hobby[]) => (value as number) < 0,
	},
	{
		name: 'email',
		label: 'E-mail Address',
		required: true,
		type: 'email',
		errorCondition: (value: string | number | Hobby[]) =>
			!(value as string).length,
	},
	{
		name: 'phoneNumber',
		label: 'Phone number',
		required: false,
	},
	{
		name: 'address',
		label: 'Address',
		required: false,
	},
];

export default formFields;
