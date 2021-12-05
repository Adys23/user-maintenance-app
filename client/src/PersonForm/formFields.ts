import { User } from "../types/types";

export interface FormField {
    name: keyof User;
    required: boolean;
    label: string;
    errorCondition?: (value: any) => boolean;
    type?: string;
    additionalInfo?: {}
}

const formFields: FormField[] = [
    {
        name: 'name',
        label: 'First name',
        required: true,
        errorCondition: (value: string) => !value.length
    },
    {
        name: 'lastName',
        label: 'Last name',
        required: true,
        errorCondition: (value: string) => !value.length
    },
    {
        name: 'dateOfBirth',
        label: 'Birth date',
        required: false,
        type: 'date',
        //additionalInfo: {{sx: }}
    },
    {
        name: 'age',
        label: 'Age',
        required: true,
        type: 'number',
        errorCondition: (value: number) => value < 0 
    },
    {
        name: 'email',
        label: 'E-mail Address',
        required: true,
        type: 'email',
        errorCondition: (value: string) => !value.length
    },
    {
        name: 'phoneNumber',
        label: 'Phone number',
        required: true,
    },
    {
        name: 'address',
        label: 'Address',
        required: true,
    },
]

export default formFields;