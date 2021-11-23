import loki from 'lokijs';
import {Hobby, User, UserFromSource} from '../types';
import usersData from '../../resources/users.json'
import hobbiesData from '../../resources/hobbies.json'

export default class Database {

    private db: Loki;
    private readonly users: Collection<User>;
    private readonly hobbies: Collection<Hobby>

    constructor() {
        this.db = new loki('')

        this.users = this.db.addCollection('users', { indices: ['id']});
        this.hobbies = this.db.addCollection('hobbies', { indices: ['id']});

        this.loadData();
    }

    public getUsers(): Collection<User> {
        return this.users;
    }

    public getHobbies(): Collection<Hobby> {
        return this.hobbies;
    }

    private loadData(): void {
        const users: User[] = usersData.map((user: UserFromSource) => ({...user, deleted: false}));
        const hobbies: Hobby[] = hobbiesData;
        this.users.insert(users);
        this.hobbies.insert(hobbies);
    }

}


