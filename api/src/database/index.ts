import loki from 'lokijs';
import { Hobby, UserEntity, User } from '../types';
import usersData from '../../resources/users.json';
import hobbiesData from '../../resources/hobbies.json';

export default class Database {
	private db: Loki;
	private readonly users: Collection<UserEntity>;
	private readonly hobbies: Collection<Hobby>;

	constructor() {
		this.db = new loki('');

		this.users = this.db.addCollection('users', { indices: ['id'] });
		this.hobbies = this.db.addCollection('hobbies', { indices: ['id'] });

		this.loadData();
	}

	public getUsers(): Collection<UserEntity> {
		return this.users;
	}

	public getHobbies(): Collection<Hobby> {
		return this.hobbies;
	}

	private loadData(): void {
		const users: UserEntity[] = usersData.map((user: User) => ({
			...user,
			deleted: false,
		}));
		const hobbies: Hobby[] = hobbiesData;
		this.users.insert(users);
		this.hobbies.insert(hobbies);
	}
}
