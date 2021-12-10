import { ReactNode, SyntheticEvent } from 'react';
import { Autocomplete, Checkbox, TextField } from '@mui/material';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';

import { Hobby, User } from '../types/types';

import classes from './AutocompleteField.module.css';

interface Props {
	id: string;
	options: Hobby[];
	defaultValue: Hobby[];
	label: string;
	placeholder: string;
	onValueChange: (
		key: keyof User
	) => (event: SyntheticEvent, value: Hobby[]) => void;
}

const icon: ReactNode = <CheckBoxOutlineBlankIcon fontSize='small' />;
const checkedIcon: ReactNode = <CheckBoxIcon fontSize='small' />;

const AutocompleteField: React.FC<Props> = (props: Props) => (
	<Autocomplete
		multiple
		id={props.id}
		options={[...props.options]}
		className={classes.hobbiesSelector}
		isOptionEqualToValue={(option: Hobby, value: Hobby): boolean =>
			option.id === value.id
		}
		disableCloseOnSelect
		getOptionLabel={(option) => option.name}
		renderOption={(props, option, { selected }) => (
			<li {...props} key={option.id}>
				<Checkbox
					icon={icon}
					checkedIcon={checkedIcon}
					style={{ marginRight: 8 }}
					checked={selected}
				/>
				{option.name}
			</li>
		)}
		renderInput={(params) => (
			<TextField
				{...params}
				required
				label={props.label}
				placeholder={props.options.length ? '' : props.placeholder}
				error={!props.options.length}
			/>
		)}
		defaultValue={props.defaultValue}
		value={props.defaultValue}
		onChange={props.onValueChange('hobbies')}
	/>
);

export default AutocompleteField;
